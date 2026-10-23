"""Gera pacotes públicos por allowlist, sem dados acadêmicos ou dependências locais."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib,json,subprocess
root=Path(__file__).parent
version=json.loads((root/'package.json').read_text())['version']
subprocess.run(['node','tools/build-catalog.cjs'],cwd=root,check=True)
for command in [['node','--test',*[str(p.relative_to(root)) for p in sorted((root/'tests').glob('*.test.cjs'))]],['node','test_logic.cjs'],['python','test_static.py']]:
 subprocess.run(command,cwd=root,check=True)
site=root/'site'
allowed={'index.html','app.js','features.js','data.js','style.css','sw.js','manifest.webmanifest','_headers','robots.txt','LEIA-ME.md','assets/icon-192.png','assets/icon-512.png','catalog.js','recommendations.js','simulations.js','connections.js','catalog/v1.json'}
actual={str(p.relative_to(site)) for p in site.rglob('*') if p.is_file()}
assert actual==allowed, f'Arquivos inesperados/ausentes em site/: {actual^allowed}'
out=root/'dist';out.mkdir(exist_ok=True)
for p in out.glob('Orbita-*.zip'):p.unlink() # Somente artefatos anteriores gerados por este script.
with ZipFile(out/f'Orbita-Netlify-{version}.zip','w',ZIP_DEFLATED) as z:
 for name in sorted(allowed):z.write(site/name,name)
files=['Dockerfile','.dockerignore','PERSONAL-SETUP.md','.gitignore','netlify.toml','AGENTS.md','PRODUTO-E-ACEITE.md','NEXT-STEPS.md','CHANGELOG.md','TEST-REPORT.md','TEST-RESULTS.json','BROWSER-RESULTS.json','README.md','AUDIT-1.4.md','INTEGRATIONS.md','PR-DESCRIPTION.md','CONTENT-COVERAGE.json','CONTENT-REPORT.md','FEED-SIMULATION-RESULTS.json','VIDEO-VERIFICATION-RESULTS.json','BACKEND-SETUP.md','package.json','package-lock.json','package.py','test_logic.cjs','test_static.py']
with ZipFile(out/f'Orbita-Codigo-Fonte-{version}.zip','w',ZIP_DEFLATED) as z:
 for name in files:
  p=root/name
  if p.exists():z.write(p,name)
 for folder in ['site','tests','.github','netlify','tools','content','server']:
  for p in sorted((root/folder).rglob('*')):
   if p.is_file():z.write(p,p.relative_to(root))
with ZipFile(out/f'Orbita-Netlify-{version}.zip') as z:
 assert set(z.namelist())==allowed and 'index.html' in z.namelist()
manifest={'version':version,'files':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(out.glob('*.zip'))}}
(out/'SHA256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Pacotes públicos criados em',out)
