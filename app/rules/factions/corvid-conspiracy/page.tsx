import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import CorvidAdventure from "./adventure";
export const metadata:Metadata={title:"Âm mưu Quạ • Câu chuyện luật Root",description:"Học Corvid Conspiracy qua câu chuyện tương tác: bốn âm mưu, đặt và lật plot, Exposure, tuyển quân và ghi điểm."};
export default function CorvidPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><CorvidAdventure/><FactionGuides active="corvid-conspiracy"/></main>}
