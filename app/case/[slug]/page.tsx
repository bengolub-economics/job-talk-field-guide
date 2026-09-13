import {cases} from '@/lib/cases';
import {CaseDetail} from '@/components/case-detail';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return cases.map(c=>({slug:c.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=cases.find(x=>x.id===slug);return {title:c?.title||'Case not found',description:c?.dek};}
export default async function CasePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=cases.find(x=>x.id===slug);if(!c)notFound();return <CaseDetail item={c}/>;}
