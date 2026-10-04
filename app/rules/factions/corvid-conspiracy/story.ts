export const law="https://cdn.shopify.com/s/files/1/0106/0162/7706/files/Root_Base_Law_Oct_2025.pdf?v=1774903758#page=15";
export const plots=[
{id:"bomb",name:"Bomb",vi:"Bom",effect:"Khi lật: loại mọi piece địch ở clearing này, rồi loại chính Bom. Ghi điểm lật trước khi xử lý vụ nổ; building/token địch bị loại còn cho VP theo luật chung."},
{id:"snare",name:"Snare",vi:"Bẫy",effect:"Khi ngửa: địch không được đặt piece vào hoặc move piece ra khỏi clearing này. Vẫn có thể move vào và battle; Bẫy không tự loại quân đang ở đó."},
{id:"extortion",name:"Extortion",vi:"Tống tiền",effect:"Khi lật: lấy ngẫu nhiên 1 lá từ mỗi đối thủ có piece phe ở đây. Khi còn ngửa trên map: thêm 1 lá rút mỗi Evening. Không lấy thêm bài của đối thủ vào mỗi lượt."},
{id:"raid",name:"Raid",vi:"Đột kích",effect:"Khi bị loại, dù úp hay ngửa: đặt 1 Quạ tại mỗi clearing kề clearing vừa mất Raid. Nếu bị Exposure đoán đúng và loại thì không đặt quân."}
] as const;
export const topics=[
{id:"setup",title:"Thiết lập và token âm mưu",ref:"§13.2–13.3",steps:[
{title:"Thiết lập tiêu chuẩn",rule:"Standard Setup: nguồn 15 warrior và 8 plot (2 mỗi loại). Đặt 1 warrior ở một clearing mỗi suit, tổng 3. Chưa đặt plot trên map; ADSET dùng thẻ setup riêng."},
{title:"Giới hạn token và thông tin bí mật",rule:"Mỗi clearing tối đa 1 plot. Bạn được xem plot úp của mình bất cứ lúc nào. Plot là token, không chiếm building slot và không cộng vào rule."}]},
{id:"plots",title:"Bốn loại âm mưu",ref:"§13.7",steps:[
...plots.map(plot=>({title:`${plot.vi} (${plot.name})`,rule:plot.effect})),
{title:"Thời điểm áp dụng hiệu ứng",rule:"Bomb và Extortion xử lý hiệu ứng ngay khi lật. Snare có hiệu lực khi ngửa. Raid kích hoạt khi bị loại, với ngoại lệ Exposure."},
{title:"Giới hạn của Bẫy (Snare)",rule:"Snare cấm địch place vào và move ra; không cấm move vào, battle hoặc remove piece. Nimble chỉ bỏ yêu cầu rule, không vượt qua lệnh cấm của Snare."}]},
{id:"birdsong",title:"Bình minh: Chế tạo, Lật, Tuyển quân",ref:"§13.4; §4.1",steps:[
{title:"Chế tạo bằng token âm mưu",rule:"Birdsong theo thứ tự Craft → Flip Plots → Recruit. Craft bằng plot úp hoặc ngửa; suit lấy từ clearing. Mỗi crafting piece kích hoạt tối đa 1 lần mỗi lượt."},
{title:"Điều kiện lật âm mưu",rule:"Chỉ lật plot úp tại clearing có ít nhất 1 warrior Quạ. Lật là tùy chọn, từng token một. Plot đặt trong Daylight thường đợi Birdsong lượt sau mới lật."}]},
{id:"flip",title:"Lật âm mưu và ghi điểm",ref:"§13.4.2; §13.7.1",steps:[
{title:"Điểm cho mỗi lần lật",rule:"Mỗi lần lật, ghi VP bằng số plot ngửa hiện có trên map, tính cả plot vừa lật. Không ghi lại điểm mỗi Evening chỉ vì plot còn đó."},
{title:"Ghi điểm trước hiệu ứng Bom",rule:"Ghi điểm lật trước, rồi xử lý Bomb/Extortion. Bom rời map nên không còn góp vào số plot ngửa của lần lật kế tiếp. Nếu đạt 30 VP, thắng ngay theo luật chung."}]},
{id:"recruit",title:"Tuyển quân bằng một lá bài",ref:"§13.4.3",steps:[
{title:"Tuyển tại mọi clearing cùng chất",rule:"Recruit tùy chọn, tối đa 1 lần/lượt: spend 1 lá, đặt 1 warrior tại mỗi clearing matching. Lá Chim: chọn đúng 1 suit Cáo/Thỏ/Chuột, không tuyển tại toàn bộ map."},
{title:"Hạn chế đặt quân và nguồn quân",rule:"Recruit không yêu cầu rule hay Quạ có sẵn. Tuân thủ hạn chế place và giới hạn nguồn. Nếu không đủ quân, đặt tối đa có thể; Birdsong không có cơ chế Turmoil."}]},
{id:"daylight",title:"Ban ngày: tối đa ba hành động",ref:"§13.2.3; §13.5",steps:[
{title:"Di chuyển, Đặt âm mưu, Chiến đấu, Đánh tráo",rule:"Tối đa 3 hành động, tùy thứ tự và được lặp: Move, Plot, Battle, Trick. Move nhờ Nimble bỏ yêu cầu rule nơi đi/nơi đến, vẫn cần đường kề và quân để di chuyển."},
{title:"Chi phí đặt âm mưu tăng trong lượt",rule:"Plot: tại clearing chưa có plot, remove 1 warrior + 1 cho mỗi plot đã đặt lượt này, rồi đặt 1 plot úp từ nguồn. Không cần rule, không spend bài; phải trả đủ chi phí. Chi phí không reset khi sang Evening."}]},
{id:"trick",title:"Đánh tráo âm mưu (Trick)",ref:"§13.5.4",steps:[
{title:"Đổi vị trí hai token cùng mặt",rule:"Trick tốn 1 hành động: swap 2 plot trên map, cả hai cùng úp hoặc cùng ngửa. Không đổi một úp với một ngửa. Không cần warrior tại hai clearing."},
{title:"Đánh tráo không kích hoạt hiệu ứng lật",rule:"Trick không tạo VP lật, không xử lý hiệu ứng khi lật và không tính là đặt plot mới cho chi phí Plot. Token giữ nguyên mặt khi đổi chỗ."}]},
{id:"exposure",title:"Vạch trần âm mưu (Exposure)",ref:"§13.2.4; §1.4.3",steps:[
{title:"Điều kiện và kết quả đoán",rule:"Exposure trong lượt của đối thủ: cần piece phe họ ở clearing chứa plot úp và reveal 1 lá matching (Chim là wild). Sai: đưa lá cho Quạ; đúng: giữ lá, loại plot, +1 VP."},
{title:"Thời điểm Exposure và ngoại lệ Raid",rule:"Exposure có thể làm nhiều lần, nhưng không dùng sau khi bắt đầu bước cuối lượt của mình và không chen ngang hành động khác. Raid bị Exposure loại không kích hoạt đặt quân."}]},
{id:"battle",title:"Chiến đấu và Đặc vụ ngầm",ref:"§13.2.5; §13.7.4; §4.3",steps:[
{title:"Thêm hit khi phòng thủ với âm mưu úp",rule:"Embedded Agents: khi Quạ phòng thủ tại clearing có plot úp, gây +1 extra hit, kể cả defenseless. Plot ngửa không cho bonus này; Quạ tấn công cũng không được bonus."},
{title:"Đột kích (Raid) khi bị loại",rule:"Raid bị loại úp/ngửa đều kích hoạt, trừ Exposure. Đặt quân tại clearing kề, không phải clearing vừa mất Raid; tuân thủ nguồn và hạn chế place. Bonus defenseless của bên tấn công vẫn áp dụng khi Quạ không có warrior."}]},
{id:"evening",title:"Buổi tối: Exert hoặc rút bài",ref:"§13.6",steps:[
{title:"Exert: thêm một hành động, bỏ rút bài",rule:"Exert tùy chọn: làm 1 hành động trong danh sách Daylight và bỏ rút bài Evening. Nếu Plot bằng Exert, chi phí tiếp tục đếm các plot đã đặt trong lượt."},
{title:"Rút bài và giới hạn tay",rule:"Không Exert: rút 1 + số Extortion ngửa trên map. Sau đó giới hạn tay 5 lá vẫn áp dụng, kể cả khi bỏ rút vì Exert. Không có điểm tự động cuối lượt từ plot."}]}
];
