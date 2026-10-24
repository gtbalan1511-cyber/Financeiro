// Diagnóstico público: não imprime cookies, tokens ou conteúdo acadêmico.
async function check(base,request=fetch){
 try{const origin=new URL(base);if(origin.protocol!=='https:'&&origin.hostname!=='127.0.0.1'&&origin.hostname!=='localhost')throw Error('HTTPS_REQUIRED');const r=await request(new URL('/api/status',origin),{redirect:'error',signal:AbortSignal.timeout(15000),headers:{Accept:'application/json'}});if(!r.ok)return {available:false,status:r.status};if(!r.headers.get('content-type')?.includes('application/json'))return {available:false,reason:'A rota API retornou uma página, não JSON'};const s=await r.json();return {available:true,configured:s.configured===true,googleConfigured:s.google?.configured===true,notionConfigured:s.notion?.configured===true,readOnly:s.readOnly===true,timezone:s.timezone,accountsValidated:false}}catch{return {available:false,reason:'API inacessível; verificar HTTPS, rota e permissão de rede'}}
}
if(require.main===module)check(process.argv[2]||process.env.ORBITA_BASE_URL).then(s=>{console.log(JSON.stringify(s,null,2));process.exitCode=s.available&&s.configured&&s.googleConfigured&&s.notionConfigured?0:2});
module.exports={check};
