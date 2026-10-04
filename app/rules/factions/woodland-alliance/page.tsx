import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import AllianceAdventure from "./adventure";
export const metadata:Metadata={title:"Liên minh Rừng xanh • Câu chuyện luật Root",description:"Học Woodland Alliance bằng câu chuyện tương tác: Supporters, Sympathy, Martial Law, Outrage, Revolt, sĩ quan, Organize và chiến tranh du kích."};
export default function AlliancePage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><AllianceAdventure/><FactionGuides active="woodland-alliance"/></main>}
