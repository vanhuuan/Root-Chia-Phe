"use client";
import { useState } from "react";
import RuleBook from "../../rule-book";
import { law, topics, faqs } from "./story";
import { SceneLab } from "./labs";
import "../../adventure.css";
import "./council.css";

function TopicExample({ id }: { id: string }) {
  const [reset, setReset] = useState(0);
  return <div className="council-worktable">
    <SceneLab id={id} key={reset} />
    <button type="button" onClick={() => setReset(value => value + 1)}>Đặt lại ví dụ</button>
    <p className="council-model-label">Ví dụ độc lập cho từng mục; thay đổi ở đây không ảnh hưởng mục khác. Các mô hình chỉ minh họa luật đang học, không mô phỏng toàn bộ trận.</p>
  </div>;
}

export default function CouncilAdventure() {
  return (
    <RuleBook
      id="council"
      name="Hội đồng Hoàng hôn"
      subtitle="TWILIGHT COUNCIL · LUẬT PHE"
      description="Tra cứu chuẩn bị, bài reveal, assembly, Loyalists và thứ tự lượt. Toàn bộ luật và ví dụ nằm trên một trang; mục cuối là mẹo chơi, không phải luật chính thức."
      portrait="/assets/twilight-council-portrait.webp"
      law={law}
      topics={topics}
      renderExample={topic => <TopicExample id={topic.id} />}
    >
      <nav className="council-jump" aria-label="Tra cứu bổ sung"><a href="#council-reference">Tờ nhắc tại bàn</a><a href="#council-faq">Luật dễ nhầm</a></nav>
      <section id="council-reference" className="council-reference"><span className="eyebrow">TRA NHANH KHI CHƠI</span><h2>Một lượt Hội đồng Hoàng hôn</h2><div className="council-reference-grid"><div><h3>Birdsong</h3><p>Mỗi lá reveal cho một action matching.</p><ul><li>Move từ clearing matching.</li><li>Recruit 1 warrior nguồn.</li><li>Assemble Closed + Loyalists; không rule sau placement thì discard lá.</li><li>Battle; có assembly tại đó thì discard lá.</li></ul></div><div><h3>Daylight</h3><p>Sleep: đóng assemblies do enemy rule. Không tự đóng nơi hòa hoặc không ai rule.</p><h3>Convene đầu Evening</h3><ul><li>Non-bird vừa trả: Banish hoặc spend Agitate.</li><li>Chim vừa trả: Empower.</li><li>Mỗi lá một action hoặc bỏ qua.</li></ul></div><div><h3>Evening · đúng thứ tự</h3><ol><li>Convene: trả từng lá và làm action.</li><li>Inspire: craft; không craft thì rút bonus track.</li><li>Adjourn: remove assemblies tùy ý, mở những nơi bạn rule.</li><li>Oversee: bảng điểm bên dưới.</li><li>Draw 1; discard xuống 5.</li></ol></div></div><div className="council-table-scroll"><table><caption>Convene Woodfolk · action theo lá vừa trả</caption><thead><tr><th>Action</th><th>Loại lá</th><th>Tác dụng</th><th>Lá sau action</th></tr></thead><tbody><tr><th>Banish</th><td>Non-bird</td><td>Battle tại assembly matching; đẩy warrior bị hit sang một đích hợp lệ, không hit building/token. Bỏ rolled hits nhận, không bỏ ambush/extra hits.</td><td>Giữ trên tay</td></tr><tr><th>Agitate</th><td>Non-bird</td><td>Assembly matching: thêm 1 Loyalist, lật Governing nếu Closed. Không cần rule.</td><td>Spend chính lá</td></tr><tr><th>Empower</th><td>Chim</td><td>Chọn assembly, lăn 1 die remove Dơi, chọn giữ quân vào Loyalists hoặc 1 VP nếu còn rule sau remove.</td><td>Giữ trên tay</td></tr></tbody></table></div><div className="council-table-scroll"><table><caption>Oversee · Governing cùng clearing với enemy building/token</caption><thead><tr><th>Số assembly đủ điều kiện</th><th>0</th><th>1</th><th>2–3</th><th>4</th><th>5–6</th></tr></thead><tbody><tr><th>VP</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table></div><div className="council-result">Governors không cấm Move/Battle; chặn crafting và thao tác pieces ngoài battle.<br/>Entreat không cần presence hoặc bài; Hội đồng không được từ chối đóng lều.</div><p>Peacekeepers áp dụng khi hai enemy battle tại assembly, cả hai mặt: Dơi hỗ trợ defender và nhận hits sau quân defender gốc. Bỏ qua nếu Lãng khách defending; có ngoại lệ Lãng khách Allied với Hội đồng khi tấn công.</p><a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 17: Twilight Council</a><p className="council-note">Diễn giải tiếng Việt theo Law of Root, phần 17 và danh mục components của Leder Games. Assembly = hội nghị; Closed = Đóng; Governing = Điều hành; Loyalists = người trung thành. Giữ tên action Anh để đối chiếu bảng phe. Artwork có sẵn từ Leder Games / Kyle Ferrin. Mô hình minh họa từng luật, không mô phỏng toàn bộ trận; card, map, hireling và setup riêng vẫn áp dụng.</p></section>
<section id="council-faq" className="council-faq"><span className="eyebrow">GỠ NHỮNG CHỖ DỄ NHẦM</span><h2>Hỏi nhanh tại bàn</h2>{faqs.map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section>
    </RuleBook>
  );
}
