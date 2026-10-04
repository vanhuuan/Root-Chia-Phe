import type {Metadata} from "next";
import "../../rules.css";
import FactionGuides from "../../faction-guides";
import HundredsAdventure from "./adventure";
export const metadata:Metadata={title:"Lãnh chúa Bầy Chuột • Câu chuyện luật Root",description:"Học Lord of the Hundreds trên bản đồ tương tác: Warlord, Stronghold, Mob, Hoard, Mood, Command, Advance, Looters và Oppress."};
export default function HundredsPage(){return <main className="rules-page"><header className="topbar"><a className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><a className="rules-nav-link" href="/rules">Về luật cơ bản</a></header><HundredsAdventure/><FactionGuides active="lord-of-the-hundreds"/></main>}
