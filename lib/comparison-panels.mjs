/** @typedef {import('./cases').ViewerPanel} ViewerPanel */

/** @param {import('./cases').OutlineStage[]} stages @param {string} title @returns {ViewerPanel[]} */
export function outlinePanels(stages,title,after=false){
 /** @type {ViewerPanel} */
 const overview={id:'overview',revises:after?['overview']:undefined,kind:'outline',title,label:'RESEARCH OUTLINE',items:stages.map(s=>({title:s.shortTitle||s.title,text:''}))};
 return [overview,...stages.flatMap(stage=>{
  /** @type {ViewerPanel} */
  const base={id:stage.id,revises:stage.revises,kind:'outline-stage',title:stage.title,label:stage.shortTitle||'',lines:[stage.content],items:stage.schema,pages:stage.pages,note:stage.takeaway};
  return stage.panels?.length?stage.panels.map(p=>({...p,pages:p.sourcePage||stage.pages})):[base];
 })];
}
/** @param {import('./cases').DeckOutline} outline */
export function outlinePair(outline){
 const title=outline.overviewTitle||outline.title;
 return {before:outlinePanels(outline.before,title),after:outlinePanels(outline.after,title,true)};
}
/** @param {import('./cases').Case} c @returns {{before:ViewerPanel[],after:ViewerPanel[]}} */
export function comparisonPanels(c){
 return c.outline?outlinePair(c.outline):{before:c.before.map(p=>({...p,pages:p.sourcePage})),after:c.after};
}
