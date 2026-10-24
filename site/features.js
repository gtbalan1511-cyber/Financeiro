/* Órbita: lógica local e exercícios AUTORAIS. Nenhum dado pessoal neste arquivo. */
window.ORBITA_FEATURES = (() => {
  'use strict';
  const challenges = [
    {id:'hill-coeff',subject:'MEP230',match:['hill','anisotrop'],title:'Critério de Hill: montar os coeficientes sem errar sinais',minutes:25,
      statement:'Um material ortotrópico apresenta resistências normais X = 250 MPa, Y = 200 MPa e Z = 180 MPa. Para a forma de Hill F(σy−σz)² + G(σz−σx)² + H(σx−σy)² + 2Lτyz² + 2Mτzx² + 2Nτxy² = 1, determine F, G e H a partir de 1/X²=G+H, 1/Y²=F+H e 1/Z²=F+G. Calcule o índice apenas para σx=100 MPa, σy=60 MPa, σz=0 e cisalhamentos nulos. Diga se atingiu 1.',
      prompts:['Identifique as três equações que ligam resistências e coeficientes.','Resolva simbolicamente F, G e H antes de substituir.','Confira sinais, unidades em MPa⁻² e ordem de grandeza.','Calcule o índice e compare com 1.'],
      hint:'F = 1/2(1/Y² + 1/Z² − 1/X²); G = 1/2(1/X² + 1/Z² − 1/Y²); H = 1/2(1/X² + 1/Y² − 1/Z²).',
      solution:'1/X² = 1,6000×10⁻⁵; 1/Y² = 2,5000×10⁻⁵; 1/Z² = 3,08642×10⁻⁵ MPa⁻². F ≈ 1,99321×10⁻⁵, G ≈ 1,09321×10⁻⁵ e H ≈ 5,06790×10⁻⁶ MPa⁻². Índice = F(60)² + G(−100)² + H(40)² ≈ 0,1892 < 1. Não atinge o limite de Hill neste estado. Valores apenas para esta questão autoral.'},
    {id:'castigliano',subject:'MEP230',match:['castigliano','energia','deforma','deslocamento'],title:'Carga unitária: momento por trechos',minutes:30,
      statement:'Viga simplesmente apoiada de vão L=4 m e EI constante. Duas cargas verticais para baixo: P1=6 kN em x=1 m e P2=4 kN em x=3 m. Determine o deslocamento vertical em x=2 m pelo método da carga unitária. Deixe a resposta em função de EI, com unidades coerentes (kN e m).',
      prompts:['Faça o DCL e calcule RA e RB.','Divida M(x) nos intervalos 0–1, 1–3 e 3–4 m; use (x−a) após a carga.','Aplique carga unitária em x=2 m e determine m(x) por trechos.','Monte δ=∫ M(x)m(x)/(EI) dx; não inclua 1/2.'],
      hint:'RA = 5,5 kN; RB = 4,5 kN. M = 5,5x − 6⟨x−1⟩ − 4⟨x−3⟩ (kN·m). Para a carga unitária, m = x/2 até 2 m e m = (4−x)/2 após 2 m.',
      solution:'M(x): 5,5x (0≤x<1); 6−0,5x (1≤x<3); 18−4,5x (3≤x≤4). m(x)=x/2 (0≤x≤2) e (4−x)/2 (2≤x≤4). A integral por trechos [0,1],[1,2],[2,3],[3,4] fornece δ = 9,1667/(EI), no sentido das cargas, quando EI está em kN·m²; o numerador possui unidade kN·m³. Confira sinais conforme convenção do professor.'},
    {id:'lewis',subject:'MEP140',match:['lewis','engrenag','hertz'],title:'Engrenagem: torque, força tangencial e Lewis',minutes:25,
      statement:'Um pinhão transmite P=6 kW a n=1200 rpm. O diâmetro primitivo é d=80 mm, módulo m=4 mm, largura de face b=40 mm e fator de forma de Lewis Y=0,32 (definição σ=Ft/(b m Y)). Calcule torque, Ft e tensão nominal de flexão de Lewis. Ignore fatores dinâmicos não fornecidos e explique por que isso NÃO verifica Hertz.',
      prompts:['Converta n para rad/s e calcule T=P/ω.','Use Ft=2T/d com d em metros.','Substitua b e m em mm para σ em N/mm².','Explique a diferença entre flexão de raiz e contato superficial.'],
      hint:'T≈47,75 N·m. Use Ft≈1193,7 N. Não misture N·m com mm.',
      solution:'ω=2π(1200/60)=125,664 rad/s; T=6000/125,664≈47,75 N·m; Ft=2(47,75)/0,08≈1193,7 N; σLewis≈1193,7/(40·4·0,32)=23,31 MPa. É tensão nominal simplificada; Hertz exige dados de contato/curvatura/material.'},
    {id:'heat-exchanger',subject:'MEE120',match:['trocador','dml','dtml','ntu'],title:'Trocador de calor: balanço e DML',minutes:30,
      statement:'Um trocador em contracorrente recebe água quente a 80 °C, saindo a 60 °C, e água fria entrando a 20 °C e saindo a 40 °C. Vazão do lado quente: 0,20 kg/s, cp=4180 J/(kg·K). Considere regime permanente, sem perdas. Determine Q, ΔT1, ΔT2, ΔTml e UA se F=1. Explique o caso ΔT1=ΔT2.',
      prompts:['Defina os lados e os pares de temperaturas terminais.','Calcule Q=ṁ cp ΔT para o lado quente.','Escreva ΔTml=(ΔT1−ΔT2)/ln(ΔT1/ΔT2) e avalie o limite quando iguais.','Encontre UA=Q/ΔTml e confira unidades.'],
      hint:'Na contracorrente: ΔT1=Th,in−Tc,out e ΔT2=Th,out−Tc,in. Neste caso, são iguais.',
      solution:'Q=0,20·4180·20=16.720 W. ΔT1=80−40=40 K e ΔT2=60−20=40 K. Quando ΔT1=ΔT2, o limite da DML é 40 K (não é indeterminação física). UA=16.720/40=418 W/K. A vazão fria não foi fornecida; não a invente.'},
    {id:'forced-vibration',subject:'MED120',match:['forçad','lista 4','amplitude','resson','vibra'],title:'Vibração forçada: Xest não é X0',minutes:25,
      statement:'Um sistema 1 GDL tem m=5 kg, k=2000 N/m, amortecimento viscoso c=20 N·s/m e excitação F(t)=100cos(10t) N. Monte a EDM pelo DCL, calcule ωn, ζ, r, deslocamento estático Xest e amplitude estacionária X0. Indique as unidades e a diferença física entre Xest e X0.',
      prompts:['DCL → somatório de forças e EDM: m x¨+c x˙+kx=F0cos(ωt).','Determine ωn=√(k/m), ccr=2mωn e ζ=c/ccr.','Calcule r=ω/ωn e G=1/√[(1−r²)²+(2ζr)²].','Compare Xest=F0/k com X0=G Xest.'],
      hint:'ωn=20 rad/s; ζ=0,10; r=0,50; Xest=0,050 m.',
      solution:'EDM: 5x¨+20x˙+2000x=100cos(10t). ωn=20 rad/s, ccr=200 N·s/m, ζ=0,1 e r=0,5. G=1/√(0,75²+0,1²)≈1,3216. Xest=0,05 m; X0≈0,0661 m (66,1 mm). Xest é referência estática, X0 é amplitude da resposta forçada.'},
    {id:'two-dof',subject:'MED120',match:['2 gdl','dois grau','modos','frequências'],title:'Dois graus de liberdade: matrizes M e K',minutes:30,
      statement:'Duas massas iguais m=2 kg deslizam horizontalmente sem atrito, conectadas entre si por uma mola k=300 N/m; cada massa também está ligada à parede externa por uma mola k=300 N/m. Defina x1 e x2 positivos para a direita. Monte DCL, EDM matricial, determinante característico e frequências naturais.',
      prompts:['Desenhe as forças de cada mola em cada massa.','Escreva M e K sem trocar o sinal do acoplamento.','Resolva det(K−ω²M)=0.','Explique modos em fase e em oposição de fase.'],
      hint:'M=diag(2,2) kg e K=[[600,−300],[−300,600]] N/m.',
      solution:'2x1¨+600x1−300x2=0; 2x2¨−300x1+600x2=0. λ(K)={300,900} N/m; ω1=√(300/2)=√150≈12,25 rad/s, ω2=√(900/2)=√450≈21,21 rad/s. Modos proporcionais a [1,1] e [1,−1].'},
    {id:'phasors',subject:'ELE010',match:['trifásic','fasor','argument','linha','fase'],title:'Trifásico equilibrado: referência e argumento',minutes:25,
      statement:'Fonte trifásica equilibrada sequência ABC, ligação estrela, tensão de fase VAN=127∠0° V (RMS). Determine VBN, VCN, VAB, VBC, VCA e a corrente IA para carga por fase Z=10∠30° Ω. Indique qual fasor é referência e justifique os +30° nas tensões de linha.',
      prompts:['Anote referência VAN e sequência ABC.','Determine as tensões de fase separadas por 120°.','Para VAB, subtraia VAN−VBN, não some módulos.','Para IA use a tensão e impedância do MESMO ramo.'],
      hint:'VBN=127∠−120° V, VCN=127∠120° V; VAB=√3·127∠30° V.',
      solution:'VBN=127∠−120° V; VCN=127∠120° V. VAB≈220∠30° V, VBC≈220∠−90° V, VCA≈220∠150° V. IA=VAN/Z=12,7∠−30° A. Para sequência ABC, tensão de linha adianta a fase correspondente em 30°; verificar sempre a convenção.'},
    {id:'power-factor',subject:'ELE010',match:['fator de potência','potência'],title:'Fator de potência: identificar Q antes de calcular',minutes:25,
      statement:'Uma instalação monofásica consome P=4,0 kW com FP=0,80 atrasado em 220 V RMS. Determine S, Q, I e a potência reativa capacitiva necessária para corrigir FP a 0,95 atrasado. Indique sinais e unidades.',
      prompts:['FP atrasado indica carga indutiva: Q positivo pela convenção usual.','S=P/FP; Q=P tan(arccos FP).','I=S/V em sistema monofásico.','Qc=P[tan(φ1)−tan(φ2)] e é fornecido pelo banco capacitivo.'],
      hint:'S=5,0 kVA; Q=3,0 kvar; I≈22,73 A.',
      solution:'φ1≈36,87°, S=5 kVA, Q=+3,0 kvar e I≈22,73 A. tanφ2=√(1−0,95²)/0,95≈0,32868. Qfinal≈1,3147 kvar. Banco capacitivo fornece magnitude Qc≈1,6853 kvar (injeção capacitiva, sinal negativo para Q do capacitor).'},
    {id:'polymers',subject:'MRD230',match:['termoplást','elastômer','compósito','maxwell','kelvin','polímero'],title:'Polímeros: fluência, relaxação e modelos',minutes:20,
      statement:'Uma barra polimérica sofre ensaio A com tensão mantida constante e deformação crescente ao longo do tempo. Em B, a deformação é mantida constante e a tensão cai. Classifique A e B. Desenhe esquematicamente Maxwell e Kelvin–Voigt, explique quais elementos estão em série e paralelo e dê um cuidado ao interpretar as curvas.',
      prompts:['Separe a grandeza imposta e a grandeza que evolui.','Identifique fluência versus relaxação.','Associe mola e amortecedor aos modelos.','Compare comportamento instantâneo e dependência temporal.'],
      hint:'Tensão constante → fluência. Deformação constante → relaxação.',
      solution:'A: fluência. B: relaxação. Maxwell: mola + amortecedor em série. Kelvin–Voigt: mola + amortecedor em paralelo. Não confundir a curva correta com justificativa física errada; a adequação de cada modelo depende do ensaio e das hipóteses.'},
    {id:'machining',subject:'MEF120',match:['fresamento','furação','força','potência'],title:'Usinagem: potência de corte e unidades',minutes:20,
      statement:'Em um fresamento, a força tangencial de corte estimada é Fc=600 N e a velocidade de corte é Vc=120 m/min. Calcule potência de corte em kW. Se a eficiência global do acionamento for η=0,80, estime potência exigida do motor e indique por que Vc em m/min não pode ser usada diretamente como m/s.',
      prompts:['Converta Vc para m/s.','Calcule Pc=Fc·Vc.','Converta W para kW.','Divida pela eficiência para obter potência de entrada.'],
      hint:'120 m/min=2 m/s.',
      solution:'Pc=600·2=1200 W=1,20 kW. Pmotor=Pc/0,80=1,50 kW. Trata-se de estimativa idealizada sem fatores adicionais de máquina.'}
  ];
  const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function chooseChallenge(event){if(!event)return null;const title=normalize(event.title||'');const description=normalize(event.description||'');const candidates=challenges.filter(c=>c.subject===event.subject);return candidates.map(c=>({c,score:c.match.reduce((n,k)=>n+(title.startsWith(normalize(k))?10:title.includes(normalize(k))?3:0)+(description.includes(normalize(k))?1:0),0)})).sort((a,b)=>b.score-a.score).find(x=>x.score>0)?.c||null}
  const dateLocal=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
  const rows=(a,fn)=>Array.isArray(a)&&a.length<=20000&&a.every(x=>obj(x)&&fn(x));
  const text=x=>typeof x==='string';
  const https=x=>{try{return new URL(x).protocol==='https:'}catch{return false}};
  const validDate=x=>text(x)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!isNaN(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
  function validCalendar(j){return obj(j)&&rows(j.study_events,e=>validDate(e.date)&&text(e.subject)&&text(e.title)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(e.start))}
  function validNotion(j){return obj(j)&&rows(j.error_records,e=>text(e.subject)&&text(e.topic))&&rows(j.grades,g=>text(g.subject)&&(g.p1==null||Number.isFinite(g.p1)&&g.p1>=0&&g.p1<=10))}
  function validDrive(j){return obj(j)&&['sources','subjects','folders'].some(k=>Array.isArray(j[k]))&&['sources','subjects','folders','verified_documents'].every(k=>j[k]===undefined||rows(j[k],x=>['url','drive_folder'].every(k=>x[k]===undefined||https(x[k]))))}
  function legacyValidState(j){return obj(j)&&['attempts','reviewed','savedFeed','feedViewed','exams','customLinks','dailyAttempts'].every(k=>j[k]===undefined||Array.isArray(j[k]))&&(j.unavailableContent===undefined||Array.isArray(j.unavailableContent)&&j.unavailableContent.every(str))&&(j.sessionSerial===undefined||Number.isSafeInteger(j.sessionSerial)&&j.sessionSerial>=0)&&
    (j.privateCards===undefined||rows(j.privateCards,x=>/^private-[-\w]+$/.test(x.id)&&(window.ORBITA_DATA.subjects.some(s=>s.id===x.subject)||(j.customSubjects||[]).some(s=>s.id===x.subject))&&str(x.body)&&str(x.title)&&x.private===true&&x.format==='lesson'&&Number.isFinite(x.durationSeconds)&&Array.isArray(x.prerequisites)))&&
    (j.contentEvents===undefined||rows(j.contentEvents,e=>str(e.contentId)&&Number.isFinite(e.at)&&['shown','completed','answered'].includes(e.kind)))&&
    rows(j.attempts,a=>text(a.qid)&&text(a.subject)&&text(a.topic)&&typeof a.correct==='boolean')&&rows(j.exams,e=>text(e.id)&&text(e.subject)&&text(e.title)&&validDate(e.date))&&(!j.customLinks||rows(j.customLinks,l=>text(l.subject)&&text(l.title)&&https(l.url)))&&(!j.notes||obj(j.notes))&&(!j.settings||obj(j.settings))&&(!j.imports||obj(j.imports)&&['calendar','notion','drive'].every(k=>j.imports[k]==null||({calendar:validCalendar,notion:validNotion,drive:validDrive})[k](j.imports[k])))}
  function p2Needed(g,target=5){if(!g||!Number.isFinite(g.p1))return null;const p1=g.p1;switch(g.subject){
    case 'MEP230':return (target-.4*p1)/.6;
    case 'MEE120':return (target-.35*p1)/.65;
    case 'MED120':return (target-.4*p1)/.6;
    case 'MEF120':return (target-.2*p1-.1*10-.1*10)/.6; // T1 é hipótese, nunca dado oficial
    case 'MEP140':if(p1<=0)return null;return Math.pow(target/(Math.pow(10,.2)*Math.pow(p1,.3)),2); // A=10 projetado
    case 'ELE010':return (target/(.6+.01*10+.05*10)-.4*p1)/.6; // AT=REL=10 projetados
    default:return null;
  }}
  return {challenges,chooseChallenge,dateLocal,validCalendar,validNotion,validDrive,validState:legacyValidState,p2Needed};
})();

/* Regras puras 1.4: sem rede, sem armazenamento e sem dados pessoais. */
Object.assign(window.ORBITA_FEATURES, (()=>{
  const F=window.ORBITA_FEATURES;
  const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
  const str=x=>typeof x==='string'&&x.length<=20000;
  const rows=(a,fn)=>Array.isArray(a)&&a.length<=20000&&a.every(x=>object(x)&&fn(x));
  const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
  const time=x=>typeof x==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(x);
  const https=x=>{try{const u=new URL(x);return u.protocol==='https:'&&!u.username&&!u.password}catch{return false}};
  const conf=x=>x==null||[20,50,75,100].includes(x);
  const normalize=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const activeError=e=>!['concluido','resolvido','done','arquivado'].includes(normalize(e.status));
  function shiftDate(day,n){const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+n);return F.dateLocal(d)}
  function validCalendar(j){return object(j)&&rows(j.study_events,e=>date(e.date)&&str(e.subject)&&str(e.title)&&time(e.start)&&(e.end===undefined||time(e.end)&&e.end>e.start))}
  function validNotion(j){return object(j)&&rows(j.error_records,e=>str(e.subject)&&str(e.topic)&&(e.status===undefined||str(e.status)))&&rows(j.grades,g=>str(g.subject)&&(g.p1==null||Number.isFinite(g.p1)&&g.p1>=0&&g.p1<=10))}
  function validDrive(j){return object(j)&&['sources','subjects','folders'].some(k=>Array.isArray(j[k]))&&['sources','subjects','folders','verified_documents'].every(k=>j[k]===undefined||rows(j[k],x=>['url','drive_folder'].every(k=>x[k]===undefined||https(x[k]))))}
  function safeTree(x,depth=0){if(depth>25)return false;if(!x||typeof x!=='object')return true;return Object.keys(x).every(k=>!['__proto__','constructor','prototype'].includes(k)&&safeTree(x[k],depth+1))}
  function validState(j){return object(j)&&safeTree(j)&&
    (j.customSubjects===undefined||rows(j.customSubjects,s=>/^[-A-Z0-9]{2,20}$/.test(s.id)&&str(s.name)&&str(s.short)&&Array.isArray(s.topics)&&s.topics.length===0))&&
    (j.quizDraft==null||object(j.quizDraft)&&str(j.quizDraft.qid)&&(j.quizDraft.picked===null||Number.isInteger(j.quizDraft.picked)&&j.quizDraft.picked>=0&&j.quizDraft.picked<=3)&&['assessed','hinted','reveal'].every(k=>typeof j.quizDraft[k]==='boolean')&&conf(j.quizDraft.confidence))&&
    (j.unavailableContent===undefined||Array.isArray(j.unavailableContent)&&j.unavailableContent.every(str))&&(j.sessionSerial===undefined||Number.isSafeInteger(j.sessionSerial)&&j.sessionSerial>=0)&&
    (j.privateCards===undefined||rows(j.privateCards,x=>/^private-[-\w]+$/.test(x.id)&&(window.ORBITA_DATA.subjects.some(s=>s.id===x.subject)||(j.customSubjects||[]).some(s=>s.id===x.subject))&&str(x.body)&&str(x.title)&&x.private===true&&x.format==='lesson'&&Number.isFinite(x.durationSeconds)&&Array.isArray(x.prerequisites)))&&
    (j.contentEvents===undefined||rows(j.contentEvents,e=>str(e.contentId)&&Number.isFinite(e.at)&&['shown','completed','answered'].includes(e.kind)))&&
    rows(j.attempts,a=>str(a.qid)&&str(a.subject)&&str(a.topic)&&typeof a.correct==='boolean'&&conf(a.confidence)&&(a.reviewDue===undefined||date(a.reviewDue)))&&
    rows(j.exams,e=>str(e.id)&&str(e.subject)&&str(e.title)&&date(e.date))&&
    ['savedFeed','feedViewed'].every(k=>j[k]===undefined||Array.isArray(j[k])&&j[k].length<=20000&&j[k].every(str))&&
    (j.reviewed===undefined||rows(j.reviewed,r=>str(r.id)&&typeof r.known==='boolean'&&date(r.date)))&&
    (j.customLinks===undefined||rows(j.customLinks,l=>str(l.subject)&&str(l.title)&&https(l.url)))&&
    (j.dailyAttempts===undefined||rows(j.dailyAttempts,a=>str(a.id)&&date(a.day)&&str(a.status)&&conf(a.confidence)))&&
    (j.simHistory===undefined||rows(j.simHistory,a=>str(a.id)&&str(a.subject)&&Array.isArray(a.attemptIds)&&a.attemptIds.every(str)&&date(a.date)))&&
    (j.reviewLog===undefined||rows(j.reviewLog,a=>str(a.id)&&str(a.subject)&&str(a.topic)&&date(a.date)))&&
    (j.activeSim==null||object(j.activeSim)&&str(j.activeSim.id)&&str(j.activeSim.subject)&&Array.isArray(j.activeSim.ids)&&j.activeSim.ids.length>0&&j.activeSim.ids.every(str)&&Number.isInteger(j.activeSim.index)&&j.activeSim.index>=0&&j.activeSim.index<j.activeSim.ids.length)&&
    (j.notes===undefined||object(j.notes)&&Object.values(j.notes).every(str))&&
    (j.settings===undefined||object(j.settings)&&['5','10','15','30',undefined].includes(j.settings.duration))&&
    (j.imports===undefined||object(j.imports)&&['calendar','notion','drive'].every(k=>j.imports[k]==null||({calendar:validCalendar,notion:validNotion,drive:validDrive})[k](j.imports[k])))}
  const latest=arr=>[...new Map(arr.map(a=>[a.qid||a.id,a])).values()];
  function schedule(previous,correct,help,confidence,day){
    const independent=correct&&!help&&confidence>=75;
    const prior=previous?.streak||0,due=previous?.date<day&&previous?.reviewDue<=day;
    const streak=independent?(prior>0?prior+(due?1:0):1):0;
    const interval=independent?[3,7,14,30,60][Math.min(streak-1,4)]:1;
    return {date:day,streak,interval,reviewDue:independent&&prior>0&&!due?previous.reviewDue:shiftDate(day,interval)};
  }
  function topicMatches(a,b){a=normalize(a);b=normalize(b);return !!a&&!!b&&(a.includes(b)||b.includes(a))}
  function rankQuestions(questions,state,day,topic='all'){
    const last=new Map(latest(state.attempts).map(a=>[a.qid,a]));
    return questions.filter(q=>topic==='all'||q.topic===topic).map(q=>{
      const a=last.get(q.id);const errors=state.imports?.notion?.error_records||[];
      const study=(state.imports?.calendar?.study_events||[]).some(e=>e.date===day&&e.subject===q.subject&&topicMatches(e.title+' '+(e.description||''),q.topic));
      const exam=(state.exams||[]).some(e=>e.subject===q.subject&&e.date>=day&&e.date<=shiftDate(day,14)&&topicMatches(e.topics||'',q.topic));
      const score=(errors.filter(activeError).some(e=>e.subject===q.subject&&topicMatches(e.topic,q.topic))?8:0)+(study?5:0)+(exam?3:0);
      return {q,score:score+(a&&(!a.correct||a.help||a.confidence<75)?6:0)+(a?.reviewDue<=day?4:0)+(!a?1:0)};
    }).sort((a,b)=>b.score-a.score).map(x=>x.q);
  }
  function studyEvents(calendar,subjects,from){return (calendar?.study_events||[]).filter(e=>(!from||e.date>=from)&&subjects.some(s=>s.id===e.subject)&&(['study','mock'].includes(e.kind)||(!e.kind&&/\bestudo\b|\brevis[aã]o\b|\bsimulado\b/i.test(e.title)))).slice().sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))}
  function nextBlocks(calendar,subjects,now=new Date()){
    const academic=calendar?.timezone==='America/Sao_Paulo'?F.academicClock(now):null;const day=academic?.date||F.dateLocal(now),clock=academic?.time||String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    return studyEvents(calendar,subjects,day).filter(e=>e.date>day||(e.end||e.start)>=clock).slice(0,8);
  }
  function chooseDaily(event,errors=[]){
    const direct=F.chooseChallenge(event);if(direct)return direct;if(!event)return null;
    // Um bloco genérico pode usar dificuldade ativa; um tema explícito sem correspondência não é substituído.
    if(!/^estudo\s*(p[23])?\s*[-–:]?\s*([A-Z]{3}\d{3})?\s*$/i.test(event.title.trim()))return null;
    for(const e of errors.filter(x=>activeError(x)&&x.subject===event.subject)){const ch=F.chooseChallenge({...event,title:e.topic});if(ch)return ch}return null;
  }
  function feedback(attempt){if(attempt.origin==='reveal')return 'A solução foi consultada: refaça sem olhar em outro dia; consulta não conta como erro nem como domínio.';if(!attempt.correct&&attempt.confidence>=75)return 'Alta confiança com erro: explique a hipótese e confira o método antes de refazer. Registre onde o raciocínio mudou.';if(!attempt.correct)return 'Retome os dados, desenhe o modelo e confira unidades. Faça uma nova tentativa amanhã.';if(attempt.help)return 'Acertou com apoio: retire a dica e tente recuperar o método sozinho no próximo reteste.';if(attempt.confidence<75)return 'Acertou com pouca confiança: justifique por que as outras alternativas falham e confirme no reteste.';return 'Resposta independente e confiante. A revisão foi espaçada; retenção será confirmada por uma nova tentativa.'}
  // Exportação ICS explícita: somente eventos únicos. Recorrências são recusadas para não omitir datas silenciosamente.
  function parseICS(source,subjects){
    const lines=source.replace(/\r?\n[ \t]/g,'').split(/\r?\n/);let ev=null;const events=[];
    for(const line of lines){if(line==='BEGIN:VEVENT'){ev={};continue}if(line==='END:VEVENT'){
      if(ev?.RRULE||ev?.RDATE||ev?.EXDATE||ev?.['RECURRENCE-ID'])throw Error('Agenda recorrente: exporte os blocos expandidos em JSON. Nenhum evento foi importado.');
      if(ev&&/\bestudo\b|revis[aã]o|simulado/i.test(ev.SUMMARY||'')){
        const subject=subjects.find(s=>(ev.SUMMARY+' '+(ev.DESCRIPTION||'')).includes(s.id));
        if(!subject)throw Error('Inclua o código da disciplina (ex.: MEP230) no evento de estudo.');
        const parseDate=v=>{const m=/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/.exec(v||'');if(!m)throw Error('Evento sem horário: use JSON com data e hora explícitas.');
          if(m[7]){const d=new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]||'00'}Z`);return {date:F.dateLocal(d),time:String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}}
          return {date:`${m[1]}-${m[2]}-${m[3]}`,time:`${m[4]}:${m[5]}`}};
        const start=parseDate(ev.DTSTART),end=ev.DTEND?parseDate(ev.DTEND):null;
        if(end&&end.date!==start.date)throw Error('Bloco atravessa meia-noite: divida em dois blocos JSON.');
        events.push({id:ev.UID||`${start.date}|${start.time}|${subject.id}`,kind:'study',date:start.date,start:start.time,...(end?{end:end.time}:{}),subject:subject.id,title:ev.SUMMARY,description:ev.DESCRIPTION||''});
      }ev=null;continue}
      if(ev){const colon=line.indexOf(':');if(colon>0){const key=line.slice(0,colon).split(';')[0];if(/TZID=/.test(line.slice(0,colon)))throw Error('ICS com TZID: exporte JSON em horário local ou ICS UTC (Z).');ev[key]=line.slice(colon+1).replace(/\\n/gi,'\n').replace(/\\([,;\\])/g,'$1')}}
    }
    const j={captured_at:new Date().toISOString(),source:'ICS local',study_events:[...new Map(events.map(e=>[e.id,e])).values()]};if(!validCalendar(j)||!events.length)throw Error('Nenhum bloco de estudo válido encontrado.');return j;
  }
  function parseNotionCSV(source){
    const rows=[];let row=[],cell='',quoted=false;source=source.replace(/^\uFEFF/,'');
    for(let i=0;i<source.length;i++){const c=source[i];if(c==='"'){if(quoted&&source[i+1]==='"'){cell+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){row.push(cell);cell=''}else if(c==='\n'&&!quoted){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=''}else cell+=c}if(quoted)throw Error('CSV com aspas incompletas.');if(cell||row.length){row.push(cell.replace(/\r$/,''));rows.push(row)}
    const headers=(rows.shift()||[]).map(normalize);const index=(...names)=>headers.findIndex(h=>names.includes(h));
    const si=index('materia','subject'),ti=index('conteudo','topic');if(si<0||ti<0)throw Error('CSV precisa das colunas Matéria e Conteúdo.');
    const get=(r,...keys)=>r[index(...keys)]||'';
    const errors=rows.filter(r=>r.some(Boolean)).map(r=>({subject:r[si].trim(),topic:r[ti].trim(),observation:get(r,'onde comecou o erro','observation','erro / questao'),next_rule:get(r,'regra para proxima vez','next_rule'),status:get(r,'status'),review_on:get(r,'revisar em'),type:get(r,'tipo de erro')}));
    const j={captured_at:new Date().toISOString(),source:'CSV local do Notion',error_records:errors,grades:[]};if(!validNotion(j))throw Error('Erros inválidos no CSV.');return j;
  }
  return {validState,validCalendar,validNotion,validDrive,date,time,https,normalize,activeError,shiftDate,latest,schedule,rankQuestions,studyEvents,nextBlocks,chooseDaily,feedback,parseICS,parseNotionCSV};
})());


// Pacotes pessoais são lidos apenas no navegador; nunca fazem parte do catálogo público.
Object.assign(window.ORBITA_FEATURES, (()=>{
 const F=window.ORBITA_FEATURES;
 const key=x=>String(x.id||x.url||[x.subject,x.date,x.start,x.title||x.topic||x.code].join('|'));
 function mergeRows(old=[],incoming=[]){const m=new Map(old.map(x=>[key(x),x]));for(const x of incoming)m.set(key(x),{...m.get(key(x)),...x});return [...m.values()]}
 function mergeSnapshot(kind,old,incoming){
  const check={calendar:F.validCalendar,notion:F.validNotion,drive:F.validDrive}[kind];
  if(!check?.(incoming))throw Error('Estrutura incompatível: '+kind);
  const older=Date.parse(incoming.captured_at)<Date.parse(old?.captured_at);const out=older?{...incoming,...old}:{...old,...incoming};
  for(const field of ['study_events','error_records','grades','sources','subjects','folders','verified_documents','references','study_records','all_events'])
   if(Array.isArray(old?.[field])||Array.isArray(incoming[field]))out[field]=older?mergeRows(incoming[field],old?.[field]):mergeRows(old?.[field],incoming[field]);
  if(!older&&kind==='calendar'&&incoming.complete&&F.date(incoming.sync_window?.from)&&F.date(incoming.sync_window?.to)){
   const {from,to}=incoming.sync_window;for(const field of ['study_events','all_events'])if(Array.isArray(incoming[field]))out[field]=mergeRows((old?.[field]||[]).filter(x=>x.date<=from||x.date>=to),incoming[field]);
  }
  if(!older&&kind==='drive'&&incoming.complete&&incoming.root_folder&&incoming.root_folder===old?.root_folder)for(const field of ['sources','verified_documents'])out[field]=incoming[field]||[];
  return out;
 }
 function normalizePersonal(files,subjects){
  if(files?.schema==='orbita-personal-package-v1')files=files.files;
  if(!files||typeof files!=='object'||Array.isArray(files))throw Error('Pacote pessoal inválido');
  const known=s=>subjects.some(x=>x.id===s), imports={}, exams=[], rejected=[];
  const safe=x=>typeof x==='string'&&x.length<=20000;
  for(const [name,j] of Object.entries(files)){
   if(!j||typeof j!=='object')throw Error('Documento inválido: '+name);
   const meta={captured_at:j.captured_at,complete:j.complete===true,source:'Pacote pessoal importado (não sincronizado)',original_source:j.source,original_schema:j.schema,note:j.note};
   if(j.schema==='orbita-calendar-starter-v1'){
    if(j.timezone!=='America/Sao_Paulo'||!Array.isArray(j.events))throw Error('Agenda sem fuso ou eventos válidos');
    const rows=[];
    for(const e of j.events){
     // Exige instante com offset explícito; converte a data civil no fuso acadêmico.
     if(!known(e.subject)||!safe(e.summary)||!/^\d{4}-\d\d-\d\dT\d\d:\d\d.*(Z|[+-]\d\d:\d\d)$/.test(e.start||'')||!F.date(e.start.slice(0,10))||!/^\d{4}-\d\d-\d\dT\d\d:\d\d.*(Z|[+-]\d\d:\d\d)$/.test(e.end||'')||!F.date((e.end||'').slice(0,10))||!Number.isFinite(Date.parse(e.start))||!Number.isFinite(Date.parse(e.end))||Date.parse(e.end)<=Date.parse(e.start)){rejected.push(name+': evento inválido');continue}
     const parts=t=>Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(t)).map(x=>[x.type,x.value]));
     const a=parts(e.start),b=parts(e.end),date=`${a.year}-${a.month}-${a.day}`,endDate=`${b.year}-${b.month}-${b.day}`;
     if(date!==endDate){rejected.push(name+': bloco atravessa meia-noite');continue}
     const kinds={study:'study',review:'study',mock:'mock',class:'class',exam:'exam',lab:'lab',activity:'activity'};
     const kind=kinds[e.type]||'unknown';
     rows.push({...e,id:e.id||[e.subject,e.start,e.summary].join('|'),date,start:`${a.hour}:${a.minute}`,end:`${b.hour}:${b.minute}`,title:e.summary,kind,source_start:e.start,source_end:e.end});
     // Eventos de estudo com P2 no título não são datas de prova.
     if(['exam','lab','activity'].includes(kind)&&e.confirmed===true)exams.push({id:'calendar:'+key(e),subject:e.subject,title:e.summary,date,type:kind,confirmed:true,source:'calendar',evidence:e.id||e.start,topics:[]});
    }
    imports.calendar={...meta,timezone:j.timezone,study_events:rows};
   }else if(j.schema==='orbita-notion-references-v1'){
    if(!Array.isArray(j.sources)||!Array.isArray(j.weak_topics))throw Error('Referências Notion inválidas');
    const references=j.sources.filter(x=>{const ok=safe(x.title)&&F.https(x.url);if(!ok)rejected.push(name+': referência inválida');return ok});
    const error_records=j.weak_topics.filter(x=>{const ok=known(x.subject)&&safe(x.topic)&&F.https(x.url);if(!ok)rejected.push(name+': dificuldade inválida');return ok}).map(x=>({...x,id:x.url,evidence:'Dificuldade referenciada; tentativa e revisão não exportadas'}));
    imports.notion={...meta,references,error_records,grades:[]};
   }else if(j.schema==='orbita-drive-references-v1'){
    if(!Array.isArray(j.materials))throw Error('Materiais inválidos');
    const sources=j.materials.filter(x=>{const ok=known(x.subject)&&safe(x.title)&&F.https(x.url);if(!ok)rejected.push(name+': material inválido');return ok});
    imports.drive={...meta,sources,verified_documents:sources.map(x=>({...x,verified:'Referência importada; conteúdo não recuperado'}))};
   }else if(j.schema==='orbita-exams-seed-v1'){
    if(!Array.isArray(j.exams))throw Error('Avaliações inválidas');
    for(const e of j.exams){if(known(e.subject)&&safe(e.title)&&F.date(e.date)&&e.confirmed===true&&safe(e.source)&&safe(e.evidence)&&['exam','lab','activity','mock'].includes(e.type))exams.push({...e,id:e.id||'assessment:'+key(e)});else rejected.push(name+': avaliação sem confirmação/evidência')}
   }else throw Error('Esquema não reconhecido: '+name);
  }
  if(!Object.keys(imports).length&&!exams.length)throw Error('Pacote sem fontes reconhecidas');
  for(const [k,v] of Object.entries(imports))if(!({calendar:F.validCalendar,notion:F.validNotion,drive:F.validDrive})[k](v))throw Error('Dados convertidos inválidos: '+k);
  return {imports,exams,rejected};
 }
 function mergePersonal(state,normalized){
  const imports={...state.imports};for(const [k,v] of Object.entries(normalized.imports))imports[k]=mergeSnapshot(k,imports[k],v);
  const next={...state,imports,exams:mergeRows(state.exams,normalized.exams)};
  const cal=normalized.imports.calendar;
  if(cal?.source==='Google Calendar OAuth'&&cal.complete&&F.date(cal.sync_window?.from)&&F.date(cal.sync_window?.to)){
   const incomingIds=new Set(normalized.exams.map(e=>e.id));const withdrawn=(state.exams||[]).filter(e=>e.source==='Google Calendar OAuth'&&e.date>cal.sync_window.from&&e.date<cal.sync_window.to&&!incomingIds.has(e.id));
   const ids=new Set(withdrawn.map(e=>e.id));next.exams=next.exams.filter(e=>!ids.has(e.id));
   if(withdrawn.length)next.assessmentHistory=[...(state.assessmentHistory||[]),...withdrawn.map(e=>({...e,confirmed:false,status:'Não confirmado na sincronização atual',checked_at:cal.captured_at}))];
  }
  if(!F.validState(next))throw Error('Importação incompatível com o histórico existente');return next;
 }
 function academicClock(now=new Date()){
  const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));
  return {date:`${p.year}-${p.month}-${p.day}`,time:`${p.hour}:${p.minute}`};
 }
 return {mergeRows,mergeSnapshot,normalizePersonal,mergePersonal,academicClock};
})());
