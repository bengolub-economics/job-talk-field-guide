'use client';
import {useState} from 'react';
import type {Panel} from '@/lib/cases';
import {Slide} from './slide';
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';

export type ViewerPanel = Panel & {pages?:string};
export function PanelViewer({panels,side,label,caption,sourceUrl,outline=false}:{panels:ViewerPanel[];side:'before'|'after';label:string;caption?:string;sourceUrl?:string;outline?:boolean}){
 const [step,setStep]=useState(0),[large,setLarge]=useState(false),p=panels[step];
 const controls=panels.length>1?<div className="build-controls"><button aria-label={`Previous ${side} slide`} disabled={step===0} onClick={()=>setStep(step-1)}>← Previous</button><span aria-live="polite">{step+1} / {panels.length}</span><button aria-label={`Next ${side} slide`} disabled={step===panels.length-1} onClick={()=>setStep(step+1)}>Next →</button></div>:null;
 const selector=outline?<Select value={String(step)} onValueChange={v=>setStep(Number(v))}><SelectTrigger className="outline-select" aria-label={`Choose ${side} outline slide`}><SelectValue/></SelectTrigger><SelectContent>{panels.map((x,i)=><SelectItem key={i} value={String(i)}>{i===0?'Overview':String(i).padStart(2,'0')} · {x.title}</SelectItem>)}</SelectContent></Select>:null;
 return <section className={`panel-viewer ${side}`}>
  <div className="viewer-heading"><h2>{label}</h2><Dialog><DialogTrigger className="enlarge-button">Enlarge ↗</DialogTrigger><DialogContent className="slide-dialog"><DialogTitle>{label}</DialogTitle><DialogDescription>{p.title}</DialogDescription>{selector}<div className="zoom-tools"><button onClick={()=>setLarge(!large)}>{large?'Fit to screen':'Larger text'}</button></div><div className="zoom-window" tabIndex={0} role="region" aria-label="Enlarged slide"><div className={large?'zoom-canvas native-size':'zoom-canvas'}><Slide panel={p} variant={side}/></div></div>{controls}</DialogContent></Dialog></div>
  {selector}<Slide panel={p} variant={side}/>{controls}
  {sourceUrl&&p.pages&&<p className="viewer-provenance">Source PDF {Array.from(new Set(p.pages.match(/\d+(?:[–-]\d+)?/g)||[])).map((page,i)=><span key={page}>{i>0?' · ':''}<a href={`${sourceUrl}#page=${page.match(/\d+/)?.[0]}`} target="_blank" rel="noreferrer">{page}</a></span>)}</p>}
  {caption&&<p className="panel-caption">{caption}</p>}
 </section>;
}
