const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const results=[];
for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
 const context=await browser.newContext({viewport,acceptDownloads:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173');await page.locator('.subject').first().waitFor();assert.equal(await page.locator('.subject').count(),9);
 await page.locator('[data-page="quiz"]').first().click();await page.locator('[data-act="pick"]').first().click();assert(await page.locator('[data-act="assess"]').isDisabled());await page.locator('[data-act="confidence"]').first().click();await page.locator('[data-act="assess"]').click();assert.equal(await page.locator('.explanation').count(),1);
 await page.reload();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('orbita_private_v1')).attempts.length),1);
 await page.locator('[data-page="settings"]').first().click();const downloadPromise=page.waitForEvent('download');await page.locator('[data-act="export"]').click();const download=await downloadPromise;const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(backup.data.attempts.length,1);
 page.on('dialog',d=>d.accept());await page.locator('#backupimport').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.locator('.subject').first().waitFor();
 await page.locator('[data-page="settings"]').first().click();for(const [key,file] of [['calendar','agenda_estudos_snapshot'],['notion','notion_estudos_snapshot'],['drive','fontes_drive']])await page.locator('#import-'+key).setInputFiles('tests/fixtures/'+file+'.json');
 await page.locator('[data-page="daily"]').first().click();assert(await page.locator('body').innerText().then(t=>t.includes('Hill')));
 for(const name of ['feed','study','progress']){await page.locator(`[data-page="${name}"]`).first().click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await page.locator('[data-page="prep"]').first().click();await page.locator('[data-act="start-sim"]').click();
 while(await page.locator('[data-act="pick"]').count()){await page.locator('[data-act="pick"]').first().click();await page.locator('[data-act="confidence"]').first().click();await page.locator('[data-act="assess"]').click();await page.locator('[data-act="next-quiz"]').click();}
 assert(await page.locator('body').innerText().then(t=>t.includes('Resultado do treino')));
 await page.locator('[data-page="feed"]').first().click();const total=await page.evaluate(()=>window.ORBITA_DATA.feed.length);for(let i=0;i<total;i++)await page.locator('[data-act="next-feed"]').click();assert.equal(await page.locator('.modal h2').innerText(),'Sessão concluída');await page.locator('[data-page="home"]').last().click();
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);await page.reload();await page.locator('.subject').first().waitFor();assert.equal(await page.locator('.subject').count(),9);await context.setOffline(false);
 assert.deepEqual(errors,[]);results.push({viewport,status:'PASS',checks:['navegação','quiz/confiança','persistência','backup download/import','3 snapshots','exercício diário','layout sem overflow','offline após reload','console sem exceções','simulado completo','feed finito']});await context.close();
}await browser.close();fs.writeFileSync('BROWSER-RESULTS.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));})().catch(e=>{console.error(e);process.exitCode=1});
