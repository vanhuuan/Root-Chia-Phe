import RuleBook from "../../rule-book";
import {law,topics,faqs,moods} from "./story";
import {SceneLab} from "./labs";
import "../../adventure.css";
import "./hundreds.css";

export default function HundredsAdventure(){
return <div className="hundreds-adventure"><RuleBook
  id="hundreds"
  name="Lãnh chúa Bầy Chuột"
  subtitle="LORD OF THE HUNDREDS · LUẬT PHE"
  description="Thiết lập, Warlord, Stronghold, Mob, Hoard và thứ tự lượt. Đọc toàn bộ luật trên một trang; mỗi ví dụ tương tác có trạng thái và nút đặt lại riêng."
  portrait="/assets/lord-of-the-hundreds-portrait.webp"
  law={law}
  topics={topics}
  renderExample={topic=><div className="hundreds-worktable"><SceneLab id={topic.id}/></div>}
>
<div className="hundreds-jump"><a href="#hundreds-reference">Tờ nhắc tại bàn</a><a href="#hundreds-faq">Luật dễ nhầm</a></div>
<section id="hundreds-reference" className="hundreds-reference"><span className="eyebrow">TRA NHANH KHI CHƠI</span><h2>Một lượt Lãnh chúa Bầy Chuột</h2><div className="hundreds-reference-grid"><div><h3>Birdsong</h3><ol><li>Raze Mob cũ, rồi lăn Mob die lan một lần.</li><li>Recruit: Prowess tại Warlord + 1 quân mỗi Stronghold.</li><li>Anoint nếu Warlord vắng map.</li><li>Đổi Mood hợp lệ; Lavish xét cuối Birdsong.</li></ol></div><div><h3>Daylight</h3><ol><li>Craft bằng Stronghold.</li><li>Command: tối đa Command lần Move / Battle / Build.</li><li>Advance: tối đa Prowess lần Move Warlord rồi Battle, mỗi phần tùy chọn.</li></ol><p>Grandiose đảo bước Command và Advance.</p></div><div><h3>Evening</h3><ol><li>Incite: spend card matching, cần warrior tại clearing chưa Mob.</li><li>Oppress các nơi rule + piece Chuột + sạch enemy.</li><li>Rút 1, Rowdy có bonus; discard xuống 5.</li></ol></div></div><div className="hundreds-table-scroll"><table><caption>Hoard tăng hai track độc lập</caption><thead><tr><th>Track</th><th>Item</th><th>0 / 1 / 2 / 3 / 4 item</th></tr></thead><tbody><tr><th>Command</th><td>Boot · Bag · Coin</td><td>1 / 2 / 2 / 3 / 4 action</td></tr><tr><th>Prowess</th><td>Hammer · Tea · Sword · Crossbow</td><td>1 / 2 / 2 / 3 / 4 Recruit & Advance</td></tr></tbody></table><p>Track đúng đầy: bỏ item mới hoặc một item trên track đó, nhận 1 VP. Item mới ở ô trống ngoài cùng trái; không chuyển sai track.</p></div><div className="hundreds-table-scroll"><table><caption>Oppress · đếm clearing đủ cả ba điều kiện</caption><thead><tr><th>Số clearing</th><th>0</th><th>1–2</th><th>3–4</th><th>5</th><th>6+</th></tr></thead><tbody><tr><th>VP</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table></div><div className="hundreds-table-scroll"><table><caption>8 Mood · icon là loại item khóa lựa chọn</caption><thead><tr><th>Mood</th><th>Bị khóa bởi</th><th>Năng lực</th></tr></thead><tbody>{moods.map(([name,item,text])=><tr key={name}><th>{name}</th><td>{item}</td><td>{text}</td></tr>)}</tbody></table></div><p>Phải chọn Mood khác Mood hiện tại, không có item tương ứng trong Hoard. Ngoại lệ: đang Lavish và không có Mood mới hợp lệ thì giữ Lavish.</p><a href={law} target="_blank" rel="noreferrer">Luật chính thức Leder Games · phần 14: Lord of the Hundreds</a><p className="hundreds-note">Diễn giải tiếng Việt theo Law of Root, phần 14. Sơ đồ clearing là bản đồ luyện luật, không thay thế map thật. Artwork phe và icon suit có sẵn từ Leder Games / Kyle Ferrin. Các ví dụ là bài tập độc lập; hiệu ứng card, map, hireling và setup riêng vẫn áp dụng.</p></section>
<section id="hundreds-faq" className="hundreds-faq"><span className="eyebrow">GỠ NHỮNG CHỖ DỄ NHẦM</span><h2>Hỏi nhanh tại bàn</h2>{faqs.map(([q,a])=><article key={q}><h3>{q}</h3><p>{a}</p></article>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section>
</RuleBook></div>;
}
