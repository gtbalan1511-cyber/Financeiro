"""Empacota somente arquivos permitidos; não inclui dados pessoais nem ferramentas locais."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json, subprocess
root=Path(__file__).parent
subprocess.run(['python','test_static.py'],cwd=root,check=True)
out=root/'dist';out.mkdir(exist_ok=True)
site=root/'site'
with ZipFile(out/'Orbita-Netlify-1.3.0.zip','w',ZIP_DEFLATED) as z:
 for p in sorted(site.rglob('*')):
  if p.is_file():z.write(p,p.relative_to(site))
files=['AGENTS.md','PRODUTO-E-ACEITE.md','NEXT-STEPS.md','CHANGELOG.md','TEST-REPORT.md','TEST-RESULTS.json','BROWSER-RESULTS.json','README.md','package.json','package-lock.json','package.py','test_logic.cjs','test_static.py']
with ZipFile(out/'Orbita-Codigo-Fonte-1.3.0.zip','w',ZIP_DEFLATED) as z:
 for name in files:
  p=root/name
  if p.exists():z.write(p,name)
 for folder in ['site','tests']:
  for p in sorted((root/folder).rglob('*')):
   if p.is_file():z.write(p,p.relative_to(root))
with ZipFile(out/'Orbita-Netlify-1.3.0.zip') as z:
 assert 'index.html' in z.namelist()
 assert all(not n.startswith(('tests/','_contexto_privado/')) for n in z.namelist())
print('ZIPs criados em',out)
