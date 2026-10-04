import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import CouncilAdventure from "./adventure";
export const metadata:Metadata={title:"Hội đồng Hoàng hôn • Luật Root",description:"Luật Twilight Council bằng tiếng Việt trên một trang, kèm ví dụ tương tác: assemblies, Loyalists, Governors, Entreat, Peacekeepers, Banish, Agitate, Empower và Oversee."};
export default function CouncilPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><CouncilAdventure/><FactionGuides active="twilight-council"/></main>}
