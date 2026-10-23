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
  function validState(j){return obj(j)&&['attempts','reviewed','savedFeed','feedViewed','exams','customLinks','dailyAttempts'].every(k=>j[k]===undefined||Array.isArray(j[k]))&&rows(j.attempts,a=>text(a.qid)&&text(a.subject)&&text(a.topic)&&typeof a.correct==='boolean')&&rows(j.exams,e=>text(e.id)&&text(e.subject)&&text(e.title)&&validDate(e.date))&&(!j.customLinks||rows(j.customLinks,l=>text(l.subject)&&text(l.title)&&https(l.url)))&&(!j.notes||obj(j.notes))&&(!j.settings||obj(j.settings))&&(!j.imports||obj(j.imports)&&['calendar','notion','drive'].every(k=>j.imports[k]==null||({calendar:validCalendar,notion:validNotion,drive:validDrive})[k](j.imports[k])))}
  function p2Needed(g,target=5){if(!g||!Number.isFinite(g.p1))return null;const p1=g.p1;switch(g.subject){
    case 'MEP230':return (target-.4*p1)/.6;
    case 'MEE120':return (target-.35*p1)/.65;
    case 'MED120':return (target-.4*p1)/.6;
    case 'MEF120':return (target-.2*p1-.1*10-.1*10)/.6; // T1 é hipótese, nunca dado oficial
    case 'MEP140':return Math.pow(target/(Math.pow(10,.2)*Math.pow(p1,.3)),2); // A=10 projetado
    case 'ELE010':return (target/(.6+.01*10+.05*10)-.4*p1)/.6; // AT=REL=10 projetados
    default:return null;
  }}
  return {challenges,chooseChallenge,dateLocal,validCalendar,validNotion,validDrive,validState,p2Needed};
})();
