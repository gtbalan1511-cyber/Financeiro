/* Last locally persisted snapshot is the offline queue. No tokens in localStorage. */
window.ORBITA_PROGRESS=(()=>{
 const KEY='orbita_progress_sync_v1',DATA='orbita_private_v1';
 let adapter,timer,inFlight=null,conflict=null,message='Entre na área pessoal para sincronizar entre aparelhos.',meta={revision:null,dirty:false},enabled=false;
 try{meta={...meta,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{}
 const text=x=>JSON.stringify(x);
 function persist(){try{localStorage.setItem(KEY,text(meta));return true}catch{message='Não foi possível guardar a fila de sincronização. Exporte um backup.';paint();return false}}
 function paint(){const node=document.getElementById('progress-sync-status');if(node)node.textContent=message;const buttons=document.getElementById('progress-conflict');if(buttons)buttons.hidden=!conflict}
 function changed(){meta.dirty=true;if(!persist())return;clearTimeout(timer);timer=setTimeout(sync,800);message=navigator.onLine?'Progresso salvo neste aparelho; aguardando sincronização.':'Offline: progresso salvo neste aparelho, aguardando conexão.';paint()}
 async function call(method,body){const response=await fetch('/api/progress',{method,credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:text(body)}:{})});const data=await response.json();if(!response.ok&&response.status!==409)throw Error(data.error||'Servidor indisponível');return {status:response.status,...data}}
 function meaningful(data){return ['attempts','exams','reviewed','dailyAttempts','simHistory','privateCards','customLinks','contentEvents','customSubjects'].some(k=>data[k]?.length)||Object.keys(data.notes||{}).length||Object.values(data.imports||{}).some(Boolean)||data.activeSim||data.quizDraft}
 function hold(remote){conflict=remote;message='Há progresso diferente no servidor. Exporte as duas cópias e escolha qual continuar; nada foi sobrescrito.';paint()}
 function apply(remote){if(adapter.blocked()){message='Progresso disponível de outro aparelho. Termine a atividade e sincronize.';paint();return false}if(!adapter.apply(remote.data)){message='Cópia remota incompatível. A cópia local foi preservada.';paint();return false}meta={revision:remote.revision,dirty:false};persist();return true}
 function sync(){if(inFlight)return inFlight;inFlight=runSync().finally(()=>{inFlight=null});return inFlight}
 async function runSync(){
  if(!adapter||conflict)return;
  try{
   if(adapter.blockedStorage()){message='Resolva o aviso de armazenamento antes de sincronizar.';return}
   if(!navigator.onLine){message='Offline: progresso salvo neste aparelho, aguardando conexão.';return}
   const status=await window.ORBITA_CONNECTIONS.api('status');enabled=!!status.authorized&&!!status.progress?.configured;
   if(!enabled){message=status.authorized?'Banco privado ainda não configurado. Progresso somente neste aparelho.':'Entre na área pessoal para sincronizar entre aparelhos.';return}
   const remote=await call('GET'),local=adapter.get();
   if(remote.data){
    if(meta.revision===null&&meaningful(local)&&text(local)!==text(remote.data)){hold(remote);return}
    if(remote.revision!==meta.revision){
     if(meta.dirty&&meaningful(local)&&text(local)!==text(remote.data)){hold(remote);return}
     if(!apply(remote))return;
    }
   }else if(meta.revision!==0){meta.revision=0;meta.dirty=true;persist()}
   if(meta.dirty){
    const sending=adapter.get(),sent=text(sending),result=await call('PUT',{revision:meta.revision||0,data:sending});
    if(result.status===409){hold(result);return}
    meta.revision=result.revision;meta.dirty=text(adapter.get())!==sent;persist();
   }
   message=meta.dirty?'Novas alterações locais aguardam envio.':'Progresso sincronizado entre aparelhos.';
  }catch(error){message='Sincronização pendente: '+error.message+'. Seus dados locais foram preservados.'}
  finally{paint();if(meta.dirty&&enabled&&!conflict&&message==='Novas alterações locais aguardam envio.')timer=setTimeout(sync,800)}
 }
 function download(data,name){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text({app:'orbita-estudos',version:1,data})],{type:'application/json'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 function mount(){const host=document.getElementById('progress-panel');if(!host)return;host.innerHTML='<h3>Continuar em outro aparelho</h3><p>Use o mesmo endereço HTTPS e a mesma área pessoal no computador e no iPhone. Alterações offline ficam neste aparelho até a conexão voltar.</p><p id="progress-sync-status" role="status"></p><button class="btn secondary" data-progress="sync">Sincronizar progresso</button><div id="progress-conflict" hidden><p>Antes de escolher, exporte as duas versões. A versão não escolhida não será mesclada automaticamente.</p><button class="btn secondary" data-progress="export">Exportar ambas as cópias</button><button class="btn secondary" data-progress="remote">Continuar com a cópia do servidor</button><button class="btn secondary" data-progress="local">Enviar a cópia deste aparelho</button></div>';
  host.querySelector('[data-progress=sync]').onclick=sync;
  host.querySelector('[data-progress=export]').onclick=()=>{if(conflict){download(adapter.get(),'orbita-local.json');download(conflict.data,'orbita-servidor.json')}};
  host.querySelector('[data-progress=remote]').onclick=()=>{if(conflict&&confirm('Usar o progresso do servidor? Exporte antes a cópia local para preservar diferenças.')){if(apply(conflict)){conflict=null;message='Cópia do servidor recebida.';paint();mount()}}};
  host.querySelector('[data-progress=local]').onclick=()=>{if(conflict&&confirm('Enviar a cópia deste aparelho? Exporte antes a cópia do servidor para preservar diferenças.')){meta.revision=conflict.revision;meta.dirty=true;if(persist()){conflict=null;sync()}}};paint();
 }
 function connect(value){adapter=value;sync()}
 window.addEventListener('online',sync);window.addEventListener('focus',sync);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')sync()});
 setInterval(()=>{if(document.visibilityState==='visible')sync()},30000);
 return {connect,changed,mount,sync};
})();
