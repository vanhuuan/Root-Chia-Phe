import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import KeepersRules from "./adventure";
export const metadata:Metadata={title:"Hiệp sĩ Lửng sắt • Luật chơi Root",description:"Luật Keepers in Iron bằng tiếng Việt: thiết lập, di vật, Waystation, Retinue, Delve, vận chuyển, Recover và thứ tự lượt, kèm ví dụ tương tác."};
export default function KeepersPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><KeepersRules/><FactionGuides active="keepers-in-iron"/></main>}
