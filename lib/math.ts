import katex from 'katex';

const rendered = new Map<string, string>();

/** All expressions are authored locally and validated before every build. */
export function renderLatex(tex: string, displayMode = false): string {
  const key = `${displayMode ? 'display' : 'inline'}:${tex}`;
  const cached = rendered.get(key);
  if (cached) return cached;
  const html = katex.renderToString(tex, {
    displayMode,
    output: 'htmlAndMathml',
    throwOnError: true,
    strict: 'error',
    trust: false,
  });
  rendered.set(key, html);
  return html;
}
