import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import KnavesAdventure from "./adventure";
export const metadata:Metadata={title:"Hảo hán Rừng sâu • Luật phe Root",description:"Luật tiếng Việt của Knaves of the Deepwood: chuẩn bị, lượt chơi, ba Captain, Stash, bắt tù binh, Acclaim, Filch và Serve; kèm ví dụ tương tác độc lập."};
export default function KnavesPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><KnavesAdventure/><FactionGuides active="knaves-of-the-deepwood"/></main>}
