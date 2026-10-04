export const law="https://cdn.shopify.com/s/files/1/0106/0162/7706/files/Root_Base_Law_Oct_2025.pdf?v=1774903758#page=7";
export const topics=[
{id:"setup",title:"Thiết lập và thành phần",ref:"§8.3",steps:[
{title:"Thiết lập tiêu chuẩn",rule:"Standard Setup: nguồn 10 warrior, 3 base ở bảng phe, 10 Sympathy trên track. Rút 3 lá vào Supporters. Chưa đặt warrior, base hay Sympathy trên map; bài tay ban đầu là phần riêng theo setup chung."},
{title:"Sympathy, căn cứ và sĩ quan",rule:"Sympathy là token, không tính rule, không chiếm slot. Base là building, tính rule và chiếm slot. Officer dùng chung nguồn 10 warrior nhưng không ở map, không góp rule hay hit trong battle."}]},
{id:"supporters",title:"Bài tay và Supporters",ref:"§8.2.3; §8.5.2",steps:[
{title:"Cách sử dụng Supporters",rule:"Supporters úp, bạn được xem; không tính giới hạn tay 5. Spend Supporters theo suit, Chim là wild. Không lấy tùy ý bài Supporters trở về tay và không craft từ chồng này."},
{title:"Giới hạn Supporters",rule:"Không base trên map: tối đa 5 Supporters; supporter mới vượt chỗ bị discard, không thay lá cũ tùy ý. Có ít nhất 1 base: không giới hạn Supporters. Giới hạn bài tay vẫn 5 cuối lượt."}]},
{id:"spread",title:"Spread Sympathy",ref:"§8.4.2",steps:[
{title:"Vị trí và thời điểm Spread",rule:"Spread Sympathy ở Birdsong sau mọi Revolt. Nếu map không còn Sympathy, có thể chọn bất kỳ clearing hợp lệ. Không cần warrior hay rule. Mỗi clearing tối đa 1 Sympathy; hạn chế place vẫn áp dụng, như Keep của Mèo."},
{title:"Chi phí và điểm",rule:"Spend đúng cost của token + Martial Law nếu có, rồi đặt và ghi VP ở ô vừa mở. Được Spread nhiều lần nếu đủ điều kiện. Không có VP tự động mỗi Evening chỉ vì Sympathy còn trên map."}]},
{id:"martial",title:"Martial Law",ref:"§8.4.2.IIa",steps:[
{title:"Đếm quân của từng đối thủ",rule:"Martial Law: xét từng người chơi khác, ít nhất một người có 3 warrior tại clearing thì +1 Supporter. Không cộng quân của nhiều người thành một đội. Warrior được họ tính cho rule, như mercenary/hireling, cũng tính."},
{title:"Phụ phí khi Spread",rule:"Martial Law không cộng nhiều lần theo số phe và không tăng chi phí Revolt. Organize không dùng cost Spread nên không bị phụ phí Martial Law."}]},
{id:"outrage",title:"Outrage",ref:"§8.2.6",steps:[
{title:"Các trường hợp kích hoạt",rule:"Outrage khi người khác move bất kỳ warrior vào clearing có Sympathy, hoặc loại Sympathy. Move lại vào một lần khác thì kích hoạt lại. Place/recruit quân vào không phải move. Pawn Lãng khách đi một mình không phải warrior."},
{title:"Nộp bài hoặc cho xem tay",rule:"Có matching thì bắt buộc đưa, Chim phải dùng như wild nếu cần. Không matching thì reveal tay, Liên minh rút 1 vào Supporters. Nếu chồng bị cap 5 và đã đầy, lá mới vẫn discard. Outrage cũng có khi token bị loại ngoài battle."}]},
{id:"revolt",title:"Revolt",ref:"§8.4.1",steps:[
{title:"Điều kiện và chi phí",rule:"Revolt tại clearing có Sympathy, chưa có base, suit matching một base còn trên faction board. Spend đúng 2 matching Supporters. Không cần rule; Martial Law không tăng cost. Không thể dựng base cùng suit thứ hai khi base đó đã trên map."},
{title:"Loại địch và đặt piece",rule:"Revolt giữ Sympathy và piece của bạn. Building/token địch bị loại cho +1 VP mỗi piece; warrior không cho VP. Lãng khách damage 3 item, pawn ở lại. Đặt quân trước, officer sau, trong giới hạn nguồn; các hạn chế place vẫn cần tuân thủ."},
{title:"Hoàn tất Revolt trước Spread",rule:"Birdsong: hoàn tất bước Revolt trước, rồi bước Spread. Không Spread rồi quay lại Revolt trong cùng lượt. Một base có thể được lấy lại và dựng sau khi đã bị loại, nếu thỏa đầy đủ điều kiện."}]},
{id:"daylight",title:"Daylight",ref:"§8.5",steps:[
{title:"Craft, Mobilize và Train",rule:"Ba hành động Daylight: Craft, Mobilize, Train, tùy số lần và thứ tự nếu trả đủ. Move, Battle, Recruit và Organize từ luật phe nằm ở Evening; không tốn một ngân sách 3 action Daylight."},
{title:"Chi phí bài tay",rule:"Mobilize: chuyển 1 lá từ tay vào Supporters, chịu cap nếu không base. Train: spend lá tay matching clearing có base trên map và đặt 1 warrior từ nguồn thành officer. Không dùng Supporters để Train."}]},
{id:"craft",title:"Craft",ref:"§8.2.1; §8.5.1; §4.1",steps:[
{title:"Craft bằng Sympathy",rule:"Craft trong Daylight bằng Sympathy trên map; suit lấy từ clearing chứa token. Mỗi token kích hoạt tối đa 1 lần/lượt. Cost theo crafting icons, không theo suit lá bài."},
{title:"Vật phẩm và thời điểm craft",rule:"Craft item cần item còn nguồn, nhận item và VP theo thẻ; effect card theo nội dung. Không loại Sympathy khi dùng để craft. Không dùng base hoặc officer làm crafting piece của phe."}]},
{id:"officers",title:"Sĩ quan",ref:"§8.5.3; §8.6.1",steps:[
{title:"Ngân sách Military Operations",rule:"Số operation Evening tối đa số officer. Mỗi Move, Battle, Recruit hoặc Organize tốn 1 operation; thứ tự tùy chọn và được lặp. Officer không bị exhaust/remove chỉ vì ra lệnh."},
{title:"Nguồn quân, Train và Recruit",rule:"Train cần warrior còn nguồn và base matching lá tay. Recruit Evening chỉ đặt 1 warrior tại một clearing có base, tốn 1 operation. Recruit không cần spend bài, không đặt tại mọi base cùng lúc."}]},
{id:"operations",title:"Military Operations",ref:"§8.6.1; §4.2",steps:[
{title:"Điều kiện Move",rule:"Move của Liên minh tuân thủ rule nơi đi HOẶC nơi đến và adjacency. Sympathy không giúp rule; base và warrior có. Hòa thông thường không rule. Một Move có thể chuyển nhiều warrior từ cùng nơi đi đến cùng nơi đến."},
{title:"Điều kiện Battle và quân trên map",rule:"Officer ở box xác định số operation, không được tự dùng làm warrior ở map. Battle cần ít nhất 1 warrior của bạn ở clearing và đối thủ hợp lệ. Không được chọn action không thỏa điều kiện rồi coi như đã thành công."}]},
{id:"organize",title:"Organize",ref:"§8.6.1.IV",steps:[
{title:"Đổi chiến binh lấy Sympathy",rule:"Organize tốn 1 operation và 1 warrior tại clearing. Không spend Supporters, không cần adjacency với Sympathy, không cần rule, không trả Martial Law. Vẫn cần token và chỗ đặt hợp lệ."},
{title:"Giới hạn token và điểm",rule:"Mỗi clearing tối đa 1 Sympathy. Token bị đối thủ loại trở về đúng track theo luật chung; đặt lại sau này có thể ghi VP tiếp. Mất Sympathy không tự mất VP bạn đã ghi."}]},
{id:"guerrilla",title:"Guerrilla War",ref:"§8.2.2; §4.3",steps:[
{title:"Xúc xắc khi phòng thủ",rule:"Guerrilla War chỉ khi Liên minh phòng thủ: bạn lấy số lớn, bên tấn công số nhỏ. Rolled hit mỗi bên vẫn bị số warrior của họ giới hạn. Extra hit và Ambush xử lý theo luật chung."},
{title:"Giới hạn hit và defenseless",rule:"Guerrilla War không cho unlimited hit và không biến token thành warrior. Khi không có warrior phòng thủ, bên tấn công còn có +1 extra hit defenseless. Warrior bị loại không cho VP; building/token cho VP theo luật chung."}]},
{id:"base-loss",title:"Mất căn cứ",ref:"§8.2.4",steps:[
{title:"Supporters và sĩ quan bị loại",rule:"Bỏ Supporters matching clearing nơi base bị loại, gồm Chim, không phải toàn bộ bài tay. Remove nửa số officer, làm tròn lên, về nguồn. Warrior trên map không tự bị loại theo hậu quả này."},
{title:"Giới hạn khi mất căn cứ cuối",rule:"Base bị loại trở về bảng phe, có thể Revolt dựng lại sau. Mất base cuối tái áp dụng cap 5 Supporters. VP đã ghi giữ nguyên; đối thủ ghi +1 VP cho building họ loại. Đọc lại bonus rút bài đang lộ trên bảng phe."}]},
{id:"evening",title:"Evening",ref:"§8.6.2",steps:[
{title:"Rút bài và bỏ xuống năm",rule:"Evening: Military Operations → Draw and Discard. Rút 1 + số bonus draw đang lộ trên bảng phe. Bài rút về tay, không tự thành Supporters; Mobilize là bước Daylight khác."},
{title:"Nguồn điểm và điều kiện thắng",rule:"Thắng thường ngay khi đạt 30 VP. Nguồn điểm chính là đặt Sympathy; thêm VP từ craft item và loại building/token. Những gợi ý vị trí là chiến thuật, không tạo luật đặt token mới."}]},
{id:"plan",title:"Trình tự và kiểm tra lượt",ref:"§8.4–8.6",steps:[
{title:"Tài nguyên và timing",rule:"Bài tay, Supporters, warrior map và officer là bốn nguồn riêng. Đếm trước chi phí, matching suit, nguồn quân và điều kiện đặt piece. Các action từ hiệu ứng card riêng phải theo timing của card."},
{title:"Gợi ý chiến thuật",rule:"Gợi ý chiến thuật: giữ base, tận dụng Outrage, dùng Organize để tiết kiệm Supporters. Không có quy tắc phải đặt Sympathy tại nơi đông quân địch hay luôn Train một số officer cố định."}]}
];
export const faqs=[
["Setup có đặt Sympathy ngay không?","Standard không. Liên minh nhận 3 Supporters, để 10 Sympathy trên track và chưa có piece trên map. Sympathy đầu tiên thường được Spread trong Birdsong đầu tiên."],
["Có thể Spread rồi Revolt ngay cùng lượt không?","Không theo thứ tự lượt bình thường: bước Revolt phải hoàn tất trước bước Spread. Token mới thường chờ lượt sau."],
["Hai quân Mèo + hai Đại bàng có Martial Law không?","Không. Cần ít nhất một người chơi khác có 3 warrior tính cho họ tại clearing. Không cộng mọi đối thủ lại."],
["Hai phe đều có 3 quân thì thêm mấy Supporter?","Chỉ thêm 1. Martial Law không cộng dồn theo số phe và chỉ áp dụng Spread."],
["Organize có cần Supporters, rule hoặc nơi kề Sympathy không?","Không. Cần operation, warrior Liên minh tại clearing chưa có Sympathy, token còn nguồn và không bị cấm đặt. Martial Law không tăng cost."],
["Một Move 4 quân vào Sympathy có Outrage 4 lần?","Chỉ 1 lần cho move ấy. Nếu sau đó move quân vào lại bằng action khác, lại có Outrage."],
["Recruit hoặc place quân có gây Outrage không?","Không chỉ vì quân được đặt vào. Outrage kiểm tra move warrior vào hoặc loại Sympathy. Pawn Lãng khách một mình không phải warrior."],
["Outrage khi không có bài matching thì sao?","Đối thủ reveal tay, kể cả tay rỗng. Liên minh rút 1 lá từ deck vào Supporters; không yêu cầu lá rút đúng suit. Cap Supporters vẫn áp dụng."],
["Supporters đầy 5 có thay lá cũ bằng lá mới không?","Không khi đang không có base. Supporter mới vượt giới hạn bị discard, không đổi tùy ý với lá cũ."],
["Revolt có loại Sympathy của mình không?","Không. Chỉ loại piece địch. Sympathy tại clearing khởi nghĩa vẫn giữ và có tính khi đếm clearing cùng suit để đặt warrior."],
["Revolt ghi VP theo warrior địch bị loại không?","Không. Chỉ +1 VP mỗi building/token địch bị loại theo luật chung. Lãng khách nhận damage 3 item, pawn không bị loại."],
["Quân từ Revolt đếm theo gì?","Đếm clearing có Sympathy cùng suit in trên base trên toàn map, gồm nơi Revolt; không đếm số Supporters bỏ hay số quân địch. Đặt warrior trước, officer cuối, tuân thủ nguồn."],
["Train dùng Supporters được không?","Không. Train spend bài tay matching clearing có base trên map và lấy warrior từ nguồn thành officer. Mobilize mới chuyển bài tay vào Supporters."],
["Officer ra lệnh có bị bỏ không?","Không. Officer xác định số operation tối đa mỗi Evening; dùng operation không loại officer. Mất base mới có hậu quả mất nửa officer, làm tròn lên."],
["Guerrilla War có bỏ trần hit theo số quân không?","Không. Phòng thủ lấy xúc xắc lớn nhưng rolled hit vẫn bị số warrior giới hạn. Không có warrior thì không gây rolled hit và vẫn defenseless."],
["Mất base Thỏ thì bỏ bài tay Thỏ không?","Không theo hậu quả mất base. Bỏ mọi Supporter Thỏ và Chim, mất nửa officer làm tròn lên. Nếu base cuối thì giảm Supporters còn 5."],
["Sympathy bị loại có mất điểm đã ghi không?","Không. Token về đúng track; đặt lại hợp lệ có thể ghi điểm ô vừa mở một lần nữa. Outrage cũng xử lý khi người khác loại token."],
["Rút bài cuối lượt có cho Supporters luôn không?","Không. Rút về tay rồi discard xuống 5. Muốn chuyển thành Supporters phải Mobilize vào Daylight hoặc nhận qua Outrage/setup."]
];
