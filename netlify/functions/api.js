/* Backend de um único usuário. Somente leitura. Sem tokens em JSON, HTML, URL do app ou logs. */
const crypto=require('node:crypto');
const {equal,codec,cookies,cookie}=require('./lib/security');
const TZ='America/Sao_Paulo';
const loginAttempts=new Map();
function createHandler(env=process.env,request=fetch){return async event=>{
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'},setCookies=[];
 const response=(status,data)=>({statusCode:status,headers,multiValueHeaders:{'Set-Cookie':setCookies},body:JSON.stringify(data)});
 const redirect=location=>({statusCode:302,headers:{...headers,Location:location},multiValueHeaders:{'Set-Cookie':setCookies},body:''});
 const path=(event.path||'').replace(/^\/(?:\.netlify\/functions\/)?api\/?/,'').replace(/\/$/,''),method=event.httpMethod||'GET';
 try{
 const base=env.ORBITA_BASE_URL||env.URL;
 const configured=!!base&&/^https:\/\/[^/]+\/?$/.test(base)&&!!env.ORBITA_OWNER_PASSWORD&&env.ORBITA_OWNER_PASSWORD.length>=16&&!!env.ORBITA_SESSION_SECRET&&env.ORBITA_SESSION_SECRET.length>=32;
 if(path==='status'&&method==='GET'){
   let authorized=false,google=false,notion=false,googleSelection={},notionSelection={};if(configured){const c=codec(env.ORBITA_SESSION_SECRET),jar=cookies(event);authorized=!!c.open(jar['__Host-orbita-owner']);google=authorized&&!!c.open(jar['__Host-orbita-google']);notion=authorized&&!!c.open(jar['__Host-orbita-notion']);if(authorized){const g=c.open(jar['__Host-orbita-google'])||{},n=c.open(jar['__Host-orbita-notion'])||{};googleSelection={calendar:g.calendar||null,folder:g.folder||null};notionSelection={database:n.database||null}}}
   return response(200,{configured,authorized,google:{configured:!!env.GOOGLE_CLIENT_ID&&!!env.GOOGLE_CLIENT_SECRET,connected:google,selection:googleSelection},notion:{configured:!!env.NOTION_CLIENT_ID&&!!env.NOTION_CLIENT_SECRET,connected:notion,selection:notionSelection},timezone:TZ,readOnly:true})
 }
 if(!configured)return response(503,{error:'Servidor privado não configurado. O modo local continua disponível.',code:'NOT_CONFIGURED'});
 const origin=new URL(base).origin,c=codec(env.ORBITA_SESSION_SECRET),jar=cookies(event),session=c.open(jar['__Host-orbita-owner']);
 const save=(name,value,ttl=604800)=>setCookies.push(cookie(name,c.seal({...value,exp:Date.now()+ttl*1000}),ttl));
 if(method!=='GET'&&event.headers?.origin!==origin)return response(403,{error:'Origem não autorizada'});
 if(path==='login'&&method==='POST'){
   if((event.body||'').length>2048)return response(413,{error:'Entrada muito grande'});
   const ip=event.headers?.['x-nf-client-connection-ip']||'unknown',key=crypto.createHash('sha256').update(ip).digest('hex'),old=loginAttempts.get(key);const record=old&&old.until>Date.now()?old:{count:0,until:Date.now()+900000};if(record.count>=10)return response(429,{error:'Aguarde antes de tentar novamente.'});record.count++;loginAttempts.set(key,record);if(loginAttempts.size>10000)for(const [k,v]of loginAttempts)if(v.until<Date.now())loginAttempts.delete(k);const password=JSON.parse(event.body||'{}').password;
   if(!equal(password,env.ORBITA_OWNER_PASSWORD))return response(401,{error:'Acesso não autorizado'});
   loginAttempts.delete(key);save('owner',{user:'owner'});return response(200,{authorized:true})
 }
 if(!session)return response(401,{error:'Entre na sua área pessoal antes de conectar as contas.'});
 if(path==='logout'&&method==='POST'){for(const name of ['owner','google','notion','flow'])setCookies.push(cookie(name,'',0));return response(200,{disconnected:true})}
 const params=event.queryStringParameters||{};
 const oauthConfig=provider=>provider==='google'?{id:env.GOOGLE_CLIENT_ID,secret:env.GOOGLE_CLIENT_SECRET,authorize:'https://accounts.google.com/o/oauth2/v2/auth',token:'https://oauth2.googleapis.com/token'}:{id:env.NOTION_CLIENT_ID,secret:env.NOTION_CLIENT_SECRET,authorize:'https://api.notion.com/v1/oauth/authorize',token:'https://api.notion.com/v1/oauth/token'};
 const callback=provider=>origin+'/api/oauth/'+provider+'/callback';
 if(/^oauth\/(google|notion)\/start$/.test(path)&&method==='GET'){
   const provider=path.split('/')[1],cfg=oauthConfig(provider);if(!cfg.id||!cfg.secret)return response(503,{error:'Configure o aplicativo OAuth no servidor para esta conexão.'});
   const state=crypto.randomBytes(32).toString('base64url'),verifier=crypto.randomBytes(48).toString('base64url');save('flow',{state,verifier,provider},600);
   const url=new URL(cfg.authorize);url.searchParams.set('client_id',cfg.id);url.searchParams.set('redirect_uri',callback(provider));url.searchParams.set('response_type','code');url.searchParams.set('state',state);
   if(provider==='google'){url.searchParams.set('scope','https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive.readonly');url.searchParams.set('access_type','offline');url.searchParams.set('prompt','consent');url.searchParams.set('code_challenge',crypto.createHash('sha256').update(verifier).digest('base64url'));url.searchParams.set('code_challenge_method','S256')}else url.searchParams.set('owner','user');
   return redirect(url.href);
 }
 if(/^oauth\/(google|notion)\/callback$/.test(path)&&method==='GET'){
   const provider=path.split('/')[1],flow=c.open(jar['__Host-orbita-flow']);setCookies.push(cookie('flow','',0));
   if(!flow||flow.provider!==provider||!equal(flow.state,params.state)||!params.code||params.error)return response(400,{error:'Autorização inválida ou recusada. Tente conectar novamente.'});
   const cfg=oauthConfig(provider),options=provider==='google'?{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code:params.code,client_id:cfg.id,client_secret:cfg.secret,redirect_uri:callback(provider),code_verifier:flow.verifier})}:{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Basic '+Buffer.from(cfg.id+':'+cfg.secret).toString('base64')},body:JSON.stringify({grant_type:'authorization_code',code:params.code,redirect_uri:callback(provider)})};
   const r=await request(cfg.token,{...options,signal:AbortSignal.timeout(15000)});if(!r.ok)return response(502,{error:'O provedor recusou a troca de autorização.'});const token=await r.json();if(!token.access_token)return response(502,{error:'Resposta OAuth incompleta'});
   save(provider,{access:token.access_token,refresh:token.refresh_token||null,until:Date.now()+(token.expires_in||3600)*1000});return redirect(origin+'/#settings');
 }
 async function credential(provider){let token=c.open(jar['__Host-orbita-'+provider]);if(!token)throw Error('NOT_CONNECTED');if(provider==='google'&&token.until<Date.now()+60000){if(!token.refresh)throw Error('RECONNECT');const r=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:token.refresh,client_id:env.GOOGLE_CLIENT_ID,client_secret:env.GOOGLE_CLIENT_SECRET}),signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('RECONNECT');const j=await r.json();if(!j.access_token)throw Error('RECONNECT');token={...token,access:j.access_token,until:Date.now()+j.expires_in*1000};save('google',token)}return token.access}
 async function google(url){const r=await request(url,{headers:{Authorization:'Bearer '+await credential('google')},signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('PROVIDER_DENIED');return r}
 async function notion(route,body){const r=await request('https://api.notion.com/v1/'+route,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+await credential('notion'),'Notion-Version':'2025-09-03','Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('PROVIDER_DENIED');return r.json()}
 const selected=async(provider,key,value)=>{const token=c.open(jar['__Host-orbita-'+provider]);if(!token)throw Error('NOT_CONNECTED');save(provider,{...token,[key]:value})};
 const id=value=>{if(typeof value!=='string'||!/^[-\w]{8,180}$/.test(value))throw Error('INVALID_SELECTION');return value};
 if(path==='calendars'&&method==='GET'){const j=await(await google('https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=250')).json();return response(200,{items:(j.items||[]).map(x=>({id:x.id,title:x.summary}))})}
 if(path==='calendar/select'&&method==='POST'){const body=JSON.parse(event.body||'{}');if(typeof body.id!=='string'||body.id.length>300)throw Error('INVALID_SELECTION');await selected('google','calendar',body.id);return response(200,{selected:true})}
 const local=date=>{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(date));const val=k=>parts.find(x=>x.type===k).value;return {date:val('year')+'-'+val('month')+'-'+val('day'),time:val('hour')+':'+val('minute')}};
 const classify=title=>/prova|avalia[cç][aã]o|\bp[123]\b/i.test(title)&&!/estudo|revis|simulado/i.test(title)?'exam':/simulado/i.test(title)?'mock':/revis[aã]o/i.test(title)?'review':/estudo/i.test(title)?'study':'class';
 if(path==='calendar/sync'&&method==='POST'){
   const token=c.open(jar['__Host-orbita-google']);if(!token?.calendar)throw Error('SELECT_CALENDAR');let pageToken='',events=[];
   for(let page=0;page<10;page++){const url=new URL('https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(token.calendar)+'/events');url.search=new URLSearchParams({timeMin:new Date(Date.now()-7*86400000).toISOString(),timeMax:new Date(Date.now()+90*86400000).toISOString(),singleEvents:'true',orderBy:'startTime',maxResults:'250',timeZone:TZ,...(pageToken?{pageToken}:{})}).toString();const j=await(await google(url.href)).json();events.push(...(j.items||[]));pageToken=j.nextPageToken||'';if(!pageToken)break}if(pageToken)throw Error('TOO_MANY_RESULTS');
   const mapped=events.filter(e=>e.status!=='cancelled').map(e=>{const title=e.summary||'',subject=title.match(/\b(?:MED120|MEE120|MEP230|MEP140|ELE010|MEF120|MRD230|MEI150|CSJ030)\b/)?.[0]||null;const start=e.start?.dateTime?local(e.start.dateTime):{date:e.start?.date,time:null},end=e.end?.dateTime?local(e.end.dateTime):{date:e.end?.date,time:null};return {id:e.id,title,subject,kind:classify(title),date:start.date,start:start.time,...(end.date===start.date&&end.time?{end:end.time}:{}),description:e.description||'',allDay:!start.time}});
   return response(200,{captured_at:new Date().toISOString(),source:'Google Calendar OAuth',timezone:TZ,all_events:mapped,study_events:mapped.filter(e=>e.subject&&e.start&&['study','review','mock'].includes(e.kind)).map(e=>({...e,kind:'study',originalKind:e.kind}))});
 }
 if(path==='notion/databases'&&method==='GET'){const j=await notion('search',{filter:{value:'data_source',property:'object'},page_size:100});if(j.has_more)throw Error('TOO_MANY_RESULTS');return response(200,{items:j.results.map(x=>({id:x.id,title:(x.title||[]).map(t=>t.plain_text).join('')||'Base sem título'}))})}
 if(path==='notion/select'&&method==='POST'){const body=JSON.parse(event.body||'{}');await selected('notion','database',id(body.id));return response(200,{selected:true})}
 function text(property){if(!property)return '';const value=property[property.type];if(typeof value==='string'||typeof value==='number')return String(value);if(Array.isArray(value))return value.map(x=>x.plain_text||x.name||'').join(', ');return value?.name||value?.start||''}
 if(path==='notion/sync'&&method==='POST'){
   const token=c.open(jar['__Host-orbita-notion']);if(!token?.database)throw Error('SELECT_NOTION');let cursor='',pages=[];
   for(let i=0;i<20;i++){const j=await notion('data_sources/'+id(token.database)+'/query',{page_size:100,...(cursor?{start_cursor:cursor}:{})});pages.push(...j.results);cursor=j.has_more?j.next_cursor:'';if(!cursor)break}if(cursor)throw Error('TOO_MANY_RESULTS');
   const records=pages.map(page=>{const p=page.properties||{},get=(...keys)=>{for(const key of keys)if(p[key])return text(p[key]);return ''};return {id:page.id,subject:get('Matéria','Materia','subject'),topic:get('Conteúdo','Conteudo','topic'),priority:get('Prioridade','priority'),confidence:get('Confiança antes da correção','Confiança','confidence'),review_on:get('Revisar em','review_on'),status:get('Status','status'),observation:get('Onde começou o erro','O que eu fiz','observation'),next_rule:get('Regra para próxima vez','next_rule'),type:get('Tipo de erro','type'),origin:page.url}}).filter(x=>x.subject&&x.topic);
   return response(200,{captured_at:new Date().toISOString(),source:'Notion OAuth — somente leitura',error_records:[...new Map(records.map(x=>[x.id,x])).values()],grades:[]});
 }
 if(path==='drive/folders'&&method==='GET'){const j=await(await google('https://www.googleapis.com/drive/v3/files?'+new URLSearchParams({q:"mimeType='application/vnd.google-apps.folder' and trashed=false",pageSize:'100',fields:'files(id,name),nextPageToken'}))).json();return response(200,{items:j.files,moreAvailable:!!j.nextPageToken})}
 if(path==='drive/select'&&method==='POST'){const body=JSON.parse(event.body||'{}');await selected('google','folder',id(body.id));return response(200,{selected:true})}
 if(path==='drive/sync'&&method==='POST'){
   const token=c.open(jar['__Host-orbita-google']);if(!token?.folder)throw Error('SELECT_FOLDER');let cursor='',files=[];
   for(let i=0;i<10;i++){const url='https://www.googleapis.com/drive/v3/files?'+new URLSearchParams({q:`'${id(token.folder)}' in parents and trashed=false`,pageSize:'100',fields:'files(id,name,mimeType,modifiedTime,webViewLink,size,description),nextPageToken',...(cursor?{pageToken:cursor}:{})});const j=await(await google(url)).json();files.push(...j.files);cursor=j.nextPageToken||'';if(!cursor)break}if(cursor)throw Error('TOO_MANY_RESULTS');
   return response(200,{captured_at:new Date().toISOString(),source:'Google Drive OAuth — pasta selecionada',subjects:[],sources:files.map(f=>({id:f.id,title:f.name,mimeType:f.mimeType,modifiedAt:f.modifiedTime,url:f.webViewLink||'https://drive.google.com/file/d/'+f.id+'/view',description:f.description||'',size:f.size||null})),scope:'Somente filhos diretos da pasta selecionada; não é extração integral de PDFs.'});
 }
 if(path==='drive/document'&&method==='POST'){
   const body=JSON.parse(event.body||'{}'),fileId=id(body.id),token=c.open(jar['__Host-orbita-google']);if(!token?.folder)throw Error('SELECT_FOLDER');
   const meta=await(await google('https://www.googleapis.com/drive/v3/files/'+fileId+'?fields=id,name,mimeType,parents,size,webViewLink')).json();if(!(meta.parents||[]).includes(token.folder))return response(403,{error:'Arquivo fora da pasta selecionada'});
   const isDoc=meta.mimeType==='application/vnd.google-apps.document',isText=meta.mimeType==='text/plain';if(!isDoc&&!isText)return response(415,{error:'Extração disponível para Google Docs e texto. PDFs exigem extrator autenticado com páginas e diagramas.'});if(Number(meta.size||0)>1000000)return response(413,{error:'Documento acima de 1 MB'});
   const url=isDoc?'https://www.googleapis.com/drive/v3/files/'+fileId+'/export?mimeType=text%2Fplain':'https://www.googleapis.com/drive/v3/files/'+fileId+'?alt=media';const r=await google(url),reader=r.body.getReader();let chunks=[],size=0;while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>1000000){await reader.cancel();return response(413,{error:'Documento acima de 1 MB'})}chunks.push(Buffer.from(part.value))}const content=Buffer.concat(chunks).toString('utf8');return response(200,{id:fileId,title:meta.name,url:meta.webViewLink,content,extractedAt:new Date().toISOString(),page:null,pageNotice:'Texto exportado sem paginação; não inventa número de página.',recommendedLinks:[...new Set(content.match(/https?:\/\/[^\s<>"\]]+/g)||[])].filter(u=>/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(u)).slice(0,100)});
 }
 return response(404,{error:'Operação indisponível'});
 }catch(error){const known={NOT_CONNECTED:'Conecte a conta para sincronizar.',RECONNECT:'A autorização expirou. Conecte novamente.',SELECT_CALENDAR:'Selecione um calendário.',SELECT_NOTION:'Selecione a base de estudos.',SELECT_FOLDER:'Selecione a pasta acadêmica.',TOO_MANY_RESULTS:'Fonte grande demais para uma sincronização completa; restrinja a seleção.',PROVIDER_DENIED:'O provedor recusou a operação. Verifique permissões e reconecte.',COOKIE_CAPACITY:'Resposta de autenticação grande demais para o armazenamento seguro de sessão.',INVALID_SELECTION:'Seleção inválida.'};return response(error.message==='NOT_CONNECTED'?401:400,{error:known[error.message]||'Não foi possível concluir a operação. Dados anteriores foram preservados.'})}
}}
module.exports={handler:createHandler(),createHandler};
