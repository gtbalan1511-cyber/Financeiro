const fs=require('node:fs');
const id=process.env.ORBITA_DATABASE_ID;
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id||'')||id==='00000000-0000-0000-0000-000000000000')throw Error('Configure ORBITA_DATABASE_ID com o ID real do D1.');
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));config.d1_databases[0].database_id=id;fs.writeFileSync('wrangler.jsonc',JSON.stringify(config,null,2)+'\n');
