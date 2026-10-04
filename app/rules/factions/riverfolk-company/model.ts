export function dividends(funds:number,hasPost:boolean){return hasPost?Math.floor(funds/2):0}
export function disrupted(funds:number,posts:number){let remaining=funds;for(let i=0;i<posts;i++)remaining=Math.floor(remaining/2);return remaining}
export function purchaseLimit(clearings:number){return 1+clearings}
export function canEstablish(ruler:string,owner:string,funds:number,occupied:boolean,stock:boolean,blocked:boolean){return ruler!=="none"&&ruler===owner&&funds>=2&&!occupied&&stock&&!blocked}
export function craftCost(slots:number,used:number,funds:number){return slots-used>=2&&funds>=2}
export function riverMove(swimmer:boolean,rule:boolean,linked:boolean){return linked&&(swimmer||rule)}
