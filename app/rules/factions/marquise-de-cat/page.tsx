import type { Metadata } from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import CatAdventure from "./adventure";
export const metadata:Metadata={title:"Hầu tước Mèo • Luật Root",description:"Luật Marquise de Cat trên một trang: setup, sản xuất gỗ, craft, hành động, Field Hospitals và ghi điểm, kèm ví dụ tương tác."};
export default function CatPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><CatAdventure/><FactionGuides cat/></main>}
