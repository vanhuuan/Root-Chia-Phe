export type SceneId = "setup" | "map" | "cards" | "rule" | "move" | "ambush" | "battle" | "craft" | "turn" | "victory" | "dominance";
export type StoryStep = { title: string; story: string; rule: string };
export type StoryScene = { id: SceneId; title: string; subtitle: string; reference: string; steps: StoryStep[] };
export const storyScenes: StoryScene[] = [
  {id:"setup",title:"Cánh rừng mở cửa",subtitle:"Chuẩn bị bàn",reference:"§5.1 · phụ lục A, M",steps:[
    {title:"Một lời hẹn",story:"Bạn cùng những người bạn trải bản đồ lên bàn. Người dẫn đường chỉ vào thang điểm: “Mỗi phe viết câu chuyện riêng. Ai chạm 30 điểm trước sẽ thắng ngay.”",rule:"Đạt 30 điểm là thắng ngay; không cần tiêu diệt đối thủ hay chờ hết vòng."},
    {title:"Dọn bàn chung",story:"Những phế tích xuất hiện trên ô R. Vật phẩm được xếp vào nguồn chung, hai xúc xắc đặt cạnh rừng. Mỗi phe đặt marker điểm tại 0.",rule:"Ruin lấp slot R. Chuẩn bị item và ruin đúng hướng dẫn map; map biến thể có thay đổi riêng."},
    {title:"Ba lá thư đầu tiên",story:"Người giữ bộ bài xáo nó rồi gửi mỗi người ba lá. Bạn nhận phe và chuẩn bị quân theo hướng dẫn riêng, không chia quân giống nhau cho tất cả.",rule:"Standard Setup chia 3 lá mỗi người; bàn 2 người bỏ 4 Dominance. ADSET dùng quy trình riêng: rút 5, cuối setup giữ 3."},
  ]},
  {id:"map",title:"Ba ngôi làng trên đường",subtitle:"Clearing, suit và đường nối",reference:"§2.2–2.4",steps:[
    {title:"Cư dân chào bạn",story:"Bạn ghé làng A của Cáo, rồi nhìn sang làng B của Thỏ và làng C của Chuột. Màu suit thuộc về làng, không đổi chỉ vì đoàn quân khác bước vào.",rule:"Clearing thường có suit Cáo, Thỏ hoặc Chuột. Phe và suit là hai khái niệm khác nhau."},
    {title:"Những chỗ dựng nhà",story:"Trong làng có các ô trắng. Bạn có thể đặt building vào ô trống nếu hành động cho phép. Một phế tích đang nằm trong ô R: chỗ đó chưa xây được.",rule:"Building cần slot trống. Token không chiếm slot. Không tự phá ruin hoặc xây đè."},
    {title:"Đọc đường, đừng đo khoảng cách",story:"Con đường in trên map nối A với B. Đó là đường đi. Dòng sông và khoảng rừng trông cũng hấp dẫn, nhưng đoàn quân chưa có quyền dùng chúng như đường thường.",rule:"Clearing adjacent khi có đường nối. Sông không mặc định là đường; move thường không vào forest."},
  ]},
  {id:"cards",title:"Người đưa thư ghé làng",subtitle:"Đọc bài và matching suit",reference:"§2.1 · §4.1",steps:[
    {title:"Hai công dụng của một lá",story:"Bạn cầm lá bài: suit ở đầu có thể trả cho một hành động matching. Phần hiệu ứng cần craft mới dùng được. Giữ lá trên tay chưa kích hoạt hiệu ứng đó.",rule:"Spend bài cho hành động và craft bài là hai việc khác nhau. Chi phí craft nằm ở góc dưới trái."},
    {title:"Chim mang thư khắp rừng",story:"Bạn cần trả bài Thỏ nhưng chỉ có bài Chim. Người đưa thư gật đầu: theo luật chung, Chim có thể thay Thỏ. Một lá Thỏ thì không thay được yêu cầu Chim.",rule:"Bài Chim thường wild cho suit khác; không thay ngược lại. Luật phe/thẻ có thể đặt ngoại lệ."},
    {title:"Thư đã gửi và thư đã mở",story:"Bạn spend một lá: nó đi vào chồng bỏ. Nếu chỉ được yêu cầu reveal, bạn lộ lá và làm theo chỉ dẫn, không tự bỏ nó. Bài trong vùng riêng cũng không tùy ý tiêu như bài trên tay.",rule:"Spend/discard khác reveal. Ambush và Dominance không craft được; bộ bài hết thì xáo chồng bỏ ngay."},
  ]},
  {id:"rule",title:"Ai giữ làng Thỏ?",subtitle:"Thử thay đổi quyền kiểm soát",reference:"§2.5",steps:[
    {title:"Người dẫn đường bắt đầu đếm",story:"Đoàn A có hai warrior và một building. Đoàn B có hai warrior. Người dẫn đường đếm A = 3, B = 2: A đang rule làng.",rule:"Rule dùng tổng warrior + building, so với từng đối thủ; không cần loại hết quân địch."},
    {title:"Có thêm đồ vật",story:"Đoàn B đặt một token vào làng. Cờ và đồ vật nhiều hơn, nhưng quyền kiểm soát vẫn không đổi. Token không góp vào phép đếm.",rule:"Token và pawn không tính rule. Building thì có."},
    {title:"Một đoàn thứ ba",story:"Đoàn C đến với hai warrior. A vẫn giữ làng: A = 3 lớn hơn B = 2 và C = 2. Hai đối thủ không tự cộng thành một phe.",rule:"So tổng của bạn với từng đối thủ, không với tổng tất cả đối thủ."},
    {title:"Một chiến binh làm thay đổi câu chuyện",story:"B thêm một warrior, thành 3. A và B hòa cao nhất: theo luật chung, không ai rule nữa. Bạn thử thêm hoặc bớt quân B bên dưới nhé.",rule:"Hòa cao nhất thì không ai rule theo luật chung. Năng lực riêng có thể thay đổi điều này."},
  ]},
  {id:"move",title:"Đoàn quân lên đường",subtitle:"Chọn một lối đi hợp lệ",reference:"§4.2",steps:[
    {title:"Kiểm tra hai đầu đường",story:"Bạn đang rule làng A. Làng B do đối thủ rule, nhưng đường nối vẫn mở: chỉ cần bạn rule đầu đi hoặc đầu đến, đoàn quân có thể bước qua.",rule:"Một move: một nhóm từ một clearing đến một clearing adjacent; phải rule ít nhất một đầu."},
    {title:"Tới làng B",story:"Hai warrior đi theo đường A → B. Building và token vẫn ở A. Hai đoàn quân cùng đứng trong B, chưa ai tự đánh nhau.",rule:"Move không tự tạo battle. Không tự mang building/token theo hay chia nhóm tới nhiều điểm đến."},
    {title:"Bạn chọn đường tiếp theo",story:"Bạn nhìn về làng C. B giờ hòa rule; C đang do bạn rule, nên B → C hợp lệ. Nhưng nhảy từ B thẳng tới góc xa của map thì không. Chọn một đường để thử.",rule:"Mỗi chặng là một move khác, kiểm tra rule lại. Không nhảy qua clearing giữa."},
  ]},
  {id:"ambush",title:"Tiếng động trong bụi cây",subtitle:"Ambush trước khi gieo",reference:"§4.3.1–4.3.2",steps:[
    {title:"Bạn chọn battle",story:"Ở làng Thỏ, A có ba warrior và chọn B làm defender. B rút một lá Ambush matching ra: cuộc phục kích xảy ra trước xúc xắc.",rule:"Battle chọn một enemy tại clearing có warrior/pawn của bạn. Không cần rule."},
    {title:"Hai hit bất ngờ",story:"A không có Ambush matching để chặn. Hai warrior A bị loại ngay. Một warrior còn lại vẫn có thể tiếp tục battle.",rule:"Ambush gây ngay 2 hit. Nếu không còn warrior/pawn tấn công, battle kết thúc trước khi gieo."},
    {title:"Nếu đã chuẩn bị trước",story:"Bạn tua lại khoảnh khắc ấy. Lần này A có Ambush matching, chơi nó để vô hiệu lá của B. Ba warrior còn nguyên; cả hai lá Ambush được bỏ.",rule:"Defender chơi tối đa một Ambush; attacker có thể foil bằng một Ambush matching. Chim thường thay suit được."},
  ]},
  {id:"battle",title:"Cuộc giao chiến ở làng B",subtitle:"Xúc xắc, hit và điểm",reference:"§4.3.3–4.3.6",steps:[
    {title:"Hai bên đối mặt",story:"Trong ví dụ mới, không có Ambush hay năng lực riêng: A tấn công với hai warrior, B có một warrior và một building. Các phe khác đứng ngoài trận.",rule:"Một battle chỉ chọn một defender. Ví dụ dùng luật chung, không áp dụng năng lực phe."},
    {title:"Xúc xắc rơi xuống bàn",story:"Hai xúc xắc ra 3 và 1. A lấy số lớn, B lấy số nhỏ. Người dẫn đường giữ tay A lại: “Bạn chỉ có hai warrior, nên hit từ xúc xắc chỉ là hai.”",rule:"Attacker lấy số lớn; defender số nhỏ. Hit từ xúc xắc tối đa bằng số warrior mỗi bên."},
    {title:"Cả hai bên chịu hit",story:"B nhận hai hit: mất warrior trước, rồi building. A vẫn nhận một hit của B và mất một warrior. B không mất quyền gây hit đã tính chỉ vì quân bị loại.",rule:"Chủ piece chọn mất gì, nhưng hết warrior mới mất building/token. Không có rút lui tự động."},
    {title:"Điểm đến từ đâu?",story:"A nhận một điểm vì building bị loại, không phải vì thắng trận hay giết warrior. Ở một ví dụ khác, defender không có warrior thì attacker có thêm một hit.",rule:"Mỗi enemy building/token bị loại cho 1 điểm. Defenseless thêm 1 hit; extra hit không bị giới hạn bởi số warrior."},
  ]},
  {id:"craft",title:"Một đôi giày cho hành trình",subtitle:"Kích hoạt crafting piece",reference:"§4.1.1–4.1.4",steps:[
    {title:"Bạn mang lá bài tới xưởng",story:"Lá bài Boots cần một crafting piece Thỏ. Bạn phải đợi đúng pha craft của phe mình và có đúng loại crafting piece mà phe sử dụng.",rule:"Suit trên đầu lá không phải chi phí craft. Đọc biểu tượng góc dưới trái và phần Crafting của phe."},
    {title:"Thợ trong làng Thỏ làm việc",story:"Bạn kích hoạt một crafting piece Thỏ. Piece vẫn nằm trên map; bạn chỉ đánh dấu rằng nó đã làm việc trong lượt này. Không cần bỏ một lá Thỏ khác để trả.",rule:"Mỗi crafting piece chỉ kích hoạt một lần mỗi lượt. Không tự loại piece. Nhiều biểu tượng cần nhiều piece đủ suit."},
    {title:"Đôi giày rời nguồn chung",story:"Nguồn còn một đôi Boots. Bạn lấy nó về Crafted Items, nhận một điểm của lá và bỏ lá bài. Đôi giày chưa tự cho bất kỳ phe nào quyền move thêm.",rule:"Craft item cần item còn trong nguồn và nhận điểm theo lá, trừ ngoại lệ. Hiệu ứng tức thời xong thì bỏ bài."},
    {title:"Bạn chọn piece nào để chịu hit?",story:"Trước khi rời xưởng, người dẫn đường hỏi lại chuyện battle: nếu còn một warrior và một building, nhận một hit thì bạn phải loại gì? Thử chọn hình bên dưới.",rule:"Warrior phải chịu hit trước building/token. Đây không phải lựa chọn tự do giữa hai loại."},
  ]},
  {id:"turn",title:"Một ngày của riêng bạn",subtitle:"Ba pha rồi chuyển lượt",reference:"§1.4",steps:[
    {title:"Birdsong · Bình minh",story:"Tiếng chim gọi khu rừng thức dậy. Bạn làm các bước Birdsong trên bảng phe từ trên xuống dưới. Hiệu ứng đầu pha diễn ra trước những việc khác.",rule:"Không có một bộ hành động đầu ngày giống nhau cho mọi phe."},
    {title:"Daylight · Ban ngày",story:"Bạn làm việc trong Daylight theo bảng phe: các hành động, chi phí và số lần đều do phe quyết định. Có phe craft lúc này, có phe craft ở pha khác.",rule:"Root không có quy tắc chung mọi phe được 3 hành động hoặc craft cùng lúc."},
    {title:"Evening · Buổi tối",story:"Bạn làm các bước Evening, rút và bỏ bài khi hướng dẫn yêu cầu. Nếu bước đó bảo giới hạn tay năm lá, lúc đó mới bỏ xuống năm; không bỏ ngay khi vừa có lá thứ sáu.",rule:"Số bài rút và cách tính điểm cuối ngày theo phe. Hoàn thành hành động trước khi bắt đầu việc khác."},
    {title:"Người bạn tiếp theo thức dậy",story:"Bạn kết thúc Evening. Người ngồi bên trái theo chiều kim đồng hồ bắt đầu ngày của họ. Không phải cả bàn cùng Birdsong rồi cùng Daylight.",rule:"Mỗi người đi trọn Birdsong → Daylight → Evening, rồi chuyển lượt theo chiều kim đồng hồ."},
  ]},
  {id:"victory",title:"Khu rừng ghi nhớ tên bạn",subtitle:"Chạm 30 điểm",reference:"§3.1–3.2 · §1.1–1.5",steps:[
    {title:"Cột mốc cuối cùng",story:"Qua nhiều ngày, bạn đã ở 29 điểm. Bạn có cách hợp lệ để kiếm thêm một điểm — ví dụ craft một item đang còn trong nguồn.",rule:"Kiếm điểm theo phe, craft item hoặc loại enemy building/token. Rule clearing tự nó không cho điểm."},
    {title:"Câu chuyện khép lại ngay",story:"Marker của bạn chạm 30. Người dẫn đường đóng sổ: “Bạn thắng rồi.” Bạn không phải làm tiếp Evening; các bạn khác không đi nốt một vòng cuối.",rule:"Thắng ngay tại 30. Nếu nhiều người cùng đạt 30, xét từ người đang đi lượt rồi theo chiều kim đồng hồ."},
    {title:"Lời hứa bên đống lửa",story:"Bạn bè hẹn lần sau không đánh nhau. Khu rừng cho phép mặc cả, nhưng lời hứa không ràng buộc. Cả nhóm giữ luật để câu chuyện tiếp tục công bằng.",rule:"Chỉ chuyển bài/piece khi luật cho phép. Luật phe/thẻ ghi đè luật chung khi mâu thuẫn; “cannot” là tuyệt đối trừ chỉ dẫn bỏ qua rõ ràng."},
  ]},
  {id:"dominance",title:"Một lời thề khác",subtitle:"Con đường Dominance",reference:"§3.3",steps:[
    {title:"Rời cuộc đua điểm",story:"Ở Daylight, bạn có ít nhất 10 điểm và kích hoạt Dominance trên tay. Bạn bỏ marker khỏi thang điểm, quyết định thắng bằng việc giữ những clearing quan trọng.",rule:"Không kiếm điểm nữa, không quay lại đua 30; Dominance đã kích hoạt không bỏ hoặc đổi. Một số phe có ngoại lệ."},
    {title:"Giữ ba làng cùng suit",story:"Với Dominance Thỏ, bạn rule ba clearing Thỏ. Nhưng giữa lượt chưa thắng: cả khu rừng còn một đêm để thay đổi tình hình.",rule:"Cáo/Thỏ/Chuột cần rule 3 clearing matching ở đầu Birdsong của bạn. Chim cần 2 góc đối diện."},
    {title:"Qua được đêm dài",story:"Birdsong của bạn bắt đầu, bạn vẫn rule ba làng Thỏ. Lúc này lời thề hoàn thành và bạn thắng ngay. Nếu mất một làng, câu chuyện phải tiếp tục.",rule:"Kiểm tra ở đầu Birdsong, không ngay khi đạt bố trí. Bàn 2 người không dùng Dominance theo setup."},
  ]},
];
