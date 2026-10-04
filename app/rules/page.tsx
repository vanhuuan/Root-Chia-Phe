import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./rules.css";
import Adventure from "./adventure";
import FactionGuides from "./faction-guides";

const law = "https://rules.ledergames.com/?product=root&locale=en-US";
const resources = "https://ledergames.com/pages/resources/";
const lawPdf = "https://cdn.shopify.com/s/files/1/0106/0162/7706/files/Root_Base_Law_Oct_2025.pdf?v=1774903756";
export const metadata: Metadata = {
  title: "Luật cơ bản • Root",
  description: "Luật chung của Root trên một trang: setup, clearing, rule, di chuyển, chiến đấu, craft và chiến thắng. Có ví dụ tương tác và dẫn chiếu luật chính thức.",
  openGraph: { title: "Luật cơ bản của Root", description: "Tra luật tiếng Việt trên một trang với ví dụ tương tác.", url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/rules` },
};
const chapters = [
  ["welcome", "Mục tiêu"], ["setup", "Chuẩn bị"], ["map", "Clearing và đường nối"],
  ["cards", "Bài và suit"], ["turn", "Thứ tự lượt"], ["rule", "Quyền kiểm soát"],
  ["move", "Di chuyển"], ["battle", "Chiến đấu"], ["craft", "Craft"],
  ["victory", "Chiến thắng và Dominance"], ["golden", "Luật ưu tiên"], ["reference", "Tra luật tại bàn"],
];
function Chapter({id,number,title,refs,children}:{id:string;number:string;title:string;refs:string;children:ReactNode}) {
  return <section id={id} className="rule-chapter"><div className="rule-chapter-heading"><span>{number}</span><h2>{title}</h2></div>{children}<a className="rule-source" href={law} target="_blank" rel="noreferrer">Tra Law of Root · {refs}</a></section>;
}
function Remember({children}:{children:ReactNode}) { return <aside className="rule-remember"><b>Luật cần nhớ</b>{children}</aside>; }
function Example({children}:{children:ReactNode}) { return <div className="rule-example"><b>Ví dụ áp dụng</b>{children}</div>; }

export default function RulesPage() {
  return <main className="rules-page"><header className="topbar"><Link className="brand" href="/"><b>ROOT <i>•</i></b><span>CHIA PHE</span></Link><Link className="rules-nav-link" href="/">Về bàn chia phe</Link></header>
    <FactionGuides />
    <Adventure />
    <section id="full-rules" className="full-rules-container"><div className="rules-layout"><nav className="rules-toc" aria-label="Mục lục luật chi tiết"><span className="eyebrow">TRA LUẬT CHI TIẾT</span>{chapters.map(([id,title],i)=><a key={id} href={`#${id}`}><small>{String(i+1).padStart(2,"0")}</small>{title}</a>)}<a href={law} target="_blank" rel="noreferrer" className="rules-official">Mở luật chính thức</a></nav>
    <article className="rules-story"><header className="rules-intro"><span className="eyebrow">LUẬT CƠ BẢN · ROOT</span><h2>Quy định và ngoại lệ</h2><p>Tra điều kiện hành động, thứ tự giải quyết và các ngoại lệ dưới đây.</p><div className="rules-scope">Đây là hướng dẫn luật chung bằng tiếng Việt, kèm ví dụ giả định không dùng năng lực riêng của phe. Để chơi một phe cụ thể, đọc thêm bảng phe và phần luật của phe đó. Khi có ngoại lệ, dùng Law of Root làm căn cứ.</div></header>

    <Chapter id="welcome" number="01" title="Mục tiêu trò chơi" refs="§3.1–3.2">
      <p>Mỗi phe có cách kiếm điểm riêng. Số quân hay clearing kiểm soát không tự quyết định người thắng.</p>
      <Remember><p><strong>Người đầu tiên đạt 30 điểm chiến thắng thắng ngay</strong>, kể cả khi chưa hết lượt. Không chờ hết vòng và không cần tiêu diệt các phe khác.</p><p>Hai nguồn điểm chung là loại bỏ building/token của đối thủ: <strong>1 điểm mỗi quân loại đó</strong>, và craft item: nhận số điểm trên lá bài, trừ khi luật riêng thay đổi. Loại bỏ warrior thường không cho điểm.</p></Remember>
      <p>Chiếm nhiều clearing giúp bạn làm việc dễ hơn, nhưng tự nó không sinh điểm nếu không có luật hay hiệu ứng nói vậy.</p>
    </Chapter>

    <Chapter id="setup" number="02" title="Chuẩn bị bàn chơi" refs="§5.1; phụ lục A, M">
      <p>Chuẩn bị thành phần chung trước, rồi setup từng phe theo hướng dẫn tương ứng.</p>
      <ol><li><strong>Chọn map và một bộ bài chung.</strong> Map biến thể cần làm phần setup riêng trước. Nếu chơi với suit ngẫu nhiên, xáo 12 marker gồm 4 Cáo, 4 Thỏ, 4 Chuột rồi đặt theo hướng dẫn map.</li><li><strong>Chọn người đi trước và thứ tự ngồi.</strong> Đặt marker điểm của mỗi phe ở 0.</li><li><strong>Chuẩn bị bài.</strong> Trong Standard Setup, xáo bộ bài và chia mỗi người 3 lá. Bàn 2 người bỏ cả 4 lá Dominance trước khi xáo.</li><li><strong>Đặt ruin, item và xúc xắc.</strong> Ruin lấp các slot R theo hướng dẫn map. Nguồn item chung có 2 giày, 2 túi, 1 nỏ, 1 búa, 2 kiếm, 2 trà và 2 đồng xu. Đặt 2 xúc xắc chiến đấu gần bàn.</li><li><strong>Setup từng phe.</strong> Làm đúng thứ tự và số quân/building/token trên hướng dẫn setup; không tự chia quân giống nhau cho mọi phe.</li></ol>
      <Remember><p><strong>Standard và Advanced Setup là hai cách chuẩn bị khác nhau.</strong> Nhóm mới nên bắt đầu bằng Standard. Nếu chọn Advanced Setup (ADSET), làm toàn bộ phụ lục A và thẻ setup: rút 5 lá rồi cuối setup giữ 3, draft phe và đặt homeland theo yêu cầu. Đừng trộn quy trình của hai cách.</p><p>Marsh, Lake, Mountain và các map khác có thay đổi riêng; ví dụ Marsh dưới 5 người cần flood marker, còn từ 5 người dùng ba landmark. Luật map quyết định vị trí còn tồn tại, ruin và đường đi.</p></Remember>
    </Chapter>

    <Chapter id="map" number="03" title="Clearing, đường nối và forest" refs="§2.2–2.4; Glossary">
      <p><strong>Clearing</strong> là khu vực đặt quân và công trình, thường mang suit Cáo, Thỏ hoặc Chuột. Suit thuộc clearing, không phụ thuộc phe đang có mặt.</p>
      <div className="rules-suits"><span>🦊 Cáo · Fox</span><span>🐰 Thỏ · Rabbit</span><span>🐭 Chuột · Mouse</span></div>
      <p>Đường in nối hai làng khiến chúng <strong>adjacent</strong> với nhau. Hai làng nhìn gần nhau nhưng không có đường nối thì chưa chắc kề nhau. Dòng sông không mặc định là đường; chỉ dùng nó để move khi một luật cho phép. Khoảng cây giữa đường và clearing là forest: di chuyển thông thường không cho quân tự bước vào đó.</p>
      <div className="rule-table-wrap"><table><thead><tr><th>Thứ trên bàn</th><th>Vai trò trong luật chung</th></tr></thead><tbody><tr><td>Warrior · quân</td><td>Tính rule, di chuyển và giao chiến theo luật.</td></tr><tr><td>Building · công trình vuông</td><td>Chiếm một slot trống màu trắng; tính rule.</td></tr><tr><td>Token · miếng tròn</td><td>Không chiếm slot và không tính rule; có tác dụng riêng.</td></tr><tr><td>Pawn · quân đại diện đặc biệt</td><td>Không phải warrior, không tính rule; dùng luật riêng.</td></tr><tr><td>Ruin · phế tích</td><td>Lấp slot R. Chỉ bị loại bỏ khi luật cụ thể cho phép.</td></tr><tr><td>Item · vật phẩm</td><td>Không phải faction piece; không dùng như quân/building/token.</td></tr></tbody></table></div>
      <Remember><p>Muốn đặt building phải có <strong>slot trống</strong>, cùng các điều kiện của hành động. Bạn không thể tự phá ruin hay xây đè lên một công trình. Clearing có thể chứa quân của nhiều phe cùng lúc.</p></Remember>
    </Chapter>

    <Chapter id="cards" number="04" title="Bài, suit và matching" refs="§2.1; §4.1; §3.3; Glossary">
      <p>Bài có thể trả cho hành động hoặc dùng để craft. Giữ bài trên tay không tự kích hoạt hiệu ứng craft.</p>
      <Remember><p>Suit ở đầu lá bài dùng khi luật yêu cầu một lá “matching”. <strong>Bài Chim thường là wild</strong>: có thể thay Cáo, Thỏ hoặc Chuột. Chiều ngược lại không được — yêu cầu Chim thì không trả bằng Cáo. Ngoại lệ trên luật phe/thẻ vẫn áp dụng; nếu bị buộc bỏ/đưa bài của suit không phải Chim, phải tính bài Chim như suit được yêu cầu.</p><p><strong>Spend/discard</strong> thường đưa bài vào chồng bỏ chung; <strong>reveal</strong> chỉ lộ bài và làm theo chỉ dẫn, không tự bỏ bài. Bài trong play area hay chồng riêng không còn là bài trên tay để tùy ý tiêu.</p></Remember>
      <Example><p>Hành động yêu cầu một lá matching clearing Thỏ: bạn có thể trả Thỏ hoặc Chim theo luật chung. Nhưng muốn craft một lá có chi phí 2 biểu tượng Chuột, bạn cần <em>hai crafting piece phù hợp</em>, không phải bỏ hai lá Chuột.</p></Example>
      <p>Ambush và Dominance là hai loại đặc biệt, <strong>không craft được</strong>. Ngay khi bộ bài chung hết, xáo chồng bỏ thành bộ mới. Bài và quân đã lộ trên bàn có thể kiểm tra; không tự xem bài trên tay hoặc đồ úp bí mật của đối thủ.</p>
    </Chapter>

    <Chapter id="turn" number="05" title="Thứ tự lượt" refs="§1.4; phần lượt trên bảng phe">
      <p>Mỗi lượt gồm ba pha theo thứ tự Birdsong → Daylight → Evening. Hoàn thành lượt rồi chuyển sang người tiếp theo theo chiều kim đồng hồ.</p>
      <div className="rule-phases"><div><span>01 · BIRDSONG</span><h3>Bình minh</h3><p>Làm các bước đầu ngày trên bảng phe, từ trên xuống dưới.</p></div><div><span>02 · DAYLIGHT</span><h3>Ban ngày</h3><p>Thực hiện các bước và hành động mà phe cho phép, trả đúng chi phí.</p></div><div><span>03 · EVENING</span><h3>Buổi tối</h3><p>Làm các bước cuối ngày, rút/bỏ bài hoặc tính điểm theo hướng dẫn phe.</p></div></div>
      <Remember><p><strong>Root không có số hành động chung cho mọi phe.</strong> Không phải ai cũng có 3 hành động, craft ở cùng một pha hoặc rút cùng số bài. Bảng phe cho biết khi nào và bao nhiêu lần bạn được move, battle, craft, recruit hay build.</p><p>Hiệu ứng “đầu pha” diễn ra trước các việc khác của pha; “cuối pha” diễn ra sau chúng. Khi bước Draw and Discard của phe yêu cầu giới hạn tay 5 lá, bỏ xuống 5 tại bước đó — không tự bỏ ngay giữa lượt chỉ vì vừa có lá thứ sáu.</p></Remember>
      <p>Làm trọn một hành động/hiệu ứng trước khi bắt đầu việc khác, trừ khi có quyền ngắt rõ ràng như Ambush. Chuyển sang pha hoặc bước kế tiếp rồi thì không quay lại bước trước để làm thêm.</p>
    </Chapter>

    <Chapter id="rule" number="06" title="Rule: quyền kiểm soát clearing" refs="§2.5">
      <p>Quyền kiểm soát clearing dựa trên tổng <strong>warrior + building</strong> của từng phe.</p>
      <Remember><p>Bạn <strong>rule</strong> clearing nếu tổng warrior và building của bạn lớn hơn tổng của <em>từng đối thủ</em> ở đó. Không cộng tất cả đối thủ thành một đội. Token và pawn không góp vào tổng. Nếu hòa cao nhất, không ai rule theo luật chung; clearing trống cũng không ai rule.</p></Remember>
      <Example><p>Phe A có 2 warrior + 1 building = 3. B có 2 warrior, C có 2 warrior: A rule, dù B và C cộng lại là 4. Nếu B thêm 1 building thành 3, A và B hòa nên không ai rule, trừ khi có năng lực ngoại lệ.</p></Example>
      <p>Rule được kiểm tra theo tình hình hiện tại, không phải giữ mãi sau khi từng chiếm làng. Bạn có thể rule dù vẫn có quân địch ở đó. Rule quan trọng cho move và nhiều hành động, nhưng <strong>không phải điều kiện chung để mở battle</strong>.</p>
    </Chapter>

    <Chapter id="move" number="07" title="Move: di chuyển" refs="§4.2">
      <p>Kiểm tra đường nối và quyền kiểm soát trước mỗi move.</p>
      <Remember><p>Một move thông thường chọn <strong>một hoặc nhiều warrior/pawn của bạn từ một clearing</strong>, đưa chúng theo đường nối tới <strong>một clearing kề</strong>. Bạn phải rule clearing xuất phát, clearing đích, hoặc cả hai.</p><p>Không tự mang building/token theo. Không chia một move thành nhiều điểm đến, không nhảy qua clearing giữa và không đi bằng sông/forest nếu chưa có luật cho phép.</p></Remember>
      <Example><p>Bạn rule A, còn B do đối thủ rule: vẫn có thể move A → B. Sau khi đến B, muốn đi B → C là một move khác; kiểm tra rule lại ở B hoặc C. Không cần đánh ngay khi vào B, và quân địch không tự chặn lối vào nếu điều kiện move đã hợp lệ.</p></Example>
      <p>Một quân có thể move nhiều lần trong lượt nếu bạn có đủ các move được phép. “Place” và “move” là hai thao tác khác nhau: quyền đặt quân mới không đồng nghĩa quyền di chuyển, và ngược lại.</p>
    </Chapter>

    <Chapter id="battle" number="08" title="Battle: chiến đấu" refs="§4.3.1–4.3.6">
      <p>Move vào clearing có đối thủ không tự mở battle. Mỗi battle chọn một defender; các phe khác không tự tham chiến theo luật chung.</p>
      <ol className="battle-steps"><li><strong>Chọn clearing và defender.</strong> Bạn phải có warrior hoặc pawn ở clearing đó và chọn một enemy có quân/building/token hợp lệ ở đó. Không cần rule; có thể đánh cả một building/token không được quân bảo vệ.</li><li><strong>Defender có thể Ambush.</strong> Họ chơi tối đa một lá Ambush matching clearing; Chim thường thay được suit. Attacker có thể chơi một Ambush matching để vô hiệu. Nếu không chặn, attacker nhận ngay 2 hit; nếu không còn warrior/pawn tấn công thì battle kết thúc.</li><li><strong>Giải quyết hiệu ứng trước khi gieo.</strong> Dùng các hiệu ứng ghi rõ “before rolling”, nếu có.</li><li><strong>Gieo cả hai xúc xắc 0–3.</strong> Attacker dùng số lớn, defender dùng số nhỏ; hai số bằng nhau thì mỗi bên dùng số đó. Hit từ xúc xắc của mỗi bên tối đa bằng số warrior của bên đó trong clearing.</li><li><strong>Dùng hiệu ứng sau khi gieo, rồi tính hit.</strong> Cộng extra hit và trừ ignored hit. Extra hit không bị giới hạn bởi số warrior. Defender không có warrior thì attacker được +1 hit vì defenseless, theo luật chung.</li><li><strong>Hai bên chịu hit đã tính.</strong> Mỗi hit loại một piece của bên chịu. Chủ quân chọn quân mình mất, nhưng phải mất hết warrior trước khi chọn building/token. Nếu hết piece để chịu, hit dư không lan sang phe khác hay clearing khác.</li></ol>
      <Example><p>A tấn công với 2 warrior. B phòng thủ có 1 warrior + 1 building. Không có Ambush hay hiệu ứng. Xúc xắc ra 3 và 1: A chỉ gây 2 hit vì có 2 warrior, B gây 1. B mất warrior rồi building; A mất 1 warrior và nhận 1 điểm từ building. B vẫn gây hit đã tính dù warrior của B bị loại.</p><p>Nếu B chỉ có một token không có warrior, A có 1 warrior và gieo 0–0: A vẫn gây 1 extra hit nhờ defenseless, loại token và nhận 1 điểm. Defender không có warrior cũng có thể Ambush trước khi gieo!</p></Example>
      <Remember><p>Không có luật chung “thắng battle thì được điểm”, “giết quân được điểm” hay “thua thì rút lui”. Điểm chung đến từ building/token bị loại. Pawn và năng lực riêng có thể thay đổi cách gieo, giới hạn hit hoặc chịu hit; đọc đúng ngoại lệ khi gặp chúng.</p><p>Piece bị loại thường về supply hoặc chỗ tương ứng trên bảng của chủ quân theo luật, không ra khỏi ván mãi mãi. Không chọn quân địch sẽ mất thay cho chủ quân.</p></Remember>
    </Chapter>

    <Chapter id="craft" number="09" title="Craft: chế tạo" refs="§4.1.1–4.1.4">
      <p>Craft dùng crafting piece của phe để trả chi phí in trên lá bài.</p>
      <Remember><p>Craft từ bài trên tay <strong>ở thời điểm phe cho phép</strong>. Chi phí là các biểu tượng ở góc dưới trái: kích hoạt đủ crafting piece có suit yêu cầu. Piece thường mang suit của clearing nó đang ở; loại piece nào craft được do phe quy định.</p><p>Mỗi crafting piece chỉ kích hoạt <strong>một lần mỗi lượt</strong>. Kích hoạt không mặc định loại piece hay bỏ bài khác. Biểu tượng đa màu “?” nhận một piece bất kỳ suit; bài Chim không biến mọi crafting piece thành wild.</p></Remember>
      <Example><p>Lá bài cần 2 Thỏ. Bạn có hai crafting piece hợp lệ ở clearing Thỏ: có thể kích hoạt cả hai, dù chúng ở hai clearing khác nhau. Nếu chỉ có một piece Thỏ, không dùng nó hai lần để trả chi phí. Không có yêu cầu rule chung khi craft, trừ khi luật riêng nói có.</p></Example>
      <p><strong>Hiệu ứng tức thời</strong> có khung giấy: làm hiệu ứng rồi bỏ lá. Nếu craft item, item đó phải còn trong nguồn chung; lấy nó về Crafted Items và nhận điểm trên lá theo luật áp dụng. Nguồn đã hết item đó thì không craft lá đó để chỉ lấy điểm.</p>
      <p><strong>Hiệu ứng duy trì</strong> có khung đá: đặt lá vào play area, dùng hiệu ứng theo chỉ dẫn. Không craft thêm một hiệu ứng duy trì giống hệt cái bạn đã có. Item craft ra không tự cho phe bất kỳ quyền dùng giày để move hay kiếm để battle; các quyền đó thuộc luật cụ thể.</p>
    </Chapter>

    <Chapter id="victory" number="10" title="Chiến thắng và Dominance" refs="§3.1–3.3">
      <p>Ví dụ: người có 29 điểm craft item cho 1 điểm sẽ thắng ngay, không chờ hết lượt hoặc vòng.</p>
      <p>Nếu nhiều người cùng đạt 30 tại một thời điểm, người đầu tiên tính từ người đang đi lượt rồi theo chiều kim đồng hồ trong nhóm hòa thắng.</p>
      <section className="rule-details"><h3>Một con đường khác: Dominance</h3><p>Ở Daylight, khi có ít nhất 10 điểm, bạn có thể kích hoạt Dominance trên tay. Bỏ marker khỏi thang điểm: từ đó không kiếm điểm nữa và không trở lại đua 30. Lá đã kích hoạt không thể bỏ hoặc đổi sang Dominance khác.</p><ul><li><strong>Cáo/Thỏ/Chuột:</strong> ở đầu Birdsong của bạn, rule ít nhất 3 clearing matching suit đó thì thắng ngay.</li><li><strong>Chim:</strong> ở đầu Birdsong của bạn, rule 2 clearing ở hai góc đối diện thì thắng ngay.</li></ul><p>Đạt bố trí vào giữa lượt chưa thắng: phải giữ được tới đầu Birdsong. Một số phe có ngoại lệ với Dominance, nên đọc phần phe trước khi chọn cách thắng này.</p><p>Dominance chưa kích hoạt vẫn có thể tiêu theo suit. Khi đáng lẽ vào chồng bỏ, để nó cạnh map thành bài có thể lấy. Ở Daylight, trả một bài matching để lấy nó vào tay; có thể lấy dù chưa đủ 10 điểm. Lá Dominance Chim đang mở không được xem như suit khác để trả.</p></section>
      <Remember><p>Giữ mắt trên thang điểm và điều kiện thắng đang mở. Một clearing quan trọng với người này có thể chỉ là đường đi với người khác. Hỏi “nước này giúp mình kiếm bao nhiêu điểm?” sẽ hữu ích hơn chỉ hỏi “mình giết được bao nhiêu quân?”.</p></Remember>
    </Chapter>

    <Chapter id="golden" number="11" title="Luật ưu tiên và thỏa thuận" refs="§1.1–1.5; Glossary">
      <p>Người chơi có thể thương lượng, nhưng lời hứa không tạo nghĩa vụ theo luật.</p>
      <ul><li><strong>Deal không ràng buộc.</strong> Chỉ đưa bài cho nhau khi có luật/hiệu ứng cho phép; không tùy ý chuyển bài, item, điểm hay quân vì vừa thỏa thuận.</li><li><strong>Không cần đối thủ đồng ý</strong> để thực hiện một hành động hợp lệ. Họ vẫn được dùng quyền phản ứng mà luật cho phép.</li><li><strong>Thứ tự ưu tiên:</strong> nếu mâu thuẫn, luật phe và hiệu ứng trên thẻ ghi đè luật chung. “Cannot” là cấm tuyệt đối, trừ khi có chỉ dẫn rõ ràng cho phép bỏ qua nó. Phần nhắc trên bảng phe không thay thế văn bản Law of Root.</li><li><strong>Đọc đúng từ:</strong> move, place, remove, replace, reveal, spend có nghĩa khác nhau. “May” cho phép chọn; yêu cầu bắt buộc cần làm theo luật. Hết supply không tự dùng quân của phe khác thay thế.</li><li><strong>Thông tin:</strong> số bài trên tay, bài ở chồng bỏ và các thành phần công khai có thể kiểm tra; thứ úp không tự được xem. Không lật cả bộ bài rút để tìm lá mình muốn.</li><li><strong>Timing:</strong> hiệu ứng đồng thời thường do người đang đi lượt chọn thứ tự. Làm nhiều nhất có thể theo luật chung, nhưng các chi phí, từ “then”, quyền “may” và ngoại lệ bắt buộc hoàn thành cần đọc đúng §1.4.</li></ul>
      <Remember><p>Quân và các piece bị giới hạn bởi số lượng trong hộp: hết thì không tự thêm quân thay thế. Nếu luật yêu cầu đặt/lấy/loại nhiều piece nhưng không đủ, làm số lượng tối đa có thể; điều này không cho phép bỏ qua chi phí hay điều kiện tiên quyết.</p><p>Bài trên tay là thông tin riêng: không tự đưa cho người khác xem hoặc reveal nếu luật chưa cho phép. Số lá trên tay vẫn công khai.</p></Remember>
      <p>Khi cả bàn chưa thống nhất, dừng ở đúng thời điểm đang tranh luận, tìm số mục luật và đọc câu gốc. Đừng lấy kết quả mong muốn làm lý do đổi cách hiểu.</p>
    </Chapter>

    <section id="reference" className="rule-chapter rules-reference"><span className="eyebrow">MANG THEO TỚI BÀN CHƠI</span><h2>Nguồn luật và tài liệu tra cứu.</h2><p>Trang này trình bày luật chung bằng tiếng Việt. Link “Tra Law of Root” dưới mỗi chương mở thư viện chính thức; dùng số mục ghi cạnh link để tìm đúng đoạn. Chọn Root, tiếng Anh và bản in hiện hành trong thư viện.</p><div className="rules-source-cards"><a href={law} target="_blank" rel="noreferrer"><b>Law of Root</b><span>Luật cứng và FAQ · Leder Rules Library</span></a><a href={resources} target="_blank" rel="noreferrer"><b>Tài liệu Leder Games</b><span>Learning to Play, hướng dẫn và tài liệu tải về</span></a></div><div className="rule-table-wrap"><table><thead><tr><th>Cần tìm gì?</th><th>Mục trong Law</th></tr></thead><tbody><tr><td>Luật vàng, timing, thông tin, thương lượng</td><td>§1</td></tr><tr><td>Suit, slot, river, forest và rule</td><td>§2</td></tr><tr><td>Điểm, chiến thắng, Dominance</td><td>§3</td></tr><tr><td>Craft / Move / Battle</td><td>§4.1 / §4.2 / §4.3</td></tr><tr><td>Standard Setup / Advanced Setup</td><td>§5 / phụ lục A</td></tr><tr><td>Ngoại lệ của map / nghĩa từ khóa</td><td>Phụ lục M / G (Glossary)</td></tr></tbody></table></div><p className="rules-final-note">Trước lượt đầu: biết cách phe mình ghi điểm, đọc hết ba pha trên bảng phe, rồi kiểm tra năng lực riêng có đổi rule, move, battle hay craft không.</p><Link className="rules-return" href="/">Về bàn chia phe</Link></section>
    <p className="rules-pdf"><a href={lawPdf} target="_blank" rel="noreferrer">Mở bản PDF Law of Root chính thức · 13/10/2025</a></p>
    </article></div></section></main>;
}
