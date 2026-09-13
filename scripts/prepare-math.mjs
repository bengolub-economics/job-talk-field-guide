import katex from 'katex';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {comparisonPanels} from '../lib/comparison-panels.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const options = { output: 'htmlAndMathml', throwOnError: true, strict: 'error', trust: false };
const cases = JSON.parse(await readFile(path.join(root, 'lib/gallery-data.json'), 'utf8'));
let count = 0;
let comparisons = 0;
function validate(value, key = '') {
  if (typeof value === 'string') {
    if (key === 'formula' || key === 'symbol') { katex.renderToString(value, { ...options, displayMode: true }); count++; }
    else for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)) {
      katex.renderToString(match[1] ?? match[2], { ...options, displayMode: match[2] !== undefined }); count++;
    }
  } else if (Array.isArray(value)) value.forEach(v => validate(v));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => validate(v, k));
}
for (const c of cases) {
  const {before,after}=comparisonPanels(c);
  const beforeIds=new Set(before.map(p=>p.id));
  if (before.some(p=>!p.id)||beforeIds.size!==before.length) throw new Error(`${c.id}: before slides need unique IDs`);
  if (after.some(p => p.kind === 'image' || p.image)) throw new Error(`${c.id}: revised slides must be self-rendered`);
  for (const p of before) if (p.image) await readFile(path.join(root, 'public', p.image));
  for (const p of after) {
    if (!p.revises?.length||p.revises.some(id=>!beforeIds.has(id))) throw new Error(`${c.id}: ${p.title} must link to visible before content`);
    comparisons++;
  }
}
validate(cases);
const reconstruction = JSON.parse(await readFile(path.join(root, 'lib/reconstruction-data.json'), 'utf8'));
for (const row of [...reconstruction.hankBlocks, ...reconstruction.hankTargets]) {
  for (const key of ['inputs','outputs','condition']) if (row[key]) validate(row[key], 'formula');
}
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
let essay = await readFile(path.join(root, 'content/essay.html'), 'utf8');
// A standalone site checkout uses its committed source snapshot. In the writing
// workspace, also reject a build if the author's latest Markdown has changed.
async function verifySource(snapshot, manuscript, metaName) {
  const source = await readFile(path.join(root, 'content', snapshot));
  const hash = createHash('sha256').update(source).digest('hex');
  const htmlHash = essay.match(new RegExp(`<meta name="${metaName}" content="([a-f0-9]{64})">`))?.[1];
  const rebuild = 'Run python3 scripts/build_essay_html.py from the parent JM wisdom folder.';
  if (hash !== htmlHash) throw new Error(`${snapshot} and HTML are out of sync. ${rebuild}`);
  const latest = await readFile(path.join(root, '..', manuscript)).catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (latest && !latest.equals(source)) throw new Error(`The field guide is older than ${manuscript}. ${rebuild}`);
}
await verifySource('essay.md', 'job-talk-essay-revised.md', 'source-sha256');
await verifySource('essay-listicle.md', 'job-talk-dos-and-donts.md', 'listicle-source-sha256');
if (process.env.NEXT_PUBLIC_BASE_PATH) essay = essay.replace(/(href|src)="\/(?!\/)/g, `$1="${process.env.NEXT_PUBLIC_BASE_PATH}/`);
let essayCount = 0;
essay = essay.replace(/<math\b[^>]*>[\s\S]*?<\/math>/g, original => {
  const source = original.match(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/);
  if (!source) throw new Error('An essay equation has no LaTeX source');
  essayCount++;
  return katex.renderToString(decode(source[1]).trim(), { ...options, displayMode: original.includes('display="block"') });
});
if (essayCount !== 11) throw new Error(`Expected 11 essay expressions, found ${essayCount}`);
essay = essay.replace('</head>', `<link rel="stylesheet" href="${process.env.NEXT_PUBLIC_BASE_PATH || ''}/math/katex.min.css">
<style>
.katex { font-size:1.06em; }
.katex-display { margin:28px 0; padding:16px 4px; overflow-x:auto; overflow-y:hidden; }
.katex-display > .katex { text-align:center; }
.katex math { margin:0; padding:0; }
@media(max-width:600px) { .katex-display { font-size:.85em; padding:12px 0; } }
@media print { .katex-display { break-inside:avoid; overflow:visible; } }
</style></head>`);
await mkdir(path.join(root, 'public/math'), { recursive: true });
const dist = path.join(path.dirname(fileURLToPath(import.meta.resolve('katex'))));
await cp(path.join(dist, 'katex.min.css'), path.join(root, 'public/math/katex.min.css'));
await cp(path.join(dist, '../LICENSE'), path.join(root, 'public/math/LICENSE'));
await cp(path.join(dist, 'fonts'), path.join(root, 'public/math/fonts'), { recursive: true });
await writeFile(path.join(root, 'public/essay.html'), essay);
await writeFile(path.join(root, 'public/gallery-data.json'), JSON.stringify(cases, null, 2)+'\n');
console.log(`Validated ${comparisons} before/after links and ${count} gallery math expressions; typeset ${essayCount} essay expressions; bundled fonts locally.`);
