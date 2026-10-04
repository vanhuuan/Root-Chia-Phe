import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import KeepersAdventure from "./adventure";
export const metadata:Metadata={title:"Hiệp sĩ Lửng sắt • Câu chuyện luật Root",description:"Học Keepers in Iron trên bản đồ tương tác: relic trong forest, Waystation, Retinue, Battle then Delve, Move, Recover và bonus bộ di vật."};
export default function KeepersPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><KeepersAdventure/><FactionGuides active="keepers-in-iron"/></main>}
