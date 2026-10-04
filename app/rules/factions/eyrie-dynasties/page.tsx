import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import EyrieAdventure from "./adventure";
export const metadata:Metadata={title:"Triều đại Đại bàng • Câu chuyện luật Root",description:"Học Eyrie Dynasties qua câu chuyện tương tác: chọn thủ lĩnh, lập Decree, tuyển quân, di chuyển, battle, xây roost và Turmoil."};
export default function EyriePage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><EyrieAdventure/><FactionGuides active="eyrie-dynasties"/></main>}
