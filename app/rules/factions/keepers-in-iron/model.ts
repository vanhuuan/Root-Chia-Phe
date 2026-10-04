export type RelicType="figure"|"tablet"|"jewelry";
export type Relic={id:string;type:RelicType;value:number;shown:boolean};
export type Clearing={id:string;suit:"fox"|"rabbit"|"mouse";x:number;y:number;knights:number;station:RelicType|null;enemy:number;building:number;relics:Relic[]};
export type Forest={id:string;x:number;y:number;adjacent:string[];relics:Relic[]};
export type World={clearings:Clearing[];forests:Forest[]};
export const roads=[[0,1],[1,2],[2,3],[0,4],[1,5],[2,6],[3,7],[4,5],[5,6],[6,7]];
export const relic=(id:string,type:RelicType,value:number,shown=true):Relic=>({id,type,value,shown});
export function initial(id:string):World{const clearings:Clearing[]=["A","B","C","D","E","F","G","H"].map((name,i)=>({id:name,suit:(["fox","rabbit","mouse","fox","rabbit","mouse","fox","rabbit"] as const)[i],x:[14,38,62,86][i%4],y:i<4?22:77,knights:0,station:null,enemy:0,building:0,relics:[]}));const forests:Forest[]=[{id:"X",x:26,y:49,adjacent:["A","B","E","F"],relics:[relic("x","figure",3,false)]},{id:"Y",x:50,y:49,adjacent:["B","C","F","G"],relics:[relic("y","tablet",2,false)]},{id:"Z",x:74,y:49,adjacent:["C","D","G","H"],relics:[relic("z","jewelry",1,false)]}];clearings[0].knights=4;clearings[1].knights=4;
if(["relics","recruit"].includes(id)){clearings[0].knights=2;clearings[0].station="figure"}
if(id==="move"){clearings[0].knights=1;clearings[1].knights=3;clearings[1].station="figure";clearings[1].relics=[relic("b1","figure",2),relic("b2","tablet",3),relic("b3","jewelry",1)]}
if(id==="battle"){clearings[0].knights=0;clearings[1].knights=4;clearings[1].enemy=2;clearings[1].relics=[relic("b","figure",2)]}
if(["delve","delve-risk"].includes(id)){clearings[0].knights=2;clearings[1].knights=3;if(id==="delve")clearings[1].enemy=1}
if(id==="recover"){clearings[0].knights=0;clearings[1].knights=2;clearings[1].station="figure";clearings[1].relics=[relic("b1","figure",2),relic("b2","figure",3)];clearings[4].knights=1}
if(id==="recover-risk"){clearings[0].knights=2;clearings[1].knights=0;clearings[1].enemy=2;clearings[1].station="figure";clearings[1].relics=[relic("b1","figure",3)];clearings[4].knights=1;clearings[7].knights=1}
if(id==="sets"){clearings[0].knights=0;clearings[1].knights=2;clearings[1].station="jewelry";clearings[1].relics=[relic("b1","jewelry",3)];clearings[4].knights=1;clearings[7].knights=1}
if(id==="craft"){clearings[0].knights=2;clearings[0].station="figure";clearings[1].knights=0;clearings[3].knights=1;clearings[3].station="tablet"}
if(id==="trophies"){clearings[0].knights=0;clearings[1].knights=0;clearings[1].relics=[relic("b1","figure",3)];clearings[1].enemy=1}
if(id==="evening"){clearings[0].knights=6;clearings[1].knights=4;clearings[3].knights=3;clearings[0].station="figure";clearings[3].station="tablet"}
if(id==="turn"){clearings[0].knights=2;clearings[1].knights=2;clearings[2].knights=2;clearings[2].station="figure";clearings[5].knights=1;forests[0].relics=[relic("x","figure",2,false)]}
return {clearings,forests}}
export const rules=(c:Clearing)=>c.knights+Number(c.station!==null)>c.enemy+c.building;
export const delveSupport=(world:World,forest:string)=>world.clearings.filter(c=>world.forests.find(f=>f.id===forest)!.adjacent.includes(c.id)&&rules(c)).length;
export const recoverSupport=(world:World,clearing:string)=>world.clearings.filter(c=>c.suit===world.clearings.find(v=>v.id===clearing)!.suit&&rules(c)).length;
export const sets=(counts:Record<RelicType,number>)=>Math.min(counts.figure,counts.tablet,counts.jewelry);
export const canCarry=(warriors:number,relics:number)=>warriors>0&&relics<=warriors;
