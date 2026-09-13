'use client';

import {useState} from 'react';
import {sitePath} from '@/lib/site-path';
import {cases,modes,type Case} from '@/lib/cases';
import {comparisonPanels} from '@/lib/comparison-panels.mjs';
import {Slide} from './slide';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';

const allModes='All failure modes';
const scales=[
  {value:'all',label:'All cases'},
  {value:'slide',label:'Single slides'},
  {value:'talk',label:'Deck outlines'},
];

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

function ProblemNavigation({scale,mode,onModeChange,onReset}:{scale:string;mode:string;onModeChange:(mode:string)=>void;onReset:()=>void}){
  const available=cases.filter(c=>scale==='all'||c.scale===scale);
  return <Tabs value={mode} onValueChange={v=>onModeChange(String(v))} className="problem-browser">
    <div className="gallery-controls">
      <h2 className="browse-label">Browse by problem</h2>
      <TabsList variant="line" className="problem-tabs" aria-label="Browse cases by problem">
        {modes.map(m=>{
          const count=available.filter(c=>m===allModes||c.mode===m).length;
          return <TabsTrigger key={m} value={m} className="problem-tab">
            <span>{m===allModes?'All cases':m}</span>
            <span className="problem-count" aria-label={`${count} ${count===1?'case':'cases'}`}>{count}</span>
          </TabsTrigger>;
        })}
      </TabsList>
    </div>
    {modes.map(m=>{
      const shown=available.filter(c=>m===allModes||c.mode===m);
      return <TabsContent key={m} value={m}>
        <p className="results-count" aria-live="polite">{shown.length} {shown.length===1?'case':'cases'} · {m===allModes?'Before and after slide comparisons':m}</p>
        <CaseCards shown={shown}/>
        {!shown.length&&<div className="no-results"><h2>No cases in this combination.</h2><button onClick={onReset}>Show all cases</button></div>}
      </TabsContent>;
    })}
  </Tabs>;
}

export function Gallery(){
  const [scale,setScale]=useState('all');
  const [mode,setMode]=useState(allModes);
  const reset=()=>{setMode(allModes);setScale('all')};
  const hasTalks=cases.some(c=>c.scale==='talk');
  return <section id="gallery" aria-label="Before and better gallery">
    {hasTalks?<Tabs value={scale} onValueChange={v=>setScale(String(v))}>
      <TabsList variant="line" className="gallery-tabs" aria-label="Case format">
        {scales.map(s=><TabsTrigger key={s.value} value={s.value}>{s.label} <span>{cases.filter(c=>s.value==='all'||c.scale===s.value).length}</span></TabsTrigger>)}
      </TabsList>
      {scales.map(s=><TabsContent key={s.value} value={s.value}>
        <ProblemNavigation scale={s.value} mode={mode} onModeChange={setMode} onReset={reset}/>
      </TabsContent>)}
    </Tabs>:<ProblemNavigation scale="all" mode={mode} onModeChange={setMode} onReset={reset}/>}
  </section>;
}
