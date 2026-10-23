window.ORBITA_RECOMMEND=(()=>{
 const DAY=86400000,normalize=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const overlap=(a,b)=>{a=normalize(a);b=normalize(b);return a&&b&&(a.includes(b)||b.includes(a))};
 function evidence(state,concept,subject,now){const attempts=(state.attempts||[]).filter(a=>a.subject===subject&&(a.concept===concept||overlap(a.topic,concept))&&a.origin!=='reveal');const correct=attempts.filter(a=>a.correct&&!a.help&&a.confidence>=75);const days=new Set(correct.map(a=>a.date));const last=attempts.at(-1);return {mastered:days.size>=2&&!!last?.correct&&!last?.help&&last?.confidence>=75,wrong:attempts.filter(a=>!a.correct).length,last,due:!!last?.reviewDue&&last.reviewDue<=new Date(now).toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'})}}
 function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
 function plan(catalog,state,{minutes=15,now=Date.now(),seed=String(now),subject='all',savedOnly=false,online=true}={}){
  const events=state.contentEvents||[],blocked=new Set((state.unavailableContent||[]).map(x=>typeof x==='string'?x:x.id)),day=new Date(now).toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});
  const lastSeen=new Map();for(const e of events)if(e.kind==='shown')lastSeen.set(e.contentId,e);
  const previousConcept=new Map();for(const e of events)if(e.kind==='shown')previousConcept.set(e.subject+'|'+e.concept,e);
  const errors=(state.imports?.notion?.error_records||[]).filter(e=>!['resolvido','concluido','done','arquivado'].includes(normalize(e.status)));
  const study=(state.imports?.calendar?.study_events||[]).filter(e=>e.date===day&&(e.kind==='study'||/estudo|revis[aã]o|simulado/i.test(e.title)));
  const upcoming=[...(state.exams||[]),...(state.imports?.calendar?.all_events||[]).filter(e=>e.kind==='exam')].filter(e=>e.date>=day&&Date.parse(e.date)-now<14*DAY);
  let candidates=catalog.items.filter(x=>(subject==='all'||x.subject===subject)&&(!savedOnly||(state.savedFeed||[]).includes(x.id))&&!blocked.has(x.id)&&!(x.format==='video'&&(!online||!['verified','source-verified'].includes(x.verification?.status)))).map(item=>{
    const matching=errors.filter(x=>x.subject===item.subject&&(overlap(x.topic,item.title)||overlap(x.topic,item.concept))),notionDue=matching.some(x=>x.review_on&&x.review_on<=day),notionPriority=matching.some(x=>/alta|high/i.test(x.priority||'')),notionLowConfidence=matching.some(x=>Number.parseFloat(x.confidence)<50);
    const seen=lastSeen.get(item.id),e=evidence(state,item.concept,item.subject,now),notion=errors.some(x=>x.subject===item.subject&&(overlap(x.topic,item.title)||overlap(x.topic,item.concept))),agenda=study.some(x=>x.subject===item.subject),exam=upcoming.some(x=>x.subject===item.subject),recentConcept=previousConcept.get(item.subject+'|'+item.concept);
    let reason=e.due?'Revisão espaçada vencida':notionDue?'Revisão programada no Notion':notion?'Dificuldade ativa do Notion':agenda?'Bloco de estudo de hoje':exam?'Avaliação próxima':!seen?'Conteúdo ainda não visto':'Retomada após intervalo';
    // Nunca repete o mesmo item em 6 horas; revisão vencida usa outro formato do conceito quando disponível.
    const age=seen?now-seen.at:Infinity;if(age<6*3600000)return null;
    if(item.prerequisites?.some(p=>!evidence(state,p,item.subject,now).mastered))return null;
    const conceptRecent=recentConcept&&now-recentConcept.at<20*60000;
    if(conceptRecent&&!e.due&&!notion)return null;
    let score=(!seen?20:0)+(e.due?30:0)+(notion?22:0)+(notionDue?10:0)+(notionPriority?5:0)+(notionLowConfidence?3:0)+(agenda?12:0)+(exam?8:0)+(Math.min(e.wrong,3)*4)-(e.mastered?15:0)+(hash(seed+item.id)%1000)/1000;
    if(recentConcept&&recentConcept.format===item.format&&e.due)score-=12;
    return {item,score,reason,e};
  }).filter(Boolean);
  const queue=[],conceptCount=new Map();let seconds=0,lastSub='',lastFormat='';const target=minutes*60;
  while(candidates.length&&seconds<target){candidates.sort((a,b)=>(b.score-(b.item.subject===lastSub?18:0)-(b.item.format===lastFormat?12:0))-(a.score-(a.item.subject===lastSub?18:0)-(a.item.format===lastFormat?12:0)));
    const selected=candidates.shift(),key=selected.item.subject+'|'+selected.item.concept;if((conceptCount.get(key)||0)>=1)continue;
    const duration=Math.max(20,selected.item.durationSeconds);if(selected.item.format==='video'&&duration>target-seconds)continue;queue.push({id:selected.item.id,reason:selected.reason,estimatedSeconds:duration});conceptCount.set(key,1);seconds+=duration;lastSub=selected.item.subject;lastFormat=selected.item.format;
  }
  return {queue,estimatedSeconds:seconds,targetSeconds:target,insufficient:seconds<target,available:candidates.length,generatedAt:now,seed};
 }
 return {plan,evidence,hash};
})();
