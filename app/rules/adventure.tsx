"use client";

import { useState, type CSSProperties } from "react";
import { storyScenes, type SceneId } from "./story-data";
import "./adventure.css";
import RuleBook from "./rule-book";

const law="https://rules.ledergames.com/?product=root&locale=en-US";
const art = (name:string)=>`/assets/rules/${name}.png`;
function Piece({kind,side="a",used=false}:{kind:"warrior"|"building"|"token"|"ruin"|"boot";side?:string;used?:boolean}) {
  const source=kind==="warrior"?art(side==="a"?"warrior-a":"warrior-b"):art(kind);
  return <img className={`story-piece ${used?"used-piece":""}`} src={source} alt={kind==="warrior"?`Warrior ${side.toUpperCase()}`:kind==="boot"?"Boots":kind} />;
}
function Army({side,warriors,building=0,token=0,ghost=0}:{side:string;warriors:number;building?:number;token?:number;ghost?:number}) {
  return <div className={`story-army side-${side}`}><b>Đoàn {side.toUpperCase()}</b><div className="army-pieces">{Array.from({length:warriors},(_,i)=><Piece key={`w${i}`} kind="warrior" side={side}/>)}{Array.from({length:building},(_,i)=><Piece key={`b${i}`} kind="building"/>)}{Array.from({length:token},(_,i)=><Piece key={`t${i}`} kind="token"/>)}{Array.from({length:ghost},(_,i)=><span key={`g${i}`} className="piece-removed"><Piece kind="warrior" side={side}/><small>đã loại</small></span>)}</div><span>{warriors} warrior{building?` + ${building} building`:""}{token?` + ${token} token`:""}</span></div>;
}
const locations=[{x:12,y:14,label:"A · Cáo",suit:"fox"},{x:40,y:31,label:"B · Thỏ",suit:"rabbit"},{x:13,y:41,label:"C · Chuột",suit:"mouse"}];
function MapBoard({scene,step,route}:{scene:SceneId;step:number;route:string}) {
  const move=scene==="move", setup=scene==="setup", dominance=scene==="dominance";
  const destination=step>=2 && route==="legal"?locations[2]:step>=1?locations[1]:locations[0];
  return <div className="story-map"><img className="story-map-image" src="/assets/autumn-map.webp" alt="Bản đồ Autumn thật của Root"/>
    <svg className="story-path-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{(move || (scene==="map"&&step===2))&&<path className="story-route" d={step>=2&&move&&route==="legal"?"M40 31 L29 31 L23 35 L13 41":"M12 14 L19 19 L31 24 L40 31"}/>}</svg>
    {!setup && !dominance && locations.map((point,i)=><div key={point.label} className={`story-location ${scene==="map"&&step===0?"glowing":""}`} style={{left:`${point.x}%`,top:`${point.y}%`}}><img src={art(point.suit)} alt=""/><b>{point.label}</b>{move&&<small>{i===0?"A rule":i===1?(step>=2&&route==="legal"?"B rule":step>=1?"Hòa rule":"B rule"):"A rule"}</small>}</div>)}
    {setup && step>=1 && [[44,34],[91,48],[35,54],[40,84]].map(([x,y],i)=><div className="map-ruin" key={i} style={{left:`${x}%`,top:`${y}%`}}><Piece kind="ruin"/></div>)}
    {scene==="map"&&step===1&&<div className="map-callout">Ô trắng = slot building<br/>Ruin đang lấp ô R <Piece kind="ruin"/></div>}
    {move&&<><div className="map-residents" style={{left:"12%",top:"22%"}}><Piece kind="building"/></div><div className="map-residents" style={{left:"13%",top:"48%"}}><Piece kind="building"/></div><div className="map-residents" style={{left:"40%",top:"43%"}}><Piece kind="warrior" side="b"/><Piece kind="warrior" side="b"/></div><div className="travellers" style={{"--from-x":`${step>=2?40:12}%`,"--from-y":`${step>=2?36:19}%`,left:`${destination.x}%`,top:`${destination.y+5}%`} as CSSProperties}><Piece kind="warrior"/><Piece kind="warrior"/></div></>}
    {dominance && step>=1 && [[54,12],[40,31],[14,81]].map(([x,y],i)=><div key={i} className="dominance-village" style={{left:`${x}%`,top:`${y}%`}}><img src={art("rabbit")} alt="Thỏ"/><Piece kind="warrior"/><b>A rule</b></div>)}
    {dominance && <div className="map-callout">{step===0?"Daylight · kích hoạt ở ≥10 điểm":step===1?"3 clearing Thỏ · chưa thắng giữa lượt":"Đầu Birdsong · vẫn giữ đủ 3 → thắng"}</div>}
    {scene==="map"&&step===2&&<div className="map-callout">Đường in nối A và B<br/>Sông ≠ đường thường</div>}
    {setup&&step>=1&&<div className="map-callout"><Piece kind="boot"/> Nguồn item · 2 xúc xắc{step>=2&&<span> + 3 lá trên tay mỗi người</span>}</div>}
    <span className="map-art-label">Autumn · các nhãn A/B/C dùng cho ví dụ</span>
  </div>;
}

function GeneralExample({id}:{id:SceneId}) {
  const scene=storyScenes.find(topic=>topic.id===id)!;
  const step=scene.steps.length-1;
  const [bWarriors,setBWarriors]=useState(3),[route,setRoute]=useState(""),[answer,setAnswer]=useState("");
  const bCount=scene.id==="rule"?bWarriors:scene.id==="battle"?0:2;
  const ruler=bCount===3?"A = B: 3" : bCount>3?`B rule: ${bCount} > 3`:"A rule: 3 > B, C";
  return <div className="adventure-visual reduce-motion">
      <div className={`story-stage stage-${scene.id}`} key={`${scene.id}-${step}`}>
        {["setup","map","move","dominance"].includes(scene.id)?<MapBoard key={route} scene={scene.id} step={step} route={route}/>:
        ["rule","ambush","battle"].includes(scene.id)?<div className="clearing-closeup"><div className="closeup-title"><img src={art("rabbit")} alt="Thỏ"/><b>Clearing B · Thỏ</b><span>Ví dụ luật chung · không dùng năng lực phe</span></div><div className="armies">
          <Army side="a" warriors={scene.id==="ambush"?(step===1?1:3):scene.id==="battle"?(step>=2?1:2):2} building={scene.id==="rule"?1:0} ghost={scene.id==="ambush"&&step===1?2:scene.id==="battle"&&step>=2?1:0}/>
          <Army side="b" warriors={bCount} building={scene.id==="battle"&&step<2?1:0} token={scene.id==="rule"&&step>=1?1:0}/>
          {scene.id==="rule"&&step>=2&&<Army side="c" warriors={2}/>}
        </div>{scene.id==="rule"&&<div className="rule-count"><span>A: 2 + 1 = <strong>3</strong></span><span>B: {bCount} + 0 = <strong>{bCount}</strong></span>{step>=2&&<span>C: <strong>2</strong></span>}<b>{ruler}</b>{step>=1&&<small>Token của B không được cộng vào tổng.</small>}</div>}
        {scene.id==="ambush"&&<div className="ambush-table"><img className="actual-card ambush-card" src={art("ambush-card")} alt="Lá Ambush chính thức"/><div className="hit-banner">{step===0?"B chơi Ambush matching":step===1?"Không chặn → A nhận ngay 2 hit":"A chơi Ambush matching → vô hiệu"}</div>{step===2&&<img className="actual-card foil-card" src={art("ambush-card")} alt="Ambush của A để foil"/>}</div>}
        {scene.id==="battle"&&<div className="battle-resolve">{step>=1&&<><div className="story-dice" aria-label="Xúc xắc 3 và 1"><span>3</span><span>1</span></div><div className="hit-math"><b>A: min(3, 2 quân) = 2 hit</b><b>B: min(1, 1 quân) = 1 hit</b></div></>}{step>=2&&<div className="removed-supply"><span>B đã mất:</span><Piece kind="warrior" side="b"/><Piece kind="building"/></div>}{step===3&&<div className="score-gain">+1 điểm cho A · building bị loại</div>}</div>}
        </div>:
        scene.id==="cards"?<div className="card-workbench"><img className={`actual-card ${step===2?"spent-card":""}`} src={art("craft-card")} alt="Lá Boots chính thức với suit và chi phí craft"/><div className="card-explanation">{step===0?<><b>Đọc hai phần riêng</b><span>Suit ở đầu: dùng matching cho hành động</span><span>Góc dưới trái: chi phí craft</span></>:step===1?<><img src={art("bird")} alt="Chim"/><b>Chim có thể thay Thỏ</b><img src={art("rabbit")} alt="Thỏ"/><small>Thỏ không thay yêu cầu Chim</small></>:<><b>Spend → chồng bỏ</b><span>Reveal → làm theo chỉ dẫn, không tự bỏ</span></>}</div>{step===2&&<div className="discard-pile">Chồng bỏ chung</div>}</div>:
        scene.id==="craft"?<div className="craft-workbench"><img className="actual-card" src={art("craft-card")} alt="Lá Boots: chi phí một crafting piece Thỏ, một điểm"/><div className="craft-parts"><div className={`crafting-source ${step>=1?"activated":""}`}><img src={art("rabbit")} alt="Thỏ"/><Piece kind="building" used={step>=1}/><b>Crafting piece Thỏ</b><small>{step>=1?"Đã kích hoạt · vẫn ở trên map":"Chưa dùng lượt này"}</small></div><div className={`crafted-item ${step>=2?"item-delivered":""}`}><Piece kind="boot"/><b>{step>=2?"Crafted Items · +1 điểm":"Nguồn item chung"}</b></div></div>{step===3&&<div className="hit-choice"><b>Nhận 1 hit, còn warrior + building. Loại gì trước?</b><div><button onClick={()=>setAnswer("correct")}><Piece kind="warrior"/>Warrior</button><button onClick={()=>setAnswer("wrong")}><Piece kind="building"/>Building</button></div></div>}</div>:
        scene.id==="turn"?<div className={`day-clock day-${step}`}><img src="/assets/autumn-map.webp" alt="Khu rừng đi qua ba pha"/><div className="phase-stations">{["Birdsong","Daylight","Evening"].map((phase,i)=><div className={Math.min(step,2)===i?"active":""} key={phase}><span>{["Bình minh","Ban ngày","Buổi tối"][i]}</span><b>{phase}</b></div>)}</div><div className="turn-players"><span className={step<3?"active":""}>Ngày của A</span><span className={step===3?"active":""}>Ngày của B</span><span>Ngày của C</span></div></div>:
        <div className="victory-board"><img src="/assets/autumn-map.webp" alt="Bản đồ Root và thang điểm"/><div className="score-track"><span>28</span><span className={step===0?"score-current":""}>29</span><span className={step>=1?"score-current":""}>30</span></div><div className="victory-caption">{step===0?"Còn 1 điểm để đạt 30":step===1?"30 điểm · thắng ngay!":"Thỏa thuận không ràng buộc · chơi theo luật"}</div></div>}
      </div>
      {scene.id==="rule"&&step===3&&<div className="scene-interaction"><span>Thử đổi warrior của B</span><button onClick={()=>setBWarriors(n=>Math.max(0,n-1))} disabled={bWarriors===0} aria-label="Bớt warrior B">−</button><b>{bWarriors}</b><button onClick={()=>setBWarriors(n=>Math.min(5,n+1))} disabled={bWarriors===5} aria-label="Thêm warrior B">+</button></div>}
      {scene.id==="move"&&step===2&&<div className="scene-interaction route-choices"><span>Chọn đường của đoàn A:</span><button className={route==="legal"?"chosen":""} onClick={()=>setRoute("legal")}>B → C (C do A rule)</button><button className={route==="illegal"?"chosen":""} onClick={()=>setRoute("illegal")}>B → góc xa map</button></div>}
      <div className="interaction-feedback" role="status">{route&&scene.id==="move"&&step===2?(route==="legal"?"Hợp lệ: B và C có đường nối, A rule C. Đây là một move mới.":"Chưa hợp lệ: không có đường nối trực tiếp. Phải đi từng clearing và kiểm tra rule mỗi chặng."):answer&&scene.id==="craft"&&step===3?(answer==="correct"?"Đúng rồi! Warrior chịu hit trước; building vẫn ở lại.":"Chưa đúng. Bạn còn warrior, nên phải loại warrior trước building."):""}</div>
    <button className="rules-nav-link" onClick={()=>{setBWarriors(3);setRoute("");setAnswer("");}}>Đặt lại ví dụ</button>
  </div>;
}
export default function Adventure() {
  const headings: Record<SceneId, string[]> = {
    setup: ["Mục tiêu 30 điểm", "Ruin, item và bản đồ", "Bài ban đầu và cách setup"],
    map: ["Clearing và suit", "Slot building và token", "Adjacency, sông và forest"],
    cards: ["Spend và craft", "Bài Chim và matching", "Spend, discard và reveal"],
    rule: ["Đếm warrior và building", "Token không tính rule", "So với từng đối thủ", "Hòa quyền kiểm soát"],
    move: ["Điều kiện ở hai đầu đường", "Một move tới clearing kề", "Kiểm tra từng move"],
    ambush: ["Chơi Ambush", "Chịu 2 hit trước xúc xắc", "Foil Ambush"],
    battle: ["Chọn attacker và defender", "Xúc xắc và giới hạn hit", "Thứ tự chịu hit", "Điểm khi loại building/token"],
    craft: ["Chi phí craft", "Kích hoạt crafting piece", "Nhận item và điểm", "Warrior chịu hit trước"],
    turn: ["Birdsong", "Daylight", "Evening", "Chuyển lượt theo chiều kim đồng hồ"],
    victory: ["Đạt 30 điểm", "Thắng ngay", "Thỏa thuận và luật ưu tiên"],
    dominance: ["Kích hoạt Dominance", "Điều kiện suit", "Kiểm tra ở đầu Birdsong"],
  };
  const topics=storyScenes.map(scene=>({...scene,title:scene.id === "rule" ? "Rule: quyền kiểm soát" : scene.subtitle,ref:scene.reference,steps:scene.steps.map((point,i)=>({...point,title:headings[scene.id][i]}))}));
  return <RuleBook id="general" name="Luật cơ bản của Root" description="Đọc các luật trên một trang, dùng mục lục để tra nhanh và thử trực tiếp các ví dụ bên cạnh." law={law} topics={topics} renderExample={topic=><GeneralExample id={topic.id as SceneId}/>}/>;
}
