export type Suit = "fox" | "rabbit" | "mouse";
export type ClearingState = { suits: (Suit | null)[]; flooded: number[]; landmarks: number[] };
export const suitInfo = { fox: { label: "Cáo", icon: "🦊" }, rabbit: { label: "Thỏ", icon: "🐰" }, mouse: { label: "Chuột", icon: "🐭" } };
const points = {
  autumn: [[105,115],[510,86],[830,212],[95,355],[382,267],[596,422],[298,492],[849,448],[544,674],[137,716],[356,760],[771,768]],
  winter: [[120,125],[361,152],[566,210],[835,215],[137,366],[357,440],[584,413],[876,528],[132,697],[354,746],[557,641],[799,755]],
  lake: [[140,166],[429,100],[650,195],[871,305],[105,423],[304,313],[607,419],[830,485],[321,577],[113,710],[433,757],[797,723]],
  mountain: [[115,140],[506,131],[799,204],[280,287],[459,342],[859,432],[83,496],[319,585],[608,525],[130,726],[549,739],[815,685]],
  gorge: [[212,226],[976,212],[1384,243],[325,567],[782,483],[1250,558],[240,887],[823,897],[1391,868],[260,1280],[761,1220],[1145,1293]],
  marsh: [[205,220],[685,195],[1030,275],[1465,335],[458,510],[880,630],[1295,665],[130,880],[620,835],[1030,1030],[1501,1000],[148,1300],[559,1230],[783,1350],[1366,1350]],
};
export function clearingPoints(map: string) {
  const key = map as keyof typeof points;
  const [w,h] = key === "marsh" || key === "gorge" ? [1600,1467] : [950,key === "mountain" ? 874 : key === "winter" ? 871 : 870];
  return (points[key] || points.autumn).map(([x,y]) => ({ x:x/w*100, y:y/h*100 }));
}
export function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i=result.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
  return result;
}
export function allocateClearings(map: string, players: number, flooded: number[] = []): ClearingState {
  const count = clearingPoints(map).length;
  const pool: (Suit | null)[] = shuffle(["fox","rabbit","mouse"].flatMap(suit => Array(4).fill(suit)) as Suit[]);
  const landmarks: number[] = [];
  if (map === "marsh" && players >= 5) pool.push(null,null,null);
  const mixed = shuffle(pool);
  const suits = Array.from({length:count},(_,index) => {
    if (flooded.includes(index)) return null;
    const suit = mixed.shift() ?? null;
    if (suit === null && map === "marsh" && players >= 5) landmarks.push(index);
    return suit;
  });
  if (landmarks.length) shuffle(["mouse","fox","rabbit"] as Suit[]).forEach((suit,i) => { suits[landmarks[i]]=suit; });
  return { suits, flooded, landmarks };
}
