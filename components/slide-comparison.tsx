'use client';
import {useState} from 'react';
import {PanelViewer} from './panel-viewer';
import type {ViewerPanel} from '@/lib/cases';

export function SlideComparison({before,after,sourceUrl,outline=false}:{before:ViewerPanel[];after:ViewerPanel[];sourceUrl?:string;outline?:boolean}){
 const [beforeStep,setBeforeStep]=useState(0);
 const [afterStep,setAfterStep]=useState(0);
 const chooseBefore=(id:string)=>{
  const index=before.findIndex(p=>p.id===id);
  if(index>=0)setBeforeStep(index);
 };
 return <div className={`pair case-comparison ${outline?'outline-comparison':''}`}>
  <PanelViewer panels={before} side="before" label={outline?'Before outline':'Before'} sourceUrl={sourceUrl} outline={outline} step={beforeStep} onStepChange={setBeforeStep}/>
  <PanelViewer panels={after} side="after" label={outline?'Better outline':'Better'} sourceUrl={sourceUrl} outline={outline} step={afterStep} onStepChange={setAfterStep} beforePanels={before} onChooseBefore={chooseBefore}/>
 </div>;
}
