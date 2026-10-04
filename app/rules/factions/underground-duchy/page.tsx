import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import DuchyAdventure from "./adventure";
export const metadata:Metadata={title:"Công quốc Chuột chũi • Luật Root",description:"Tra cứu luật Underground Duchy trên một trang: Burrow, Dig, Assembly, chín bộ trưởng, Sway, crown, Price of Failure và craft, kèm ví dụ tương tác."};
export default function DuchyPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><DuchyAdventure/><FactionGuides active="underground-duchy"/></main>}
