const {ProgressStore,schema}=require('./progress.cjs');
function sqliteStore(file,secret){
 const {DatabaseSync}=require('node:sqlite'),fs=require('node:fs'),path=require('node:path');fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});const db=new DatabaseSync(file);fs.chmodSync(file,0o600);db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;'+schema);db.exec(fs.readFileSync(path.join(__dirname,'../migrations/0001_progress.sql'),'utf8'));
 const sql={get:()=>db.prepare('SELECT * FROM progress WHERE id=1').get(),cas:(revision,payload,at)=>{const result=revision===0?db.prepare('INSERT OR IGNORE INTO progress VALUES(1,1,?,?)').run(payload,at):db.prepare('UPDATE progress SET revision=revision+1,payload=?,updated_at=? WHERE id=1 AND revision=?').run(payload,at,revision);return result.changes===1}};
 const store=new ProgressStore(sql,secret);store.close=()=>db.close();return store;
}
module.exports={sqliteStore};
