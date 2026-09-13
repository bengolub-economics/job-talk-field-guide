import { Fragment } from 'react';
import { renderLatex } from '@/lib/math';

export function Math({ tex, display = false }: { tex: string; display?: boolean }) {
  return <span className={display ? 'math-display' : 'math-inline'} dangerouslySetInnerHTML={{ __html: renderLatex(tex, display) }} />;
}

/** Explicit delimiters avoid treating currency amounts as mathematics. */
export function MathText({ children: text }: { children: string }) {
  const pattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  const parts: React.ReactNode[] = [];
  let end = 0;
  for (const match of text.matchAll(pattern)) {
    parts.push(text.slice(end, match.index));
    parts.push(<Math key={match.index} tex={match[1] ?? match[2]} display={match[2] !== undefined} />);
    end = match.index! + match[0].length;
  }
  parts.push(text.slice(end));
  return <Fragment>{parts}</Fragment>;
}
