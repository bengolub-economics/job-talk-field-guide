import type {DeckOutline} from '@/lib/cases';
import {outlinePair} from '@/lib/comparison-panels.mjs';
import {SlideComparison} from './slide-comparison';
export function DeckOutlineComparison({outline,sourceUrl}:{outline:DeckOutline;sourceUrl?:string}){
 return <SlideComparison {...outlinePair(outline)} sourceUrl={sourceUrl} outline/>;
}
