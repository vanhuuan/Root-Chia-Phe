import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import CatAdventure from "./adventure";
export const metadata:Metadata={title:"Hầu tước Mèo • Câu chuyện luật Root",description:"Học Marquise de Cat qua câu chuyện tương tác: setup, gỗ, craft, hành động, Field Hospitals và ghi điểm."};
export default function CatPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><CatAdventure/><FactionGuides cat/></main>}
