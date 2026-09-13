'use client';
import {useState} from 'react';
import type {ViewerPanel} from '@/lib/cases';
import {Slide} from './slide';
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';

export function PanelViewer({panels,side,label,caption,sourceUrl,outline=false,step:controlledStep,onStepChange,beforePanels,onChooseBefore}:{panels:ViewerPanel[];side:'before'|'after';label:string;caption?:string;sourceUrl?:string;outline?:boolean;step?:number;onStepChange?:(step:number)=>void;beforePanels?:ViewerPanel[];onChooseBefore?:(id:string)=>void}){
 const [localStep,setLocalStep]=useState(0),[large,setLarge]=useState(false),step=controlledStep??localStep,setStep=onStepChange??setLocalStep,p=panels[step];
 const controls=panels.length>1?<div className="build-controls"><button aria-label={`Previous ${side} slide`} disabled={step===0} onClick={()=>setStep(step-1)}>← Previous</button><span aria-live="polite">{step+1} / {panels.length}</span><button aria-label={`Next ${side} slide`} disabled={step===panels.length-1} onClick={()=>setStep(step+1)}>Next →</button></div>:null;
 const selector=outline?<Select value={String(step)} onValueChange={v=>setStep(Number(v))}><SelectTrigger className="outline-select" aria-label={`Choose ${side} outline slide`}><SelectValue/></SelectTrigger><SelectContent>{panels.map((x,i)=><SelectItem key={i} value={String(i)}>{i===0?'Overview':String(i).padStart(2,'0')} · {x.title}</SelectItem>)}</SelectContent></Select>:null;
 return <section className={`panel-viewer ${side}`}>
  <div className="viewer-heading"><h2>{label}</h2><Dialog><DialogTrigger className="enlarge-button">Enlarge ↗</DialogTrigger><DialogContent className="slide-dialog"><DialogTitle>{label}</DialogTitle><DialogDescription>{p.title}</DialogDescription>{selector}<div className="zoom-tools"><button onClick={()=>setLarge(!large)}>{large?'Fit to screen':'Larger text'}</button></div><div className="zoom-window" tabIndex={0} role="region" aria-label="Enlarged slide"><div className={large?'zoom-canvas native-size':'zoom-canvas'}><Slide panel={p} variant={side}/></div></div>{controls}</DialogContent></Dialog></div>
  {selector}<Slide panel={p} variant={side}/>{controls}
  {side==='before'&&<p className="viewer-provenance">{p.provenance||(p.kind==='image'?'Original slide':outline?'Talk schematic':'Schematic reconstruction')}{sourceUrl&&p.pages&&<> · PDF {Array.from(new Set(p.pages.match(/\d+(?:[–-]\d+)?/g)||[])).map((page,i)=><span key={page}>{i>0?' · ':''}<a href={`${sourceUrl}#page=${page.match(/\d+/)?.[0]}`} target="_blank" rel="noreferrer">{page}</a></span>)}</>}</p>}
  {side==='after'&&p.revises&&beforePanels&&<div className="revision-links"><span>Reworks before</span>{p.revises.map(id=>{const i=beforePanels.findIndex(x=>x.id===id);return i<0?null:<button key={id} onClick={()=>onChooseBefore?.(id)} title={beforePanels[i].title} aria-label={`Show before: ${beforePanels[i].title}`}>{outline&&i===0?'Overview':`Slide ${outline?i:i+1}`}</button>})}</div>}
  {caption&&<p className="panel-caption">{caption}</p>}
 </section>;
}
