const ink = '#1c3138';
const teal = '#21675f';
const gray = '#61727a';

// Nominal payments in the source's baseline, t = 20 (PDF p. 19).
// Arrow widths are schematic; the five amounts are transcribed, not digitized.
export function TransactionFlows({stage = 0}: {stage?: number}) {
  const consumption = stage === 0 ? teal : gray;
  const income = stage === 1 ? teal : gray;
  const descriptions = [
    'Households pay firms 522.91 for consumption.',
    'Households pay firms 522.91 for consumption. Firms pay households 322.26 in wages and 383.80 in corporate profits.',
    'Households pay firms 522.91 for consumption and receive 322.26 in wages and 383.80 in corporate profits. Households pay government 142.97 in taxes; government pays firms 180 for purchases.',
  ];
  const box = (x: number, y: number, label: string, width = 170) => <g>
    <rect x={x} y={y} width={width} height={62} fill="none" stroke="#a8b7b2"/>
    <text x={x + width / 2} y={y + 39} textAnchor="middle" fontSize={25}>{label}</text>
  </g>;
  return <svg className="diagram" viewBox="0 0 800 365" role="img" aria-label={descriptions[Math.min(stage, 2)]} style={{fontFamily:'Arial,sans-serif', fill:ink}}>
    {box(30, 145, 'Households')}
    {box(600, 145, 'Firms')}
    <path d="M200 176 H588" fill="none" stroke={consumption} strokeWidth={stage === 0 ? 3 : 2}/>
    <path d="M600 176 l-12 -6 v12 Z" fill={consumption}/>
    <text x={400} y={154} textAnchor="middle" fontSize={24} fill={consumption}>Consumption · 522.91</text>
    {stage >= 1 && <>
      <path d="M640 207 V270 H160 V219" fill="none" stroke={income} strokeWidth={stage === 1 ? 3 : 2}/>
      <path d="M160 207 l-6 12 h12 Z" fill={income}/>
      <text x={400} y={257} textAnchor="middle" fontSize={24} fill={income}>Wages · 322.26</text>
      <path d="M710 207 V340 H90 V219" fill="none" stroke={income} strokeWidth={stage === 1 ? 3 : 2}/>
      <path d="M90 207 l-6 12 h12 Z" fill={income}/>
      <text x={400} y={327} textAnchor="middle" fontSize={24} fill={income}>Corporate profits · 383.80</text>
    </>}
    {stage >= 2 && <>
      {box(310, 24, 'Government', 180)}
      <path d="M115 145 V55 H298" fill="none" stroke={teal} strokeWidth={3}/>
      <path d="M310 55 l-12 -6 v12 Z" fill={teal}/>
      <text x={200} y={36} textAnchor="middle" fontSize={22} fill={teal}>Taxes · 142.97</text>
      <path d="M490 55 H685 V133" fill="none" stroke={teal} strokeWidth={3}/>
      <path d="M685 145 l-6 -12 h12 Z" fill={teal}/>
      <text x={600} y={36} textAnchor="middle" fontSize={22} fill={teal}>Purchases · 180</text>
    </>}
  </svg>;
}
