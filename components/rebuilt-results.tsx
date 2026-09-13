import data from '@/lib/reconstruction-data.json';
import {Math as TypesetMath} from './math';

const ink='#1c3138',teal='#21675f',gray='#61727a';

export function SearchTests(){return <table className="rebuilt-table search-tests" aria-label="Likelihood-ratio test p-values by industry and for the aggregate"><thead><tr><th>Labor market</th><th>Submarkets<br/><small>A / B</small></th><th>Direction¹<br/><small>B / C</small></th><th>Efficiency¹<br/><small>C / D</small></th></tr></thead><tbody>{data.searchTests.map(row=><tr key={row.name}><th>{row.name}</th>{row.p.map((p,i)=><td key={i} className={p==='0'?'rejected':''}>{p}</td>)}</tr>)}</tbody></table>}

export function CarbonResponse(){
 const d=data.carbon,x=(v:number)=>75+v*90,y=(v:number)=>178-v*43;
 const line=(values:number[])=>values.map((v,i)=>`${i===0?'M':'L'}${x(i)},${y(v)}`).join(' ');
 const band=(low:number[],high:number[])=>line(high)+' '+low.map((_,j)=>{const i=low.length-1-j;return `L${x(i)},${y(low[i])}`}).join(' ')+' Z';
 const labels=[{text:'95% confidence band',v:d.upper95[6],color:gray},{text:'67% confidence band',v:d.upper67[6],color:teal},{text:'Estimate',v:d.estimate[6],color:teal}];
 return <div><p className="chart-context">EU+ countries · Restricted local projections · Four lags</p><svg className="diagram carbon-response" viewBox="0 0 850 365" role="img" aria-label="GDP-level response to a forty-dollar carbon-tax increase over years zero to six. Both 67 and 95 percent confidence bands include zero throughout." style={{fontFamily:'Arial,sans-serif',fill:ink}}>
  <text x={75} y={18} fontSize={18}>GDP level · percentage points</text>
  {[-3,-2,-1,0,1,2,3].map(v=><g key={v}>{v!==0&&<line x1={75} x2={615} y1={y(v)} y2={y(v)} stroke="#e4e9e7"/>}<text x={58} y={y(v)+6} fontSize={17} textAnchor="end">{v}</text></g>)}
  <path d={band(d.lower95,d.upper95)} fill="#dce9e5"/><path d={band(d.lower67,d.upper67)} fill="#a7c8bd"/>
  <line x1={75} x2={615} y1={y(0)} y2={y(0)} stroke={gray} strokeDasharray="5 4"/>
  <path d={line(d.estimate)} stroke={teal} strokeWidth={3} fill="none"/>
  {d.years.map(i=><g key={i}><circle cx={x(i)} cy={y(d.estimate[i])} r={3.5} fill={teal}/><text x={x(i)} y={330} fontSize={18} textAnchor="middle">{i}</text></g>)}
  {labels.map(l=><g key={l.text}><line x1={615} x2={637} y1={y(l.v)} y2={y(l.v)} stroke={l.color}/><text x={647} y={y(l.v)+6} fontSize={18} fill={l.color}>{l.text}</text></g>)}
  <text x={345} y={359} textAnchor="middle" fontSize={18}>Years after implementation</text>
 </svg></div>;
}

export function HankSystem(){return <div className="hank-system"><table className="rebuilt-table hank-blocks"><thead><tr><th>Computation</th><th>Inputs</th><th>Feeds forward</th></tr></thead><tbody>{data.hankBlocks.map((row,i)=><tr key={row.name}><th><span>{i+1}</span>{row.name}</th><td><TypesetMath tex={row.inputs}/></td><td><TypesetMath tex={row.outputs}/></td></tr>)}</tbody></table><div className="hank-targets">{data.hankTargets.map(row=><div key={row.name}><strong>{row.name}</strong><TypesetMath tex={row.inputs}/><TypesetMath tex={row.condition}/></div>)}</div></div>}

export function HankWealth(){return <table className="rebuilt-table hank-moments"><thead><tr><th>Wealth moment</th><th>Data</th><th>Model</th></tr></thead><tbody>{[['Mean illiquid assets / GDP','2.920','2.920'],['Mean liquid assets / GDP','0.260','0.263'],['Poor hand-to-mouth','10%','10%'],['Wealthy hand-to-mouth','20%','19%']].map(r=><tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>}
export function HankFiscal(){return <table className="rebuilt-table hank-moments"><thead><tr><th>Fiscal adjustment</th><th>Consumption<br/>elasticity</th><th>Direct-effect<br/>share</th></tr></thead><tbody>{[['Transfers','−2.21','19%'],['Government purchases','−2.07','22%'],['Public debt','−1.48','46%']].map(r=><tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>}
export function HankTransmission(){return <div className="transmission-bars">{[{name:'HANK',direct:1/3,labels:['Direct ⅓','Indirect ⅔']},{name:'RANK',direct:.95,labels:['Direct 95%','5%']}].map(r=><div key={r.name}><strong>{r.name}</strong><div className="transmission-track"><span style={{width:`${r.direct*100}%`}}>{r.labels[0]}</span><span style={{width:`${(1-r.direct)*100}%`}}>{r.labels[1]}</span></div></div>)}<p>Direct: liquid return<br/>Indirect: wages, illiquid returns, and transfers</p></div>}
