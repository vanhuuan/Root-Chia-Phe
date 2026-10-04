import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import VagabondAdventure from "./adventure";
export const metadata:Metadata={title:"Lãng khách • Câu chuyện luật Root",description:"Hướng dẫn Vagabond chi tiết bằng câu chuyện và ví dụ tương tác: item, Slip, Aid, quan hệ, Infamy, quest, liên minh và 12 nhân vật."};
export default function VagabondPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><VagabondAdventure/><FactionGuides active="vagabond"/></main>}
