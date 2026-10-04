import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import VagabondAdventure from "./adventure";
export const metadata:Metadata={title:"Lãng khách • Luật Root",description:"Luật Vagabond bằng tiếng Việt trên một trang: chuẩn bị, item, trình tự lượt, Slip, Aid, Infamy, Quest, Coalition và ví dụ tương tác."};
export default function VagabondPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><VagabondAdventure/><FactionGuides active="vagabond"/></main>}
