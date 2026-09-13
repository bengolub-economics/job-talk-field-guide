import {spawnSync} from 'node:child_process';
import {writeFile,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = process.env.PAGES_BASE_PATH || '/job-talk-field-guide';
if (!/^\/[a-zA-Z0-9_-]+$/.test(base)) throw new Error('PAGES_BASE_PATH must be one project path, such as /job-talk-field-guide');
const env = {...process.env, GITHUB_PAGES:'1', NEXT_PUBLIC_BASE_PATH:base};
function run(script, args=[], environment=env, preloads=[]) {
  const result = spawnSync(process.execPath, [...preloads,script,...args], {cwd:root,env:environment,stdio:'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${script} exited with ${result.status}`);
}
try {
  run('scripts/prepare-math.mjs');
  run('node_modules/vinext/dist/cli.js',['build'],env,['--import','./scripts/pages-prerender.mjs']);
  // Pages mounts this directory at base, while vinext includes base in its asset tree.
  await rename(path.join(root,'dist/client',base.slice(1),'_next'),path.join(root,'dist/client/_next'));
  await writeFile(path.join(root,'dist/client/.nojekyll'),'');
  run('scripts/check-pages.mjs');
  console.log(`GitHub Pages export ready in dist/client/ for ${base}/`);
} finally {
  // Leave the shared public sources in their root-hosted form for the normal build.
  run('scripts/prepare-math.mjs',[],{...process.env,NEXT_PUBLIC_BASE_PATH:''});
}
