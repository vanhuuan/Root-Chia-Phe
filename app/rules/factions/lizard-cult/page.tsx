import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import LizardAdventure from "./adventure";
export const metadata:Metadata={title:"Giáo phái Thằn Lằn • Luật Root",description:"Tra cứu luật Lizard Cult: setup, Lost Souls, Outcast/Hated, tín đồ, conspiracies, nghi lễ, vườn, ghi điểm và craft; ví dụ tương tác và thứ tự lượt."};
export default function LizardPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><LizardAdventure/><FactionGuides active="lizard-cult"/></main>}
