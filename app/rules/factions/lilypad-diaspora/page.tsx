import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import FrogAdventure from "./adventure";
export const metadata:Metadata={title:"Cộng đồng Ếch lưu tán • Luật Root",description:"Luật Lilypad Diaspora bằng tiếng Việt trên một trang: Peaceful/Militant, Settle, Provoke, Pond, Negotiations, Integrate, Frog Dominance và các ví dụ tương tác độc lập."};
export default function FrogPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><FrogAdventure/><FactionGuides active="lilypad-diaspora"/></main>}
