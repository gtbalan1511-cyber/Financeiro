from pathlib import Path
import re,json,subprocess,sys
root=Path(__file__).parent;site=root/'site'
checks=[]
def test(name,fn):
 try:fn();checks.append((name,'PASS'))
 except Exception as e:checks.append((name,f'FAIL {e}'))
def yes(cond,msg='falhou'):
 assert cond,msg
for n in ('app.js','data.js','features.js','sw.js'):
 test('Sintaxe '+n,lambda n=n:yes(subprocess.run(['node','--check',str(site/n)],capture_output=True).returncode==0))
test('manifest válido',lambda:yes(json.loads((site/'manifest.webmanifest').read_text())['display']=='standalone'))
test('SW inclui features.js',lambda:yes('./features.js' in (site/'sw.js').read_text()))
test('Netlify CSP',lambda:yes('Content-Security-Policy:' in (site/'_headers').read_text()))
test('Dados privados fora do deploy',lambda:yes(not any('contexto_privado' in str(p) for p in site.rglob('*'))))
test('Sem IDs Drive privados',lambda:yes(not any('drive.google.com/' in p.read_text() for p in site.rglob('*.js'))))
test('HTML carrega features antes de app',lambda:yes((site/'index.html').read_text().index('features.js')<(site/'index.html').read_text().index('app.js')))
test('Sem segredos em texto',lambda:yes(not any(re.search(r'(sk-proj-[a-zA-Z0-9]{10,}|AIza[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{15,})',p.read_text()) for p in site.rglob('*.js'))))
for a,b in checks:print(a,b)
print('TOTAL',sum(b=='PASS' for a,b in checks),'/',len(checks))
if any(b!='PASS' for a,b in checks):sys.exit(1)
