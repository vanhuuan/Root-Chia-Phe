export type Suit="fox"|"rabbit"|"mouse"|"bird";
export const suitNames:Record<Suit,string>={fox:"Cáo",rabbit:"Thỏ",mouse:"Chuột",bird:"Chim"};
export function matches(card:Suit,clearing:Suit){return card===clearing||card==="bird"}
export function spreadCost(printed:number,enemyGroups:number[]){return printed+(enemyGroups.some(n=>n>=3)?1:0)}
export function baseLoss(cards:Suit[],baseSuit:Suit,officers:number,otherBases:number){const remaining=cards.filter(c=>!matches(c,baseSuit));return {cards:otherBases>0?remaining:remaining.slice(0,5),officers:Math.floor(officers/2),removed:Math.ceil(officers/2),overflow:otherBases>0?0:Math.max(0,remaining.length-5)}}
export function revoltRecruit(sympathetic:number,supply:number){const warriors=Math.min(sympathetic,supply);return {warriors,officers:Math.min(1,supply-warriors)}}
export function battleHits(high:number,low:number,allianceWarriors:number,enemyWarriors:number,defending:boolean){return {alliance:Math.min(high,allianceWarriors),enemy:Math.min(low,enemyWarriors)+(defending&&allianceWarriors===0?1:0)}}
