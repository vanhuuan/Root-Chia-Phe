"use client";

import RuleBook, {type RuleTopic} from "../../rule-book";
import {useState} from "react";
import {law, scenes, faqs, ministers} from "./story";
import {SceneLab} from "./labs";
import "./duchy.css";

const titles: Record<string, [string, string, string]> = {
  setup: ["Chuẩn bị phe", "Quân, công trình và Burrow", "Bộ trưởng, crown và bài tay"],
  burrow: ["Burrow và di chuyển qua tunnel", "Burrow luôn do Công quốc rule", "Hai tunnel cần hai Move qua Burrow"],
  birdsong: ["Birdsong: đặt quân vào Burrow", "Một quân cộng bonus Citadel", "Phân biệt với Recruit của Assembly"],
  assembly: ["Daylight: Assembly, Parliament, Sway", "Tối đa hai action Assembly tổng cộng", "Thực hiện đúng thứ tự"],
  build: ["Build: Citadel và Market", "Reveal bài matching để Build", "Foremole dùng bài bất kỳ"],
  dig: ["Dig: spend bài, đặt tunnel và Move", "Move từ một đến bốn warrior", "Thu hồi tunnel khi cả ba đã trên bản đồ"],
  parliament: ["Parliament: dùng bộ trưởng đã Sway", "Mỗi bộ trưởng hành động một lần", "Hoàn thành action trước khi dùng người khác"],
  combo: ["Brigadier và Mayor", "Hai Move hoặc hai Battle", "Mayor sao chép Squire hoặc Noble khác"],
  sway: ["Sway: bài và clearing có hiện diện", "Mỗi clearing hỗ trợ một lá", "Chim vẫn cần clearing riêng"],
  crowns: ["Crown và VP khi Sway", "Cần crown chưa dùng đúng cấp", "VP nhận ngay; action chờ lượt sau"],
  banker: ["Banker và ba Lord: action ghi điểm", "Banker spend các lá cùng chất", "Lord đếm pieces trên bản đồ"],
  failure: ["Price of Failure khi mất building", "Trả bộ trưởng có rank cao nhất", "Một lần cho một sự kiện loại đồng thời"],
  evening: ["Evening: trả bài, craft và rút", "Discard Chim đã reveal; trả các lá khác", "Craft bằng từng Citadel và Market"],
  example: ["Ví dụ áp dụng trong một lượt", "Assembly và Parliament", "Sway và Evening"],
  strategy: ["Gợi ý sử dụng phe · không phải luật", "Lập kế hoạch action và Sway", "Bảo vệ công trình và quản lý crown"]
};

const topics: RuleTopic[] = scenes.map(scene => ({
  id: scene.id,
  title: titles[scene.id][0],
  ref: scene.ref,
  steps: scene.steps.map((step, index) => ({
    title: titles[scene.id][index + 1],
    rule: `${step.story} ${step.rule}`
  }))
}));

function TopicExample({id}: {id: string}) {
  const [version, setVersion] = useState(0);
  const interactive = ["burrow", "dig", "parliament", "combo", "sway", "crowns", "banker", "failure"].includes(id);
  return <div className="duchy-worktable"><SceneLab key={version} id={id}/>{interactive && <button onClick={() => setVersion(value => value + 1)}>Đặt lại ví dụ</button>}</div>;
}

export default function DuchyAdventure() {
  return <div className="duchy-adventure">
    <RuleBook id="duchy" name="Công quốc Chuột chũi" subtitle="UNDERGROUND DUCHY · LUẬT PHE" description="Tra cứu setup, Burrow, từng bước của lượt, chín bộ trưởng và các điều kiện Sway. Mỗi ví dụ tương tác độc lập với các ví dụ khác." portrait="/assets/underground-duchy-portrait.webp" law={law} topics={topics} renderExample={topic => <TopicExample id={topic.id}/>}>
      <section id="duchy-reference" className="duchy-reference">
        <span className="eyebrow">TRA NHANH KHI CHƠI</span><h2>Một lượt Công quốc Chuột chũi</h2>
        <div className="duchy-reference-grid"><div><h3>Birdsong</h3><p>Đặt 1 warrior + mỗi icon warrior đang lộ vào Burrow.</p></div><div><h3>Daylight · đúng thứ tự</h3><ol><li>Assembly: tối đa 2 action.</li><li>Parliament: mỗi bộ trưởng đã Sway, 1 lần tùy thứ tự.</li><li>Sway: tối đa 1 bộ trưởng mới.</li></ol></div><div><h3>Evening</h3><ol><li>Discard Chim reveal, trả lá reveal khác.</li><li>Craft bằng Citadel/Market.</li><li>Rút 1 + bonus; bỏ xuống 5.</li></ol></div></div>
        <div className="duchy-table-scroll"><table><caption>Assembly · tối đa 2 action tổng cộng, được lặp</caption><thead><tr><th>Action</th><th>Chi phí và điều kiện</th></tr></thead><tbody><tr><th>Build</th><td>Reveal 1 lá matching; đặt Citadel/Market ở clearing bạn rule, còn slot.</td></tr><tr><th>Recruit</th><td>Đặt 1 warrior từ nguồn vào Burrow.</td></tr><tr><th>Move</th><td>1 Move hợp lệ theo adjacency và rule.</td></tr><tr><th>Battle</th><td>Khởi xướng 1 Battle hợp lệ.</td></tr><tr><th>Dig</th><td>Spend 1 lá matching, đặt tunnel nơi chưa có tunnel rồi Move 1–4 quân từ Burrow. Cả 3 tunnel ở bản đồ thì được thu hồi 1 trước.</td></tr></tbody></table></div>
        <div className="duchy-table-scroll"><table><caption>Đủ 9 bộ trưởng · đối chiếu tên trên thẻ thật</caption><thead><tr><th>Bộ trưởng</th><th>Cấp / lá Sway</th><th>Action Parliament</th></tr></thead><tbody>{ministers.map(m => <tr key={m.name}><th scope="row">{m.name}<small className="duchy-minister-vi">{m.vi}</small></th><td>{m.rank} · {m.cards} lá</td><td>{m.action}</td></tr>)}</tbody></table></div>
        <div className="duchy-result">Sway: mỗi clearing matching có piece Công quốc hỗ trợ 1 lá.<br/>Cần crown đúng rank; VP đọc ô crown vừa mở. Bộ trưởng mới dùng action từ lượt sau.</div>
        <p>Price of Failure: một sự kiện mất một hoặc nhiều building → trả một bộ trưởng rank cao nhất, bỏ crown vĩnh viễn, discard ngẫu nhiên một lá. Mất tunnel/warrior không kích hoạt.</p>
        <a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 12: Underground Duchy</a>
        <p className="duchy-note">Diễn giải tiếng Việt theo Law of Root, phần 12, đối chiếu Rules Library và Learning to Play của Leder Games. Tên Việt bộ trưởng là nhãn giúp nhớ; đối chiếu tên Anh trên thẻ thật. Artwork có sẵn từ Leder Games / Kyle Ferrin. Các mô hình minh họa từng luật, không mô phỏng toàn bộ trận; luật card, map, hireling và setup riêng vẫn áp dụng.</p>
      </section>
      <section id="duchy-faq" className="duchy-faq"><span className="eyebrow">LUẬT DỄ NHẦM</span><h2>Hỏi nhanh tại bàn</h2>{faqs.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section>
    </RuleBook>
  </div>;
}
