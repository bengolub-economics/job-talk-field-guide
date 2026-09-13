import {readFileSync} from 'node:fs';

// vinext beta.5's exporter requests routes without basePath or trailingSlash.
// Correct only its local prerender requests; the generated browser code is untouched.
const base = process.env.NEXT_PUBLIC_BASE_PATH;
const cases = JSON.parse(readFileSync(new URL('../lib/gallery-data.json', import.meta.url),'utf8'));
const routes = new Set(['/', '/about', '/principles', ...cases.map(c=>`/case/${c.id}`)]);
const fetchOriginal = globalThis.fetch;
globalThis.fetch = function(input, init) {
  const raw = input instanceof Request ? input.url : String(input);
  if (base && process.env.VINEXT_PRERENDER === '1' && URL.canParse(raw)) {
    const url = new URL(raw);
    if (url.hostname === '127.0.0.1' && routes.has(url.pathname)) {
      url.pathname = base + (url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`);
      return fetchOriginal(input instanceof Request ? new Request(url,input) : url, init);
    }
  }
  return fetchOriginal(input, init);
};
