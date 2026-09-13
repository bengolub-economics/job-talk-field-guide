'use client';

import {sitePath} from '@/lib/site-path';
import {cases,type Case} from '@/lib/cases';
import {comparisonPanels} from '@/lib/comparison-panels.mjs';
import {Slide} from './slide';
function CaseCards({shown}:{shown:Case[]}){
  return <div className="gallery-grid">{shown.map(c=>{
    const pair=comparisonPanels(c);
    return <a className="gallery-card" key={c.id} href={sitePath(`/case/${c.id}`)}>
      <div className="card-art">
        <div className="mini-pair">
          <div><p className="frame-label">BEFORE</p><Slide panel={pair.before[0]} variant="before"/></div>
          <div><p className="frame-label better-label">BETTER</p><Slide panel={pair.after[0]}/></div>
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="card-info">
        <div className="card-topline"><span>{c.number} / {c.mode}</span><span>{c.topic}{c.scale==='talk'?' · OUTLINE':''}</span></div>
        <h2>{c.title}</h2>
        <p>{c.dek}</p>
        <div className="card-source">
          <span className={`source-dot ${c.sourceType}`}/>
          {c.sourceType==='public'?c.source!.authors+' · '+c.source!.date:'Constructed teaching example'}
          <span className="case-link">Explore →</span>
        </div>
      </div>
    </a>;
  })}</div>;
}

export function Gallery(){
  return <section id="gallery" aria-label="Before and better gallery">
    <nav className="case-index" aria-label="Case index">
      <span className="case-index-label">Cases</span>
      <ol>{cases.map(c=><li key={c.id}>
        <a href={sitePath(`/case/${c.id}`)} aria-label={`Case ${c.number}: ${c.title}`} title={c.title}>{c.number}</a>
      </li>)}</ol>
    </nav>
    <p className="results-count">{cases.length} cases · Before and after slide comparisons</p>
    <CaseCards shown={cases}/>
  </section>;
}
