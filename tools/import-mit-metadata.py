"""Importa metadados de checkouts públicos MIT OCW. Não transfere vídeos, PDFs ou arquivos acadêmicos privados."""
from pathlib import Path
import re,json,subprocess,datetime,sys
base=Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/orbita-academic-sources')
selected=[];seen=set()
config=[('2.003sc','2.003sc-fall-2011','MED120',10,3300),('6.002','6.002-spring-2007','ELE010',10,3300),('8.01sc','8.01sc-fall-2016','MEP230',40,600)]
for folder,repo,subject,limit,duration in config:
 root=base/folder;sha=subprocess.check_output(['git','-C',str(root),'rev-parse','HEAD'],text=True).strip()
 resources=[];local_seen=set()
 for p in sorted((root/'content/resources').glob('*.md')):
  text=p.read_text();m=re.search(r'youtube_id: ([\w-]{11})',text)
  if not m or m[1] in seen or m[1] in local_seen:continue
  # Evita aliases que apontam para o mesmo vídeo; título deve existir no frontmatter.
  title=re.search(r'^title: (.*(?:\n  [^\n]+)*)',text,re.M)
  if not title:continue
  title=re.sub(r'\s+',' ',title.group(1)).strip("'\"")
  if title.startswith(('DD.','PS.')):continue
  instructor=re.search(r'\*\*Instructor:\*\* ([^\n]+)',text)
  local_seen.add(m[1]);resources.append((m[1],title,p,instructor.group(1) if instructor else 'MIT OpenCourseWare'))
 for youtube,title,p,instructor in resources[:limit]:
  if youtube in seen:continue
  seen.add(youtube)
  selected.append({'youtubeId':youtube,'title':title,'subject':subject,'concept':'mit-'+youtube,'durationSeconds':duration,'durationEstimated':True,'language':'en','channel':'MIT OpenCourseWare','instructor':instructor,'sourceUrl':'https://www.youtube.com/watch?v='+youtube,'sourceMetadataUrl':f'https://github.com/mitocwcontent/{repo}/blob/{sha}/{p.relative_to(root)}','sourceCommit':sha,'verification':{'status':'source-verified','checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'youtube_id e título conferidos no repositório público oficial MIT OCW em commit fixo','playback':'unverified — acesso direto ao YouTube bloqueado pela rede'},'license':'Incorporação pelo player oficial. Licença individual não aferida; nenhum vídeo copiado ou republicado.'})
Path('content/videos.sources.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2)+'\n')
Path('VIDEO-VERIFICATION-RESULTS.json').write_text(json.dumps({'sourceVerified':len(selected),'playbackVerified':0,'networkEvidence':'YouTube oEmbed e ocw.mit.edu retornaram HTTP 403 Domain forbidden; metadados obtidos via repositórios públicos oficiais no GitHub.','items':selected},ensure_ascii=False,indent=2)+'\n')
print('Metadados oficiais de vídeos únicos:',len(selected),'reprodução verificada: 0')
