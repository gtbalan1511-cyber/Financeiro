from pathlib import Path
import zipfile
root=Path(__file__).resolve().parent
out=root/'dist';out.mkdir(exist_ok=True)
with zipfile.ZipFile(out/'clareza-deploy.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted((root/'site').rglob('*')):
  if p.is_file():z.write(p,p.relative_to(root/'site'))
with zipfile.ZipFile(out/'clareza-fonte.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if not p.is_file() or any(x in p.relative_to(root).parts for x in ['node_modules','dist','.git','work']):continue
  if p.name.startswith('.env') or p.name.startswith('dashboard-'):continue
  z.write(p,p.relative_to(root))
print('Gerados: dist/clareza-deploy.zip e dist/clareza-fonte.zip (sem dados privados).')
