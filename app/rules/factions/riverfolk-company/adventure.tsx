"use client";
import RuleBook, { type RuleTopic } from "../../rule-book";
import {law,topics,faqs} from "./story";
import {LedgerLab,BuyerLab,HandLab,BoatLab,MercLab,PostLab,CraftLab,DisruptionLab,Result,Note} from "./labs";
import "../../adventure.css";
import "./riverfolk.css";

function Example({topic}:{topic:RuleTopic}) {
  return <div className="riverfolk-worktable">
{topic.id==="setup"?<><div className="riverfolk-setup"><img src="/assets/riverfolk-company-portrait.webp" alt="Công ty Rái cá"/><div><h3>Standard: 15 warrior, 9 trade post</h3><p>4 warrior phân bố tại clearing chạm sông.<br/>3 warrior Rái cá trong Payments.<br/>8 warrior còn lại trong nguồn.</p><b>Đặt giá ba dịch vụ trước khi chơi</b></div></div><Result>Payments chưa phải Funds. Gather ở Birdsong đầu tiên mới mở ngân quỹ.</Result><Note>9 post trên track matching. Setup bài tay theo luật chung; khi dùng ADSET, theo thẻ setup riêng.</Note></>:
topic.id==="funds"||topic.id==="birdsong"||topic.id==="actions"?<LedgerLab/>:
topic.id==="buy"?<BuyerLab/>:
topic.id==="hand"||topic.id==="cards"?<HandLab/>:
topic.id==="boats"?<BoatLab/>:
topic.id==="merc"||topic.id==="hits"?<MercLab/>:
topic.id==="posts"?<PostLab/>:
topic.id==="craft"||topic.id==="export"?<CraftLab exportMode={topic.id==="export"}/>:
topic.id==="disruption"?<DisruptionLab/>:
topic.id==="recruit"?<><h3>Một fund → một quân ven sông</h3><ol className="riverfolk-turn"><li><b>Chọn clearing có sông</b><span>Không cần rule hoặc quân Rái cá có sẵn; kiểm tra hạn chế place.</span></li><li><b>Spend 1 Fund</b><span>Trả warrior đó về nguồn đúng chủ sở hữu.</span></li><li><b>Đặt 1 warrior Rái cá</b><span>Lấy từ nguồn Rái cá thực tế. Quân của khách không trở thành quân Rái cá.</span></li></ol><Result>Recruit tiêu vốn vĩnh viễn; Move và Battle chỉ commit vốn.</Result></>:
<><h3>Evening: bỏ bài và đặt giá</h3><ol className="riverfolk-turn"><li><b>Discard xuống 5 lá</b><span>Tay công khai vẫn có giới hạn. Không có bước rút mặc định.</span></li><li><b>Đặt lại ba giá dịch vụ</b><span>Hand Card · Riverboats · Mercenaries.</span></li><li><b>Khách mua đầu Birdsong của họ</b><span>Quân nguồn vào Payments, chờ Birdsong của Rái cá.</span></li></ol><Result>Muốn rút bài: Daylight Draw, commit 1 fund mỗi lá.</Result></>}

<Note>Các ví dụ độc lập, không lưu trạng thái trận đấu.</Note>
</div>;
}

export default function RiverfolkAdventure() {
return <RuleBook id="riverfolk" name="Công ty Rái cá" subtitle="RIVERFOLK COMPANY · LUẬT PHE"
description="Tra cứu thiết lập, dịch vụ, Funds và thứ tự lượt. Tất cả luật và ví dụ đều hiển thị trên cùng một trang."
portrait="/assets/riverfolk-company-portrait.webp" law={law} topics={topics}
renderExample={topic=><Example topic={topic}/>}>
<section id="riverfolk-reference" className="riverfolk-reference" aria-labelledby="riverfolk-reference-title"><span className="eyebrow">TRA NHANH KHI CHƠI</span><h2 id="riverfolk-reference-title">Một lượt Công ty Rái cá</h2><div className="riverfolk-reference-grid"><div><h3>Birdsong · đúng thứ tự</h3><ol><li><b>Protectionism:</b> Payments trống → đặt 2 quân Rái cá từ nguồn.</li><li><b>Dividends:</b> có post trên map → mỗi 2 Funds ghi 1 VP.</li><li><b>Gather:</b> mọi warrior trên bảng phe → Funds.</li></ol></div><div><h3>Daylight · tùy thứ tự</h3><ul><li><b>Commit 1:</b> Move / Battle / Draw.</li><li><b>Craft:</b> commit lên ô track theo cost.</li><li><b>Spend 1:</b> Recruit ven sông.</li><li><b>Spend 2 đúng chủ:</b> post + garrison, ghi VP ô mở.</li></ul></div><div><h3>Evening</h3><ol><li>Discard bài tay xuống 5.</li><li>Chỉnh từng giá dịch vụ trên track.</li></ol><p>Không tự rút bài, không tự ghi VP theo post.</p></div></div><div className="riverfolk-table-scroll"><table><caption>Ba dịch vụ · mua đầu Birdsong của khách</caption><thead><tr><th>Dịch vụ</th><th>Khách nhận</th><th>Giới hạn cần nhớ</th></tr></thead><tbody>{[["Hand Card","Chọn 1 lá tay ngửa Rái cá, đưa vào tay khách","Có thể mua nhiều lần trong giới hạn lượt mua"],["Riverboats","Sông là đường đến hết lượt khách","Vẫn cần rule khi Move; không được Swimmers"],["Mercenaries","Warrior Rái cá tính cho rule và battle trong Daylight/Evening","Không move, không dominance, không battle Rái cá; Lãng khách không mua"]].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></div><Result>Số lần mua: 1 + số clearing có cả trade post và piece phe khách.<br/>Trả giá từng lần bằng warrior nguồn → Payments. Lãng khách exhaust item theo giá.</Result><a href={law} target="_blank" rel="noreferrer">Luật chính thức · phần 11: Riverfolk Company</a><Note>Diễn giải tiếng Việt theo Law of Root 13/10/2025, trang 12–13. Artwork phe và thẻ Sword từ Leder Games / Kyle Ferrin. Các box và số trong mô hình là ví dụ; đọc cost, VP và slot từ bảng phe thật. Luật card, map và hireling cụ thể vẫn áp dụng.</Note></section>
<section id="riverfolk-faq" className="riverfolk-faq" aria-labelledby="riverfolk-faq-title"><span className="eyebrow">GỠ NHỮNG CHỖ DỄ NHẦM</span><h2 id="riverfolk-faq-title">Hỏi nhanh tại bàn</h2>{faqs.map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}<a href="/rules" className="rules-nav-link">Ôn lại luật cơ bản</a></section></RuleBook>;
}
