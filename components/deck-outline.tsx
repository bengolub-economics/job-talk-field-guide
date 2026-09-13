import { MathText } from './math';
import type { DeckOutline, OutlineStage } from '@/lib/cases';

type Branch = NonNullable<DeckOutline['branches']>[number];
function PageLinks({pages,sourceUrl}:{pages:string;sourceUrl?:string}){
 const ranges=Array.from(new Set(pages.match(/\d+(?:[–-]\d+)?/g)||[]));
 return sourceUrl?<span className="outline-page-links">PDF {ranges.map((range,i)=><span key={range}>{i>0?' · ':''}<a href={`${sourceUrl}#page=${range.match(/\d+/)?.[0]}`} target="_blank" rel="noreferrer">{range}</a></span>)}</span>:null;
}
function Depth({branch,sourceUrl}:{branch:Branch;sourceUrl?:string}){return <details className="outline-inline-depth"><summary><span>Optional</span>{branch.title}<b aria-hidden="true">+</b></summary><p>{branch.content}</p><div><PageLinks pages={branch.pages} sourceUrl={sourceUrl}/><a href={`#outline-after-${branch.returnToStage}`}>Return to stage {branch.returnToStage} →</a></div></details>}
function Route({ stages, side, sourceUrl,branches=[] }: { stages: OutlineStage[]; side: 'before' | 'after'; sourceUrl?: string;branches?:Branch[] }) {
  return <section className={`outline-route ${side}`} aria-label={side === 'before' ? 'Original deck outline' : 'Better deck outline'}>
    <div className="outline-route-heading"><h3>{side === 'before' ? 'Source outline' : 'Proposed outline'}</h3><span>{stages.length} stages</span></div>
    <ol>{stages.map((stage, i) => <li key={stage.title} id={`outline-${side}-${i+1}`} className={`outline-stage ${stage.role || 'setup'}`}>
      <span className="outline-step">{String(i + 1).padStart(2, '0')}</span>
      <div className="outline-sheet">
        <div className="outline-sheet-top"><span>{stage.label}</span>{stage.pages&&<PageLinks pages={stage.pages} sourceUrl={sourceUrl}/>}</div>
        <h4><MathText>{stage.title}</MathText></h4>
        <p><MathText>{stage.content}</MathText></p>
        {stage.takeaway && <div className="outline-takeaway"><MathText>{stage.takeaway}</MathText></div>}
        {branches.filter(b=>b.fromStage===i+1).map(b=><Depth key={b.title} branch={b} sourceUrl={sourceUrl}/>)}
      </div>
    </li>)}</ol>
  </section>;
}
export function DeckOutlineComparison({ outline, sourceUrl }: { outline: DeckOutline; sourceUrl?: string }) {
  return <section className="deck-outline" aria-labelledby="outline-title">
    <header><p className="eyebrow">THE SHAPE OF THE DECK</p><h2 id="outline-title">{outline.title}</h2><p>{outline.description}</p></header>
    <div className="outline-pair"><Route stages={outline.before} side="before" sourceUrl={sourceUrl}/><Route stages={outline.after} side="after" sourceUrl={sourceUrl} branches={outline.branches}/></div>
    <div className="outline-change"><span>WHAT CHANGES</span><p>{outline.change}</p></div>
  </section>;
}
