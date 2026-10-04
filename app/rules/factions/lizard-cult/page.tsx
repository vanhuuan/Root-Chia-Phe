import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import LizardAdventure from "./adventure";
export const metadata:Metadata={title:"Giáo phái Thằn Lằn • Câu chuyện luật Root",description:"Học Lizard Cult bằng câu chuyện và bài tập tương tác: Lost Souls, Outcast/Hated, tín đồ, conspiracies, nghi lễ, vườn, ghi điểm và craft."};
export default function LizardPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><LizardAdventure/><FactionGuides active="lizard-cult"/></main>}
