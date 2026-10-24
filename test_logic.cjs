const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const dir=path.join(__dirname,'site');
const storage=new Map();let html='',errors=[];
function setup(){
 const listeners={};const app={set innerHTML(v){html=v},get innerHTML(){return html}};
 const document={getElementById(id){return id==='app'?app:null},querySelector(){return null},createElement(){return {remove(){},click(){},set textContent(x){},get textContent(){return ''}}},body:{appendChild(){},removeChild(){}},addEventListener(type,cb){listeners[type]=cb}};
 const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 const window={scrollTo(){},addEventListener(){},location:{protocol:'file:'},ORBITA_DATA:null};
 const context=vm.createContext({window,document,localStorage,navigator:{},location:{protocol:'file:'},setTimeout(){},setInterval(){return 1},clearInterval(){},Date,Math,JSON,Number,String,Map,Set,URL,Blob,console,confirm(){return true},FormData,Error});
 for(const f of ['data.js','features.js','app.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),context,{filename:f});
 return {listeners,context,window};
}
let {listeners,window}=setup();
const click=(dataset)=>listeners.click({target:{closest:()=>({dataset})},preventDefault(){}});
async function imp(key,file){await listeners.change({target:{id:'import-'+key,files:[{size:fs.statSync(file).size,text:async()=>fs.readFileSync(file,'utf8')}]}})}
const checks=[];
function test(name,fn){try{fn();checks.push({name,status:'PASS'});console.log('PASS',name)}catch(e){checks.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.message)}}
(async()=>{
 test('Tela inicial abre com nove matérias',()=>{assert(html.includes('Aprender um pouco.'));assert((html.match(/class="subject"/g)||[]).length===9)});
 test('Não embute dados privados',()=>{assert(!fs.readFileSync(path.join(dir,'data.js'),'utf8').includes('drive.google.com'))});
 test('Tela Hoje sem agenda não inventa exercício',()=>{click({page:'daily'});assert(html.includes('Importe o arquivo agenda_estudos_snapshot.json'))});
 const p=path.join(__dirname,'tests/fixtures');
 await imp('calendar',path.join(p,'agenda_estudos_snapshot.json'));
 await imp('notion',path.join(p,'notion_estudos_snapshot.json'));
 await imp('drive',path.join(p,'fontes_drive.json'));
 test('Importação privada de 3 snapshots',()=>{const d=JSON.parse(storage.get('orbita_private_v1'));assert(d.imports.calendar.study_events.length>15);assert(d.imports.notion.grades.length===9);assert(d.imports.drive.subjects.length===9)});
 test('Hoje seleciona Hill 23/10',()=>{click({act:'daily-date',date:'2026-10-23'});click({page:'daily'});if(!html.includes('Critério de Hill: montar os coeficientes'))console.log('DEBUG DAILY',html.slice(0,2600));assert(html.includes('Critério de Hill: montar os coeficientes'))});
 test('Bloqueia correção sem confiança',()=>{assert(html.includes('data-act="daily-reveal" disabled'))});
 test('Correção com confiança',()=>{click({act:'daily-confidence',value:'75'});click({act:'daily-reveal'});assert(html.includes('Correção comentada'))});
 test('Registro de autoavaliação',()=>{click({act:'daily-status',value:'independente'});click({act:'daily-save'});const d=JSON.parse(storage.get('orbita_private_v1'));assert(d.dailyAttempts.length===1);assert(d.dailyAttempts[0].source==='autoavaliação')});
 test('Sem bloco 07/11 não inventa exercício',()=>{click({act:'daily-date',date:'2026-11-07'});assert(html.includes('Nenhum bloco'))});
 test('Notas e fórmulas projetadas',()=>{click({page:'grades'});assert(html.includes('5,15'));assert(html.includes('6,34'));assert(html.includes('Projeções não são notas oficiais'))});
 test('Exam Prep e simulado autoral',()=>{click({page:'prep'});assert(html.includes('Preparação de provas'));click({act:'start-sim',sub:'MEP230'});assert(html.includes('Simulado autoral'));click({act:'pick',choice:'0'});click({act:'confidence',value:'75'});click({act:'assess'});assert(html.includes('Finalizar simulado')===false);click({act:'next-quiz'});assert(html.includes('Simulado autoral'));click({act:'exit-sim'});assert(html.includes('Preparação de provas'))});
 test('Feed renderiza sem erro',()=>{click({page:'feed'});assert(html.includes('Para você'));click({act:'next-feed'});assert(html.includes('2 de '))});
 test('Quiz exige confiança',()=>{click({page:'quiz'});click({act:'pick',choice:'0'});assert(html.includes('data-act="assess" disabled'))});
 test('Quiz com confiança salva evidência',()=>{const old=JSON.parse(storage.get('orbita_private_v1')).attempts.length;click({act:'confidence',value:'50'});click({act:'assess'});const d=JSON.parse(storage.get('orbita_private_v1'));assert(d.attempts.length===old+1);assert(d.attempts.at(-1).confidence===50);assert(d.attempts.at(-1).reviewDue)});
 test('Quiz revela resposta não marca acerto',()=>{const old=JSON.parse(storage.get('orbita_private_v1')).attempts.length;click({act:'next-quiz'});click({act:'reveal'});const d=JSON.parse(storage.get('orbita_private_v1'));assert(d.attempts.length===old+1);assert(d.attempts.at(-1).correct===false)});
 test('Persistência após reload JS',()=>{({listeners,window}=setup());assert(html.includes('Aprender um pouco.'));click({page:'progress'});assert.equal(JSON.parse(storage.get('orbita_private_v1')).attempts.length,3);assert(html.includes('Seu progresso'))});
 test('Formulário privado Drive abre link importado',()=>{click({act:'open-sub',sub:'MEP230'});assert(html.includes('Pasta Drive'));assert(html.includes('https://example.org/material-sintetico'))});
 test('Simulado termina e apresenta relatório',()=>{click({page:'prep'});click({act:'discard-sim'});click({act:'start-sim',sub:'MEP230'});for(let i=0;i<4;i++){click({act:'pick',choice:'0'});click({act:'confidence',value:'75'});click({act:'assess'});click({act:'next-quiz'});}assert(html.includes('SIMULADO FINALIZADO'));assert(html.includes('Resultado do treino'));click({act:'exit-sim'});assert(html.includes('Preparação de provas'))});
 test('Sem dados pessoais no JS publicado',()=>{for(const f of fs.readdirSync(dir)){if(!f.endsWith('.js'))continue;const txt=fs.readFileSync(path.join(dir,f),'utf8');assert(!txt.includes('https://example.org/material-sintetico'))}});
 const F=window.ORBITA_FEATURES;
 test('Cálculo Hill validado',()=>{assert(Math.abs(F.p2Needed({subject:'MEP140',p1:3})-5.14834)<.001);assert(Math.abs(F.p2Needed({subject:'MEP230',p1:3})-6.333333)<.001)});
 test('Regra de matching sem inventar evento',()=>{assert(F.chooseChallenge(null)===null);assert(F.chooseChallenge({subject:'MEP230',title:'Hill'})?.id==='hill-coeff')});
 test('Agenda desconhecida não recebe exercício inventado',()=>assert.equal(F.chooseChallenge({subject:'MEP230',title:'Tema inexistente'}),null));
 test('Rejeita agenda com hora ou data inválida',()=>{assert(!F.validCalendar({study_events:[{subject:'MEP230',title:'Hill',date:'2026-02-30',start:'10:00'}]}));assert(!F.validCalendar({study_events:[{subject:'MEP230',title:'Hill',date:'2026-10-23',start:'99:00'}]}))});
 test('Rejeita Drive com URL executável',()=>assert(!F.validDrive({subjects:[{code:'MEP230',drive_folder:'javascript:alert(1)'}]})));
 test('Rejeita backup que quebraria renderização',()=>{assert(!F.validState({attempts:[],exams:[],notes:[]}));assert(!F.validState({attempts:[null],exams:[]}));assert(!F.validState({attempts:[],exams:[],imports:{notion:{error_records:[null]}}}))});
 test('Duplo envio não duplica evidência',()=>{click({page:'quiz'});click({act:'quiz-filter',sub:'all'});click({act:'pick',choice:'0'});click({act:'confidence',value:'75'});click({act:'assess'});const n=JSON.parse(storage.get('orbita_private_v1')).attempts.length;click({act:'assess'});click({act:'reveal'});assert.equal(JSON.parse(storage.get('orbita_private_v1')).attempts.length,n)});
 const ok=checks.filter(x=>x.status==='PASS').length;
 fs.writeFileSync(path.join(__dirname,'TEST-RESULTS.json'),JSON.stringify(checks,null,2));
 console.log('RESULTADO',ok,'/',checks.length);
 if(ok!==checks.length)process.exitCode=1;
})();
