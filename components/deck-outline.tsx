import type { DeckOutline, OutlineStage } from '@/lib/cases';
import {PanelViewer, type ViewerPanel} from './panel-viewer';

function views(stages:OutlineStage[],title:string):ViewerPanel[]{
 const overview:ViewerPanel={kind:'outline',title,label:'RESEARCH OUTLINE',items:stages.map(s=>({title:s.shortTitle||s.title,text:''}))};
 return [overview,...stages.flatMap(stage=>{
  const base:ViewerPanel={kind:'outline-stage',title:stage.title,label:stage.shortTitle||'',lines:[stage.content],items:stage.schema,pages:stage.pages,note:stage.takeaway};
  return stage.panels?.length?stage.panels.map(p=>({...p,pages:p.sourcePage||stage.pages})):[base];
 })];
}
export function DeckOutlineComparison({outline,sourceUrl}:{outline:DeckOutline;sourceUrl?:string}){
 return <div className="pair case-comparison outline-comparison"><PanelViewer panels={views(outline.before,outline.overviewTitle||outline.title)} side="before" label="Original outline" sourceUrl={sourceUrl} outline/><PanelViewer panels={views(outline.after,outline.overviewTitle||outline.title)} side="after" label="Better outline" sourceUrl={sourceUrl} outline/></div>;
}
