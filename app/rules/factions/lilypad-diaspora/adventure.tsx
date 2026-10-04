"use client";

import { useState } from "react";
import RuleBook from "../../rule-book";
import { law, topics, faqs } from "./story";
import { SceneLab } from "./labs";
import "../../adventure.css";
import "./frog.css";

function TopicExample({ id }: { id: string }) {
  const [reset, setReset] = useState(0);
  return (
    <div className="frog-worktable">
      <SceneLab key={reset} id={id} />
      <button type="button" onClick={() => setReset(value => value + 1)}>Đặt lại ví dụ</button>
      <p className="frog-model-label">Ví dụ độc lập cho từng mục; không mô phỏng toàn bộ trận.</p>
    </div>
  );
}

export default function FrogAdventure() {
  return (
    <RuleBook
      id="lilypad-diaspora"
      name="Cộng đồng Ếch lưu tán"
      subtitle="LILYPAD DIASPORA · LUẬT VÀ VÍ DỤ"
      description="Tra cứu chuẩn bị, enclave, đổi chất clearing, từng giai đoạn lượt chơi và tương tác với các phe. Tất cả luật hiển thị trên một trang."
      portrait="/assets/lilypad-diaspora-portrait.webp"
      law={law}
      topics={topics}
      renderExample={topic => <TopicExample id={topic.id} />}
    >
      <nav className="frog-jump" aria-label="Tra cứu bổ sung"><a href="#frog-reference">Tờ nhắc tại bàn</a><a href="#frog-faq">Luật dễ nhầm</a></nav>
      <section id="frog-reference" className="frog-reference"><span className="eyebrow">TRA NHANH KHI CHƠI</span><h2>Một lượt Cộng đồng Ếch lưu tán</h2><div className="frog-reference-grid"><div><h3>Birdsong</h3><ol><li>Craft bằng enclave.</li><li>Chọn Rally: 1 quân mỗi Militant; HOẶC Reconcile: lật Militant tùy ý, người rule rút 1 mỗi lần.</li></ol></div><div><h3>Daylight</h3><p>Tối đa 3 action, phối hợp và lặp Settle / Provoke.</p><ul><li>Settle: Move vào một đích từ mỗi nơi kề tối đa một lần, rồi Battle HOẶC đặt Peaceful nếu rule và chưa có enclave.</li><li>Provoke: lật Peaceful hoặc đặt Militant mới hợp lệ, thêm 1 quân mỗi Militant, discard ngẫu nhiên 1 lá nếu có.</li></ul></div><div><h3>Evening</h3><ol><li>Retaliate ở Militant.</li><li>Integrate tối đa 1 lần: spend 1 lá, ghi 1 VP mỗi Peaceful matching chất gốc đã chọn.</li><li>Rút theo tổng Peaceful; discard xuống 5.</li></ol></div></div><div className="frog-table-scroll"><table><caption>Hai mặt enclave</caption><thead><tr><th>Mặt</th><th>Chất clearing</th><th>Quân</th><th>Điểm / bài</th></tr></thead><tbody><tr><th>Peaceful</th><td>Chất gốc + Frog</td><td>Không tuyển qua Rally</td><td>Integrate theo chất gốc; tăng tổng Peaceful để rút</td></tr><tr><th>Militant</th><td>Chỉ Frog</td><td>Rally/Provoke đặt quân</td><td>Không tính Integrate hoặc bonus rút; bắt Retaliate khi battle được</td></tr></tbody></table></div><div className="frog-table-scroll"><table><caption>Bài rút Evening</caption><thead><tr><th>Tổng Peaceful</th><th>0–1</th><th>2–3</th><th>4–7</th><th>8–12</th></tr></thead><tbody><tr><th>Số lá rút</th><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table></div><div className="frog-result">Không Integrate chất Frog · không ghi nhiều chất cùng lượt.<br/>Pond: chỉ lá đầu mỗi đợt rút được lấy trên cùng ao.</div><p>Fears Come to Pass: enemy tấn công Peaceful đang defending, hoặc remove Peaceful ngoài battle → lật các Peaceful còn lại có pieces của phe ấy, đặt 1 quân mỗi nơi vừa lật.</p><p>Negotiations: mỗi enemy tối đa 1 lần trong lượt họ, cần faction piece ở Militant. Nếu người khác rule, give họ 1 lá bất kỳ để lật Peaceful; tự rule hoặc không ai rule thì không trả.</p><a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 16: Lilypad Diaspora</a><p className="frog-note">Diễn giải tiếng Việt theo Law of Root, phần 16, đối chiếu Rules Library của Leder Games. Peaceful = Hòa bình; Militant = Chủ chiến; Enclave = khu cộng đồng. Tên Anh giữ để đối chiếu bảng phe. Artwork có sẵn từ Leder Games / Kyle Ferrin. Mô hình minh họa từng luật, không mô phỏng toàn bộ trận; luật card, map, hireling và setup riêng vẫn áp dụng.</p></section>
<section id="frog-faq" className="frog-faq"><span className="eyebrow">GỠ NHỮNG CHỖ DỄ NHẦM</span><h2>Hỏi nhanh tại bàn</h2>{faqs.map(([q,a])=><article key={q}><h3>{q}</h3><p>{a}</p></article>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section>
    </RuleBook>
  );
}
