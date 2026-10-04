"use client";

import RuleBook from "../../rule-book";
import { law, topics, faqs } from "./story";
import { SceneLab } from "./labs";
import "../../adventure.css";
import "./lizard.css";

export default function LizardAdventure() {
  return <div className="lizard-adventure"><RuleBook
    id="lizard"
    name="Giáo phái Thằn Lằn — Lizard Cult"
    subtitle="LUẬT PHE"
    description="Tra cứu setup, vườn, Lost Souls, Outcast, tín đồ, nghi lễ và thứ tự lượt. Các ví dụ tương tác độc lập minh họa từng luật."
    portrait="/assets/lizard-cult-portrait.webp"
    law={law}
    topics={topics}
    renderExample={topic => <div className="lizard-worktable"><SceneLab id={topic.id}/><p className="lizard-model-label">Ví dụ học luật độc lập; không mô phỏng toàn bộ trận.</p></div>}
  >
    <section id="lizard-reference" className="lizard-reference">
      <h2>Thứ tự một lượt</h2>
      <div className="lizard-reference-grid">
        <div><h3>Birdsong — Bình minh</h3><ol><li>Chỉnh Outcast từ Lost Souls; bỏ qua Chim.</li><li>Dọn Lost Souls sang discard.</li><li>Trả tín đồ để làm conspiracies.</li></ol></div>
        <div><h3>Daylight — Ban ngày</h3><ul><li>Reveal đúng chất: Build hoặc Recruit.</li><li>Score: spend lá reveal, tối đa một lần mỗi chất.</li><li>Reveal Chim: Sacrifice từ nguồn.</li></ul></div>
        <div><h3>Evening — Buổi tối</h3><ol><li>Lấy các lá reveal còn lại về tay.</li><li>Craft bằng vườn có chất in matching Outcast.</li><li>Rút 1 cộng bonus đang lộ; discard xuống 5.</li></ol></div>
      </div>
      <div className="lizard-table-scroll"><table><caption>Chi phí Tín đồ cho mỗi conspiracy</caption><thead><tr><th>Conspiracy</th><th>Outcast</th><th>Hated</th><th>Tác dụng</th></tr></thead><tbody>
        <tr><th>Crusade</th><td>2</td><td>1</td><td>Battle tại Outcast hoặc Move từ Outcast, rồi tùy chọn Battle tại đích.</td></tr>
        <tr><th>Convert</th><td>2</td><td>1</td><td>Thay 1 chiến binh địch tại Outcast bằng chiến binh Giáo phái.</td></tr>
        <tr><th>Sanctify</th><td>3</td><td>2</td><td>Thay 1 building địch tại Outcast bằng vườn chất Outcast.</td></tr>
      </tbody></table></div>
      <p>Convert và Sanctify cần thay thế được đầy đủ. Crusade vẫn theo luật Move và Battle. Không có hành động Move hoặc Battle mặc định ở Daylight.</p>
      <a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 10: Lizard Cult</a>
      <p className="lizard-note">Diễn giải tiếng Việt theo Law of Root, phần 10. Artwork phe có sẵn từ Leder Games / Kyle Ferrin. Luật bài, map và setup riêng vẫn áp dụng; các mô hình chỉ minh họa từng luật.</p>
    </section>
    <section id="lizard-faq" className="lizard-faq"><h2>Luật dễ nhầm</h2>{faqs.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section>
  </RuleBook></div>;
}
