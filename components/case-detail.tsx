'use client';
import {sitePath} from '@/lib/site-path';
import {Case,cases,principleAnchors} from '@/lib/cases';
import {MathText} from './math';
import {DeckOutlineComparison} from './deck-outline';
import {PanelViewer} from './panel-viewer';

export function CaseDetail({item:c}:{item:Case}){
 const idx=cases.findIndex(x=>x.id===c.id),next=cases[(idx+1)%cases.length];
 return <main id="main" className="wrap case-page"><a className="back-link" href={sitePath('/')}>← All twelve cases</a>
  <header className="case-header"><div><p className="eyebrow">{c.number} / {c.topic} / {c.scale==='talk'?'DECK OUTLINE':c.mode.toUpperCase()}</p><h1>{c.title}</h1><p className="case-dek">{c.dek}</p></div></header>
  {c.outline?<DeckOutlineComparison outline={c.outline} sourceUrl={c.source?.url}/>:<div className="pair case-comparison"><PanelViewer panels={c.before} side="before" label="Original" caption={c.beforeCaption}/><PanelViewer panels={c.after} side="after" label="Better" caption={c.afterCaption}/></div>}
  <section className="case-point"><p><MathText>{c.point||c.diagnosis}</MathText></p><a href={sitePath(`/essay.html#${principleAnchors[c.principle]}`)}>The essay’s advice ↗</a></section>
  {c.source&&<section className="case-source-compact"><p><a target="_blank" rel="noreferrer" href={`${c.source.url}#page=${c.source.pages.match(/\d+/)?.[0]}`}>{c.source.title} ↗</a><br/>{c.source.authors} · {c.source.date} · PDF {c.source.pages}</p>{c.values&&<details><summary>Values and reconstruction</summary>{c.values.map(v=><p key={v}><MathText>{v}</MathText></p>)}</details>}</section>}
  <nav className="next-case" aria-label="Next case"><span>NEXT CASE</span><a href={sitePath(`/case/${next.id}`)}>{next.number} / {next.title} <b>→</b></a></nav>
 </main>;
}
