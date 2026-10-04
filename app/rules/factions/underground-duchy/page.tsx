import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import DuchyAdventure from "./adventure";
export const metadata:Metadata={title:"Công quốc Chuột chũi • Câu chuyện luật Root",description:"Học Underground Duchy qua câu chuyện và bài tập tương tác: Burrow, Dig, Assembly, chín bộ trưởng, Sway, crown, Price of Failure và craft."};
export default function DuchyPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><DuchyAdventure/><FactionGuides active="underground-duchy"/></main>}
