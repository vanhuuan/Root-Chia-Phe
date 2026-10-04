import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import RiverfolkAdventure from "./adventure";
export const metadata:Metadata={title:"Công ty Rái cá • Luật phe Root",description:"Tra cứu luật Riverfolk Company và ví dụ tương tác: Funds, Payments, dịch vụ, Mercenaries, thương điếm, craft, Export và cổ tức."};
export default function RiverfolkPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><RiverfolkAdventure/><FactionGuides active="riverfolk-company"/></main>}
