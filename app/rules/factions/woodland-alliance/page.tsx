import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import AllianceAdventure from "./adventure";
export const metadata:Metadata={title:"Liên minh Rừng xanh • Luật Root",description:"Luật Woodland Alliance bằng tiếng Việt: thiết lập, Supporters, Sympathy, Martial Law, Outrage, Revolt, sĩ quan và trình tự lượt, kèm ví dụ tương tác."};
export default function AlliancePage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><AllianceAdventure/><FactionGuides active="woodland-alliance"/></main>}
