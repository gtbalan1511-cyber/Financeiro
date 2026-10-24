const crypto=require('node:crypto');
function equal(a,b){const x=crypto.createHash('sha256').update(String(a||'')).digest(),y=crypto.createHash('sha256').update(String(b||'')).digest();return crypto.timingSafeEqual(x,y)}
function codec(secret){if(!secret||secret.length<32)throw Error('SESSION_CONFIGURATION');const key=crypto.createHash('sha256').update(secret).digest();return {
 seal(value){const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key,iv);const encrypted=Buffer.concat([cipher.update(JSON.stringify(value),'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString('base64url')},
 open(text){try{const bytes=Buffer.from(text||'','base64url'),decipher=crypto.createDecipheriv('aes-256-gcm',key,bytes.subarray(0,12));decipher.setAuthTag(bytes.subarray(12,28));const value=JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)),decipher.final()]).toString());return value.exp>Date.now()?value:null}catch{return null}}
}}
function cookies(event){const result={};for(const part of String(event.headers?.cookie||'').split(';')){const i=part.indexOf('=');if(i>0)result[part.slice(0,i).trim()]=part.slice(i+1).trim()}return result}
function cookie(name,value,maxAge=604800){if(value.length>3700)throw Error('COOKIE_CAPACITY');return `__Host-orbita-${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
module.exports={equal,codec,cookies,cookie};
