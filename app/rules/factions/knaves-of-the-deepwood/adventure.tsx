"use client";
import RuleBook from "../../rule-book";
import {law,topics,faqs,captains,items} from "./story";
import {TopicLab} from "./labs";
import "./knaves.css";

export default function KnavesAdventure(){
return <RuleBook
  id="knaves"
  name="Hảo hán Rừng sâu"
  subtitle="KNAVES OF THE DEEPWOOD · LUẬT PHE"
  description="Tra cứu chuẩn bị, lượt chơi, kho item chung, bắt tù binh và Acclaim. Mọi mục luật đều hiển thị bên dưới; mỗi ví dụ có trạng thái riêng."
  portrait="/assets/knaves-of-the-deepwood-portrait.webp"
  law={law}
  topics={topics}
  renderExample={topic=><div className="knaves-worktable"><TopicLab id={topic.id}/><p className="knaves-model-label">Ví dụ độc lập, chỉ minh họa luật của mục này. Luật card, map, hireling và setup riêng vẫn áp dụng.</p></div>}
>
<nav className="knaves-jump" aria-label="Tra cứu bổ sung"><a href="#knaves-reference">Tờ nhắc tại bàn</a><a href="#knaves-faq">Luật dễ nhầm</a></nav>
<section id="knaves-reference" className="knaves-reference"><span className="eyebrow">TRA NHANH KHI CHƠI</span><h2>Một lượt Hảo hán Rừng sâu</h2><div className="knaves-reference-grid"><div><h3>Birdsong · Ready</h3><p>Chọn 1 Captain card ngửa. Nếu Captain không ở map, đặt vào forest bất kỳ, remove tù tại đó và forest kề; lượt này 3 action.</p></div><div><h3>Daylight · Acts & Retire</h3><p>Tối đa 4 action (hoặc 3 khi hồi Captain): Move, Battle, Filch một lần, item actions. Xong, lật thẻ Acting Captain xuống; quân vẫn ở map.</p></div><div><h3>Evening</h3><ol><li>Mock: ⌊tù/2⌋ + ⌊Acclaim/2⌋ VP.</li><li>Protect: spend matching card đặt Skunk tại mỗi Acclaim, một lần/token.</li><li>Cả ba thẻ úp: Take It Easy hồi thẻ và item, xét thả tù.</li><li>Rút 1; discard xuống 5.</li></ol></div></div><div className="knaves-table-scroll"><table><caption>7 item actions · lật một item ngửa, dùng một action</caption><thead><tr><th>Item</th><th>Action</th><th>Tác dụng</th></tr></thead><tbody>{items.map(([item,action,text])=><tr key={item}><th>{item}</th><td>{action}</td><td>{text}</td></tr>)}</tbody></table></div><div className="knaves-table-scroll"><table><caption>12 Captain · chỉ năng lực Acting Captain có hiệu lực</caption><thead><tr><th>Captain</th><th>Item setup</th><th>Năng lực</th></tr></thead><tbody>{captains.map(([name,start,text])=><tr key={name}><th>{name}</th><td>{start}</td><td>{text}</td></tr>)}</tbody></table></div><p>Setup: chọn 3 Captain, mỗi người cùng 1 Skunk tại một forest riêng; 6 item ngửa trong Stash; 8 Acclaim, mỗi ô track 2 token. Không dùng cùng Vagabond.</p><a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 18 & Appendix K</a><p className="knaves-note">Diễn giải tiếng Việt theo Law of Root và Appendix K. Artwork phe có sẵn từ Leder Games / Kyle Ferrin. Các mô hình minh họa từng luật, không mô phỏng toàn bộ trận. Luật card, map, hireling và setup riêng vẫn áp dụng.</p></section>
<section id="knaves-faq" className="knaves-faq"><span className="eyebrow">GỠ NHỮNG CHỖ DỄ NHẦM</span><h2>Hỏi nhanh tại bàn</h2>{faqs.map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section></RuleBook>;
}
