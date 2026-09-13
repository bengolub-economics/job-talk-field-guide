const ink='#1c3138',teal='#21675f',gray='#607079';

export function RegionComparison(){
 const x=(v:number)=>232+v*8.8;
 return <div className="region-comparison">
  <svg className="diagram" viewBox="0 0 800 270" role="img" aria-label="Year 2000. Manufacturing employment: North Hickory 43.0 percent, Raleigh-Cary 17.0 percent. BA share among people aged 18–64: North Hickory 15.6 percent, Raleigh-Cary 34.2 percent." style={{fontFamily:'Arial,sans-serif',fill:ink}}>
   {[{title:'Manufacturing share of employment',values:[43,17],top:20},{title:'BA share of population aged 18–64',values:[15.6,34.2],top:150}].map(({title,values,top})=><g key={title}>
    <text x={0} y={top} fontSize={21} fontWeight={600}>{title}</text>
    {[0,25,50].map(v=><g key={v}><line x1={x(v)} x2={x(v)} y1={top+26} y2={top+90} stroke="#e2e7e6"/><text x={x(v)} y={top+115} fontSize={16} textAnchor="middle" fill={gray}>{v}%</text></g>)}
    {values.map((v,i)=>{const y=top+42+i*40;return <g key={i}><text x={0} y={y+6} fontSize={19}>{['North Hickory, NC','Raleigh-Cary, NC'][i]}</text><line x1={x(0)} x2={x(v)} y1={y} y2={y} stroke="#b7cac4" strokeWidth={2}/><circle cx={x(v)} cy={y} r={6} fill={teal}/><text x={797} y={y+6} fontSize={21} textAnchor="end" style={{fontVariantNumeric:'tabular-nums'}}>{v.toFixed(1)}%</text></g>})}
   </g>)}
  </svg>
  <table className="region-context" aria-label="Regional population and import exposure"><thead><tr><th scope="col"/><th scope="col">North Hickory</th><th scope="col">Raleigh-Cary</th></tr></thead><tbody><tr><th scope="row">Population in 2000 (thousands)</th><td>377.5</td><td>1,420.0</td></tr><tr><th scope="row">Import shock, 2000–12 (pp)</th><td>4.40</td><td>3.42</td></tr></tbody></table>
 </div>;
}

export function ResponseRounds(){
 return <svg className="diagram response-rounds" viewBox="0 0 800 270" role="img" aria-label="Contributions to each player's investment, on a common zero-based scale: direct incentive 1, one link 1/4, two links 1/16, three links 1/64." style={{fontFamily:'Arial,sans-serif',fill:ink}}>
  <text x={0} y={22} fontSize={18} fill={gray}>Contribution</text><text x={790} y={22} fontSize={18} textAnchor="end" fill={gray}>Investment</text>
  {[{label:'Direct incentive',value:1,text:'1'},{label:'After one link',value:.25,text:'1/4'},{label:'After two links',value:.0625,text:'1/16'},{label:'After three links',value:.015625,text:'1/64'}].map((r,i)=>{const y=59+i*47;return <g key={r.label}><text x={0} y={y+7} fontSize={21}>{r.label}</text><rect x={258} y={y-9} width={r.value*420} height={18} fill={teal}/><text x={790} y={y+7} textAnchor="end" fontSize={21} style={{fontVariantNumeric:'tabular-nums'}}>{r.text}</text></g>})}
  <line x1={258} x2={678} y1={232} y2={232} stroke="#bac9c4"/>{[0,.5,1].map(v=><text key={v} x={258+420*v} y={258} textAnchor="middle" fontSize={17} fill={gray}>{v}</text>)}
 </svg>;
}
