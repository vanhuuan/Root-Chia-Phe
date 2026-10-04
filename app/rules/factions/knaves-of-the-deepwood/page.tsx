import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import KnavesAdventure from "./adventure";
export const metadata:Metadata={title:"Hảo hán Rừng sâu • Câu chuyện luật Root",description:"Học Knaves of the Deepwood: ba Captain, Stash, bắt tù binh, Acclaim, Filch, Serve và Mock the Powerful qua câu chuyện và bài tập tương tác."};
export default function KnavesPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><KnavesAdventure/><FactionGuides active="knaves-of-the-deepwood"/></main>}
