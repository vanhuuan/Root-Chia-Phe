import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import EyrieAdventure from "./adventure";
export const metadata:Metadata={title:"Triều đại Đại bàng • Luật phe Root",description:"Luật Eyrie Dynasties trên một trang: chuẩn bị phe, thủ lĩnh, Decree, tuyển quân, di chuyển, giao chiến, xây roost và Turmoil; kèm ví dụ tương tác."};
export default function EyriePage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><EyrieAdventure/><FactionGuides active="eyrie-dynasties"/></main>}
