"""Confere o ID e o título no arquivo oficial em commit fixo. Não declara reprodução validada."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen
from urllib.error import HTTPError
import json,re,datetime
items=json.loads(Path('content/videos.sources.json').read_text())
def verify(x):
 url=x['sourceMetadataUrl'].replace('github.com','raw.githubusercontent.com').replace('/blob/','/')
 result={'youtubeId':x['youtubeId'],'mediaUrl':x['sourceUrl'],'metadataUrl':url,'sourceCommit':x['sourceCommit'],'title':x['title'],'playback':'not-verified'}
 try:
  with urlopen(url,timeout=20) as r:
   body=r.read(65536).decode();result['httpStatus']=r.status
  title=re.search(r'^title: (.*(?:\n  [^\n]+)*)',body,re.M)
  parsed=re.sub(r'\s+',' ',title.group(1)).strip("'\"") if title else ''
  result['metadataVerified']=bool(re.search(r'youtube_id: '+re.escape(x['youtubeId'])+r'\b',body)) and parsed==x['title']
 except Exception as e:result.update(metadataVerified=False,error=type(e).__name__)
 return result
with ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(verify,items))
report={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceVerified':sum(x['metadataVerified'] for x in results),'playbackVerified':0,'durationVerified':0,'notice':'Verificação de identidade/título em fonte oficial. Durações são estimadas. Reprodução atual e licença individual não validadas.', 'items':results}
Path('VIDEO-VERIFICATION-RESULTS.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('Metadados oficiais HTTP:',report['sourceVerified'],'/',len(results),'reprodução validada: 0')
if report['sourceVerified']!=len(items):raise SystemExit(1)
