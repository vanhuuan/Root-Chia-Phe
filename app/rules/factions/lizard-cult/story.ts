import type { RuleTopic } from "../../rule-book";

export const law = "https://rules.ledergames.com/?locale=en-US&printing=p16&product=root";
export const topics: RuleTopic[] = [
  { id: "setup", title: "Chuẩn bị phe", ref: "§10.3", steps: [
    { title: "Đặt quân và vườn", rule: "Standard Setup: 25 chiến binh và 15 vườn (5 mỗi chất). Chọn góc không phải góc khởi đầu của người khác; nếu được, ở chéo góc một nơi khởi đầu. Đặt 4 quân và 1 vườn đúng chất, rồi 1 quân ở mỗi clearing kề qua đường. Vườn là building, chiếm ô xây dựng." },
    { title: "Chọn Outcast ban đầu", rule: "Chọn Cáo, Thỏ hoặc Chuột ở mặt Outcast thường, không phải Hated. Đặt 14 vườn còn lại lên ba track đúng chất. Bài tay theo setup chung. ADSET dùng thẻ setup phe, không trộn với Standard Setup." },
  ] },
  { id: "gardens", title: "Vườn: rule và bị loại", ref: "§10.2.4–5; §10.5.1", steps: [
    { title: "Pilgrims: có vườn thì rule", rule: "Có ít nhất một vườn thì Giáo phái rule clearing ấy, dù đối thủ có nhiều quân hơn; khả năng này còn thắng luật hòa của Đại bàng. Rule không ngăn đối thủ move hoặc battle theo luật của họ. Vườn vẫn có thể bị phá." },
    { title: "Fear of the Faithful: mất vườn phải bỏ bài", rule: "Mỗi vườn bị loại, kể cả ngoài battle, về ô trống ngoài cùng bên phải của track đúng chất; đồng thời bỏ ngẫu nhiên 1 lá bài tay vào Lost Souls. Track bị che lại có thể giảm điểm Score và bonus rút sau này. Không tự trừ VP đã ghi; đối thủ ghi điểm khi luật loại building cho phép." },
  ] },
  { id: "souls", title: "Lost Souls: gom và dọn bài", ref: "§10.2.6; §10.4.1–2", steps: [
    { title: "Bài bỏ của toàn bàn", rule: "Mọi lá người chơi spend hoặc discard vào chồng bỏ đều đi vào Lost Souls thay thế, kể cả Dominance. Bài đưa cho người khác, bài reveal và bài craft hiệu ứng lâu dài đang ở play area không tự vào chồng này." },
    { title: "Chỉnh Outcast trước khi dọn", rule: "Đầu Birdsong, đếm Cáo, Thỏ và Chuột, bỏ qua Chim, để chỉnh Outcast. Sau đó chuyển toàn bộ Lost Souls sang discard; Dominance lúc này trở thành lá có thể lấy. Nếu deck hết trước khi dọn, chỉ xáo discard tạo deck, không xáo Lost Souls vào đó." },
  ] },
  { id: "outcast", title: "Outcast và Hated", ref: "§10.4.1", steps: [
    { title: "Một chất đứng đầu duy nhất", rule: "Chất nhiều nhất khác chất cũ: chuyển sang chất mới ở mặt Outcast thường. Chất nhiều nhất trùng chất cũ: dùng mặt Hated. Hated giảm 1 tín đồ cho mỗi conspiracy, không cho hành động miễn phí." },
    { title: "Hòa hoặc chồng rỗng", rule: "Không có chất đứng đầu duy nhất: giữ chất hiện tại và dùng Hated, không tự chọn chất mới. Chồng rỗng hoặc chỉ có Chim cũng áp dụng cách này. Xác định lại mỗi Birdsong; Outcast/Hated giữ nguyên trong phần còn lại của lượt." },
  ] },
  { id: "acolytes", title: "Tạo Tín đồ (Acolytes)", ref: "§10.2.3; §10.5.4", steps: [
    { title: "Revenge khi phòng thủ", rule: "Mỗi chiến binh Giáo phái bị loại khi đang phòng thủ trong battle vào Acolytes thay vì về nguồn. Quân mất khi tấn công, do Revolt hoặc Bomb ngoài battle không tự thành tín đồ." },
    { title: "Sacrifice bằng Chim", rule: "Reveal 1 lá Chim trong Daylight để đặt 1 chiến binh từ nguồn vào Acolytes, không lấy quân trên map. Cần có quân nguồn. Lá reveal lấy về Evening. Tín đồ mới phải chờ Birdsong sau mới dùng conspiracy, vì bước đó của lượt hiện tại đã qua." },
  ] },
  { id: "conspiracies", title: "Conspiracies: chi phí và thay thế", ref: "§10.4.3", steps: [
    { title: "Trả tín đồ về nguồn", rule: "Sau khi chỉnh Outcast và dọn Lost Souls, làm conspiracies bao nhiêu lần và theo thứ tự nào cũng được nếu đủ chi phí và mục tiêu hợp lệ. Outcast thường: Crusade 2, Convert 2, Sanctify 3 tín đồ. Hated: lần lượt 1, 1, 2. Tín đồ đã dùng trả về nguồn." },
    { title: "Convert và Sanctify tại Outcast", rule: "Convert thay 1 chiến binh địch bằng 1 chiến binh Giáo phái. Sanctify thay 1 building địch bằng 1 vườn chất Outcast. Cả hai chỉ tại clearing đúng Outcast và không cần rule, nhưng phải thực hiện được toàn bộ việc loại và đặt thay thế. Convert không đổi pawn Lãng khách; Sanctify không đổi token hoặc ruin. Mọi hạn chế loại/đặt vẫn áp dụng." },
  ] },
  { id: "crusade", title: "Crusade: battle hoặc move rồi battle", ref: "§10.4.3.I; §4.2", steps: [
    { title: "Điểm xuất phát phải đúng Outcast", rule: "Battle tại clearing đúng Outcast, hoặc move ít nhất một chiến binh từ clearing đúng Outcast rồi tùy chọn battle tại đích. Đích không cần cùng chất Outcast. Vẫn theo adjacency, rule xuất phát hoặc đích và các điều kiện battle: có chiến binh và mục tiêu hợp lệ tại đích." },
    { title: "Daylight không có Move/Battle mặc định", rule: "Nghi lễ chỉ cho Build, Recruit, Score và Sacrifice; không dùng lá reveal để Move hoặc Battle. Hiệu ứng bài hoặc dịch vụ khác có thể cấp hành động theo đúng nội dung, thời điểm và luật riêng." },
  ] },
  { id: "rituals", title: "Nghi lễ: reveal khác spend", ref: "§10.2.2; §10.5", steps: [
    { title: "Một lá, một nghi lễ", rule: "Reveal lá từ tay vào play area rồi làm một nghi lễ bằng lá đó. Có thể đổi thứ tự và lặp Build/Recruit, nhưng mỗi lá chỉ dùng một lần trong Daylight. Build/Recruit/Sacrifice lấy bài về Evening; Score spend chính lá reveal nên lá ấy không quay lại." },
    { title: "Chim không thay chất cho nghi lễ", rule: "Build/Recruit/Score cần Cáo, Thỏ hoặc Chuột đúng chất; Sacrifice cần Chim. Hatred of Birds chỉ bỏ tính wild trong rituals, không bỏ cho ambush hoặc mọi hiệu ứng khác. Outcast không giới hạn nghi lễ." },
  ] },
  { id: "build", title: "Recruit và Build", ref: "§10.5.1–2", steps: [
    { title: "Recruit không cần rule", rule: "Reveal 1 lá đúng chất để đặt 1 chiến binh nguồn tại một clearing matching hợp lệ. Không cần có sẵn quân, vườn hoặc rule, không cần matching Outcast. Không đặt quân tại tất cả clearing cùng chất." },
    { title: "Build cần rule trước khi đặt", rule: "Reveal 1 lá đúng chất để xây tại clearing matching bạn rule, có ô xây trống và vườn đúng chất còn trên track. Lấy vườn ngoài cùng bên trái của track. Có thể Recruit trước để giành rule rồi dùng lá khác Build. Đặt vườn không tự ghi VP." },
  ] },
  { id: "score", title: "Score từ track vườn", ref: "§10.5.3; §3.2", steps: [
    { title: "Tối đa một lần mỗi chất mỗi lượt", rule: "Reveal rồi spend chính một lá đúng chất. Cần ít nhất 1 vườn chất đó trên map; ghi VP phía trên ô trống ngoài cùng bên phải của track matching. Có thể Score cả ba chất nhưng mỗi chất tối đa một lần mỗi lượt, không cần cùng Outcast. Lá spend vào Lost Souls." },
    { title: "Đọc track sau khi xây", rule: "Có thể Build rồi Score theo track mới. Không cộng điểm từng vườn và không tự ghi điểm mỗi Evening. Sanctify loại building địch thường cho 1 VP theo luật chung, nhưng vườn mới không tự kích hoạt Score." },
  ] },
  { id: "evening", title: "Evening: lấy bài, craft, rút", ref: "§10.2.1; §10.6", steps: [
    { title: "Lấy bài về trước khi craft", rule: "Trả mọi lá reveal còn lại về tay, rồi craft bằng vườn có chất in trùng Outcast. Lá vừa dùng Recruit có thể craft sau khi lấy về. Đọc crafting cost, không đọc chất góc lá. Mỗi vườn activate tối đa một lần mỗi lượt; Hated không giảm crafting cost." },
    { title: "Rút 1 cộng bonus, bỏ xuống 5", rule: "Đếm mọi biểu tượng bonus rút đang lộ trên các track vườn, cộng 1 lá cơ bản, rồi discard xuống 5 vào Lost Souls. Lost City hoặc hiệu ứng đổi chất clearing: chọn vườn theo chất in/Outcast, nhưng icon craft cung cấp theo chất clearing. Map chuẩn: Outcast Cáo chỉ activate vườn Cáo." },
  ] },
  { id: "example", title: "Ví dụ một lượt đầy đủ", ref: "§10.4–6", steps: [
    { title: "Birdsong với Thỏ Hated", rule: "Marker đang Thỏ, Lost Souls có 3 Thỏ, 1 Cáo và 2 Chim: giữ Thỏ, dùng Hated rồi dọn chồng. Với 3 tín đồ, dùng 2 Sanctify building địch tại Thỏ, thường nhận 1 VP vì loại building; dùng 1 Convert chiến binh tại Thỏ. Giả định đủ pieces và mục tiêu thay thế hợp lệ. Vườn mới cho rule nhưng không tự Score." },
    { title: "Daylight và Evening với bốn lá", rule: "Tay có 3 Thỏ và 1 Chim: dùng Thỏ thứ nhất Recruit, thứ hai Build tại nơi bạn rule còn ô trống, thứ ba Score theo track thật, rồi Chim Sacrifice từ nguồn. Evening lấy về 2 Thỏ và Chim; craft nếu muốn, rút bonus rồi bỏ xuống 5. Lá Score vào Lost Souls; tín đồ mới chờ Birdsong sau." },
  ] },
  { id: "strategy", title: "Gợi ý chiến thuật", ref: "Mẹo chơi · không phải luật", steps: [
    { title: "Bảo vệ vườn và giữ bài", rule: "Ưu tiên vườn an toàn để duy trì bonus rút và track ghi điểm. Recruit giúp tới nơi mới để mở đường Build. Cân bằng dùng bài lấy VP ngay với giữ bài cho Build/Recruit lượt sau; không bắt buộc Score mọi chất mỗi lượt." },
    { title: "Theo dõi Outcast", rule: "Đối thủ có thể đổi Outcast bằng bài họ bỏ. Hated giúp thay building lấy điểm và mở vườn, nhưng vẫn cần quân bảo vệ vườn. Vườn cho rule không bảo đảm an toàn; mất vườn còn buộc bỏ bài ngẫu nhiên. Hết vườn vẫn có thể Recruit rồi phục hồi bằng Build khi giành rule." },
  ] },
];

export const faqs = [
  ["Chim có thay chất cho nghi lễ không?", "Không. Build, Recruit và Score cần đúng chất Cáo/Thỏ/Chuột; Sacrifice cần Chim. Ngoại lệ chỉ dành cho rituals."],
  ["Outcast có giới hạn nghi lễ Daylight không?", "Không. Outcast giới hạn conspiracies và vườn được activate để craft."],
  ["Lost Souls hòa, rỗng hoặc chỉ có Chim?", "Giữ chất hiện tại và dùng mặt Hated; Chim không được đếm."],
  ["Đang Hated Cáo nhưng Thỏ thắng?", "Chuyển sang Thỏ ở mặt Outcast thường."],
  ["Quân chết khi tấn công có thành tín đồ?", "Không qua Revenge. Chỉ quân bị loại khi Giáo phái phòng thủ trong battle thành tín đồ; Revolt/Bomb ngoài battle không áp dụng."],
  ["Sacrifice lấy quân ở đâu?", "Từ nguồn, không từ map: reveal 1 Chim để đặt 1 quân nguồn vào Acolytes."],
  ["Recruit có cần vườn hoặc rule?", "Không. Cần clearing đúng chất, quân nguồn và placement hợp lệ; chọn một clearing cho mỗi lá."],
  ["Build có cần cùng Outcast?", "Không, nhưng cần rule, đúng chất lá, ô trống và vườn matching còn trên track."],
  ["Có vườn nhưng đối thủ nhiều quân hơn?", "Giáo phái rule nhờ Pilgrims, kể cả khi Đại bàng hòa quân/building. Đối thủ vẫn có thể đánh vườn."],
  ["Convert đổi pawn Lãng khách được không?", "Không. Pawn không phải chiến binh."],
  ["Sanctify đổi Sympathy, Trade Post hoặc Plot?", "Không. Chúng là token; Sanctify chỉ thay building địch bằng vườn đúng chất."],
  ["Sanctify cần rule hoặc ô trống trước?", "Không cần rule. Building bị thay mở ô cho vườn, nhưng phải thực hiện được cả loại và đặt; mọi hạn chế vẫn áp dụng."],
  ["Crusade đi sang chất khác rồi đánh?", "Có. Chỉ nơi xuất phát phải đúng Outcast; Move vẫn cần rule xuất phát hoặc đích và đường nối hợp lệ."],
  ["Xây vườn có ghi VP ngay?", "Không. Score spend bài và đọc track. Sanctify còn có thể ghi 1 VP do loại building địch theo luật chung."],
  ["Dùng hai lá để Score một chất hai lần?", "Không. Mỗi chất tối đa một lần mỗi lượt; cần ít nhất một vườn chất đó trên map."],
  ["Lá reveal có dùng lại trong Daylight?", "Không. Một lá cho một ritual, trừ Score spend luôn thì lá ở play area đến Evening; lấy về rồi mới có thể craft từ tay."],
  ["Mất hai vườn phải bỏ mấy lá?", "Hai lần bỏ ngẫu nhiên, một lần mỗi vườn, tối đa theo số bài tay còn. Vườn về track có thể che bonus."],
  ["Bài craft nào vào Lost Souls?", "Bài craft hiệu ứng tức thời bị discard vào Lost Souls. Bài hiệu ứng lâu dài ở play area đến khi bị discard bởi hiệu ứng hợp lệ."],
  ["Dominance trong Lost Souls lấy ngay được?", "Chưa. Chỉ sau khi dọn Lost Souls ở Birdsong nó mới thành lá có thể lấy."],
  ["Hated giảm chi phí craft hoặc nghi lễ?", "Không. Chỉ giảm một tín đồ cho mỗi conspiracy."],
  ["Đọc bonus rút thế nào?", "Đếm biểu tượng bonus rút đang lộ trên toàn bộ track rồi cộng 1. Bỏ xuống 5 chỉ ở cuối Evening."],
];
