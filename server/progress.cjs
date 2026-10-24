/* Private single-owner progress. Portable SQL, conditional revision and encrypted payloads. */
const {codec}=require('../netlify/functions/lib/security');
const collections=['attempts','reviewed','savedFeed','feedViewed','exams','customLinks','dailyAttempts','simHistory','reviewLog','contentEvents','unavailableContent','privateCards','assessmentHistory','customSubjects'];
const allowed=new Set([...collections,'notes','settings','started','imports','activeSim','sessionSerial','quizDraft']);
function valid(data){
 if(!data||typeof data!=='object'||Array.isArray(data)||!Array.isArray(data.attempts)||!Array.isArray(data.exams))return false;
 const walk=(x,depth=0)=>{if(depth>25)return false;if(typeof x==='string')return x.length<=1000000;if(x&&typeof x==='object')return Object.entries(x).every(([k,v])=>!['__proto__','prototype','constructor'].includes(k)&&(!['url','drive_folder'].includes(k)||typeof v==='string'&&safeURL(v))&&walk(v,depth+1));return true};
 if(Buffer.byteLength(JSON.stringify(data),'utf8')>1000000||!walk(data)||!Object.keys(data).every(k=>allowed.has(k)))return false;
 if(!collections.every(k=>data[k]===undefined||Array.isArray(data[k])&&data[k].length<=20000))return false;
 const str=x=>typeof x==='string'&&x.length<=20000,obj=x=>x&&typeof x==='object'&&!Array.isArray(x),date=x=>str(x)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x,conf=x=>x==null||[20,50,75,100].includes(x);
 return (data.customSubjects||[]).every(s=>obj(s)&&/^[-A-Z0-9]{2,20}$/.test(s.id)&&str(s.name)&&str(s.short)&&Array.isArray(s.topics)&&s.topics.length===0)&&
 (data.quizDraft==null||obj(data.quizDraft)&&str(data.quizDraft.qid)&&(data.quizDraft.picked===null||Number.isInteger(data.quizDraft.picked)&&data.quizDraft.picked>=0&&data.quizDraft.picked<=3)&&['assessed','hinted','reveal'].every(k=>typeof data.quizDraft[k]==='boolean')&&conf(data.quizDraft.confidence))&&
 data.attempts.every(x=>obj(x)&&str(x.qid)&&str(x.subject)&&str(x.topic)&&typeof x.correct==='boolean'&&conf(x.confidence)&&(!x.reviewDue||date(x.reviewDue)))&&data.exams.every(x=>obj(x)&&str(x.id)&&str(x.subject)&&str(x.title)&&date(x.date))&&
 ['savedFeed','feedViewed','unavailableContent'].every(k=>(data[k]||[]).every(str))&&
 (data.reviewed||[]).every(x=>obj(x)&&str(x.id)&&typeof x.known==='boolean'&&date(x.date))&&
 (data.customLinks||[]).every(x=>obj(x)&&str(x.title)&&str(x.subject)&&safeURL(x.url))&&
 (data.dailyAttempts||[]).every(x=>obj(x)&&str(x.id)&&date(x.day)&&str(x.status)&&conf(x.confidence))&&
 (data.simHistory||[]).every(x=>obj(x)&&str(x.id)&&str(x.subject)&&Array.isArray(x.attemptIds)&&x.attemptIds.every(str)&&date(x.date))&&
 (data.reviewLog||[]).every(x=>obj(x)&&str(x.id)&&str(x.subject)&&str(x.topic)&&date(x.date))&&
 (data.contentEvents||[]).every(x=>obj(x)&&str(x.contentId)&&Number.isFinite(x.at)&&['shown','completed','answered'].includes(x.kind))&&
 (data.privateCards||[]).every(x=>obj(x)&&/^private-[-\w]+$/.test(x.id)&&str(x.subject)&&str(x.body)&&str(x.title)&&x.private===true&&x.format==='lesson'&&Number.isFinite(x.durationSeconds)&&Array.isArray(x.prerequisites))&&
 (data.activeSim==null||obj(data.activeSim)&&str(data.activeSim.id)&&str(data.activeSim.subject)&&Array.isArray(data.activeSim.ids)&&data.activeSim.ids.length>0&&data.activeSim.ids.every(str)&&Number.isInteger(data.activeSim.index)&&data.activeSim.index>=0&&data.activeSim.index<data.activeSim.ids.length)&&
 (data.notes===undefined||obj(data.notes)&&Object.values(data.notes).every(str))&&
 (data.settings===undefined||obj(data.settings)&&['5','10','15','30',undefined].includes(data.settings.duration))&&
 (data.sessionSerial===undefined||Number.isSafeInteger(data.sessionSerial)&&data.sessionSerial>=0)&&
 (data.imports===undefined||obj(data.imports)&&['calendar','notion','drive'].every(k=>{
 const j=data.imports[k];if(j==null)return true;if(!obj(j))return false;
 const rows=(a,fn)=>Array.isArray(a)&&a.length<=20000&&a.every(x=>obj(x)&&fn(x));
 if(k==='calendar')return rows(j.study_events,e=>date(e.date)&&str(e.subject)&&str(e.title)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(e.start)&&(e.end===undefined||/^([01]\d|2[0-3]):[0-5]\d$/.test(e.end)&&e.end>e.start));
 if(k==='notion')return rows(j.error_records,e=>str(e.subject)&&str(e.topic)&&(e.status===undefined||str(e.status)))&&rows(j.grades,g=>str(g.subject)&&(g.p1==null||Number.isFinite(g.p1)&&g.p1>=0&&g.p1<=10));
 return ['sources','subjects','folders'].some(k=>Array.isArray(j[k]))&&['sources','subjects','folders','verified_documents'].every(k=>j[k]===undefined||rows(j[k],x=>['url','drive_folder'].every(k=>x[k]===undefined||safeURL(x[k]))));
 }));
}
function safeURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password}catch{return false}}
const schema=`CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL);`;
class ProgressStore{
 constructor(sql,secret){this.sql=sql;this.cipher=codec(secret)}
 async read(){const row=await this.sql.get();if(!row)return {revision:0,data:null,updatedAt:null};const decoded=this.cipher.open(row.payload);if(!decoded||!valid(decoded.data))throw Error('PROGRESS_UNREADABLE');return {revision:row.revision,data:decoded.data,updatedAt:row.updated_at}}
 async write(revision,data){
  if(!Number.isSafeInteger(revision)||revision<0||!valid(data))return {status:422,error:'Progresso inválido. A cópia anterior foi preservada.'};
  const current=await this.read();
  // A retry after a lost response must not create another revision.
  if(JSON.stringify(current.data)===JSON.stringify(data))return {status:200,...current};
  if(current.revision!==revision)return {status:409,error:'Outro aparelho atualizou o progresso. Resolva o conflito antes de enviar.',...current};
  const updatedAt=new Date().toISOString(),payload=this.cipher.seal({data,exp:8640000000000000});
  if(!await this.sql.cas(revision,payload,updatedAt))return {status:409,error:'Progresso alterado em outro aparelho.',...await this.read()};
  return {status:200,revision:revision+1,data,updatedAt};
 }
}
function d1Store(db,secret){return new ProgressStore({get:()=>db.prepare('SELECT * FROM progress WHERE id=1').first(),cas:async(revision,payload,at)=>{const statement=revision===0?db.prepare('INSERT OR IGNORE INTO progress VALUES(1,1,?,?)').bind(payload,at):db.prepare('UPDATE progress SET revision=revision+1,payload=?,updated_at=? WHERE id=1 AND revision=?').bind(payload,at,revision);return (await statement.run()).meta.changes>0}},secret)}
module.exports={valid,schema,d1Store,ProgressStore};
