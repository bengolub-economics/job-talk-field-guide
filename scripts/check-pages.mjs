import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const out=path.join(root,'dist/client');
const base=process.env.NEXT_PUBLIC_BASE_PATH || '/job-talk-field-guide';
const files=await readdir(out,{recursive:true});
const html=files.filter(f=>f.endsWith('.html'));
const checked=new Set();
async function check(url,from){
 if (/^(?:https?:|data:|mailto:|#|\/\/)/.test(url)) return;
 const pathname=decodeURIComponent(url.split(/[?#]/)[0]);
 if (!pathname) return;
 if (pathname.startsWith('/')&&!pathname.startsWith(base+'/')) throw new Error(`${from}: unprefixed URL ${url}`);
 let target=pathname.startsWith('/')?path.join(out,pathname.slice(base.length+1)):path.resolve(out,path.dirname(from),pathname);
 const info=await stat(target).catch(()=>null);
 if (info?.isDirectory()) target=path.join(target,'index.html');
 if (!(await stat(target).catch(()=>null))?.isFile()) throw new Error(`${from}: missing ${url}`);
 checked.add(target);
}
for (const file of html){
 const text=await readFile(path.join(out,file),'utf8');
 for (const [,url] of text.matchAll(/(?:href|src)="([^"]+)"/g)) await check(url.replaceAll('&amp;','&'),file);
}
for (const file of files.filter(f=>f.endsWith('.css'))){
 const css=await readFile(path.join(out,file),'utf8');
 for (const [,url] of css.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)) await check(url,file);
}
const cases=JSON.parse(await readFile(path.join(root,'lib/gallery-data.json'),'utf8'));
for (const c of cases) await check(`${base}/case/${c.id}/`,'index.html');
if (html.length<cases.length+4) throw new Error('Missing exported pages');
const essay=await readFile(path.join(out,'essay.html'),'utf8');
const essayIds=[...essay.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
if(new Set(essayIds).size!==essayIds.length) throw new Error('Duplicate IDs in the essay');
for(const [,anchor] of essay.matchAll(/href="#([^"]+)"/g)) {
 if(!essayIds.includes(anchor)) throw new Error(`Essay link has no target: #${anchor}`);
}
const adviceLinks=[...essay.matchAll(/href="#(essay-(?:do|dont)-\d{2})"/g)].map(match=>match[1]);
if(adviceLinks.length!==20||new Set(adviceLinks).size!==20) throw new Error('Expected 20 distinct listicle paragraph links');
for(const anchor of adviceLinks) {
 if(!essay.includes(`<p id="${anchor}"`)) throw new Error(`Listicle target is not a paragraph: ${anchor}`);
}
console.log('Verified all 20 listicle links land on distinct supporting paragraphs.');
await check('resources.html', 'essay.html');
if (!essay.includes('href="resources.html"')) throw new Error('The essay must link to the resources page');
const resources = await readFile(path.join(out, 'resources.html'), 'utf8');
const resourceIds = [...resources.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(resourceIds).size !== resourceIds.length) throw new Error('Duplicate IDs in resources');
if (resourceIds.filter(id => /^resource-\d+$/.test(id)).length !== 10) throw new Error('Expected ten resources');
for (const [,anchor] of resources.matchAll(/href="#([^"]+)"/g)) {
  if (!resourceIds.includes(anchor)) throw new Error(`Resources link has no target: #${anchor}`);
}
if (!resources.includes('href="essay.html"')) throw new Error('Resources must link back to the essay');
console.log('Verified ten resources, section links, and navigation to and from the essay.');
console.log(`Verified ${html.length} HTML pages and ${checked.size} local link/asset targets.`);
