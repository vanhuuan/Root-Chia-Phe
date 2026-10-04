export const law="https://rules.ledergames.com/?locale=en-US&printing=p16&product=root";
export const moods=[
["Bitter","Hammer","Trước dice trong battle tại Warlord, có thể remove Mob ở đó hoặc clearing kề; mỗi Mob đổi thành 1 warrior tại Warlord."],
["Grandiose","Tea","Đổi thứ tự Daylight: Craft → Advance → Command."],
["Jubilant","Boot","Sau Incite tại Warlord, có thể lăn Mob die tối đa 4 lần, mỗi lần đặt Mob theo chất ở clearing chưa có Mob và kề bất kỳ Mob nào."],
["Lavish","Không có","Cuối Birdsong, có thể bỏ vĩnh viễn item Hoard; mỗi item đặt 2 warrior tại Warlord. Dồn item trên track sang trái."],
["Relentless","Bag","Nếu một Advance đã cả Move lẫn Battle, sau đó có thể thêm một Move Warlord cùng quân hoặc một Battle tại Warlord."],
["Rowdy","Coin","Evening rút thêm 1; nếu clearing Warlord có ít nhất 3 enemy pieces, thay vào đó rút thêm 2. Tổng rút là 2 hoặc 3."],
["Stubborn","Crossbow","Battle tại Warlord bỏ hit đầu nhận. Không cộng dồn với năng lực khác cùng bỏ hit đầu."],
["Wrathful","Sword","Khi tấn công tại clearing Warlord, gây thêm 1 hit."]
];
export const power=(n:number)=>n===0?1:n<=2?2:n;
export const oppress=(n:number)=>n===0?0:n<=2?1:n<=4?2:n===5?3:4;
export const topics=[
{id:"setup",title:"Thiết lập ban đầu",ref:"§14.3",steps:[
{title:"Đặt quân và chọn Mood",rule:"Standard Setup: chọn một clearing góc không phải góc khởi đầu của phe khác; nếu có thể, chọn góc chéo đối diện. Đặt Warlord, 4 chiến binh và 1 Stronghold tại đó. Bắt đầu với Mood Stubborn. ADSET dùng thẻ thiết lập riêng. Nguồn phe có 20 chiến binh thường, 1 Warlord và 6 Stronghold."},
{title:"Hoard và item dưới ruin",rule:"Hoard ban đầu trống: Command 1 và Prowess 1. Nếu chưa được đặt, xếp ngẫu nhiên bốn item R dưới các ruin; không thêm một bộ item R nữa nếu đã có từ thiết lập. Chưa có Mob trên bản đồ. Stronghold là công trình, Mob là token. Sơ đồ A–H chỉ là ví dụ, không thay thế đường nối của bản đồ thật."}]},
{id:"hoard",title:"Hoard: vật phẩm và sức mạnh",ref:"§14.2.4",steps:[
{title:"Hai thanh Command và Prowess",rule:"Boot, Bag và Coin thuộc thanh Command; Hammer, Tea, Sword và Crossbow thuộc thanh Prowess. Đếm item từng thanh riêng: 0 / 1 / 2 / 3 / 4 item cho sức mạnh 1 / 2 / 2 / 3 / 4. Command là giới hạn hành động chỉ huy; Prowess tăng Recruit và số lần Advance. Item trùng loại vẫn chiếm ô riêng, không cần lật hoặc tiêu item mỗi lần Move/Battle."},
{title:"Thêm item khi thanh đầy",rule:"Đặt item mới vào ô trống ngoài cùng trái của đúng thanh. Nếu thanh đó đầy, bỏ vĩnh viễn item mới hoặc một item trên cùng thanh và nhận 1 VP. Không chuyển item sang thanh sai loại còn trống. Lavish là hiệu ứng riêng, không tự cho 1 VP do đầy thanh. Hoard không phải Crafted Items box để phe khác mặc định lấy đồ như hộp thông thường."}]},
{id:"raze",title:"Birdsong: Raze và lan Mob",ref:"§14.4.1",steps:[
{title:"Xử lý từng clearing có Mob",rule:"Đầu Birdsong, tại mỗi clearing có Mob, loại toàn bộ công trình và token địch, lấy 1 item từ ruin nếu có, rồi loại ruin nếu đã lấy item cuối. Không loại chiến binh hay pawn bằng tác dụng Raze mặc định. Không cần thống trị clearing hoặc có chiến binh Chuột tại đó. Ghi VP khi loại công trình/token địch theo luật chung; vẫn áp dụng ngoại lệ ngăn loại bỏ. Dọn ruin không cho VP vì ruin không phải công trình địch."},
{title:"Lăn Mob die sau khi Raze",rule:"Sau khi xử lý mọi Mob hiện có, bắt buộc lăn Mob die một lần. Đặt 1 Mob tại clearing đúng chất, chưa có Mob và kề một clearing có Mob; nếu không có nơi hợp lệ thì không đặt. Không cần chiến binh ở nơi lan. Mob mới không Raze trong cùng Birdsong. Dù không có Mob nào vẫn lăn die, nhưng không thể đặt nếu không có clearing kề Mob."}]},
{id:"recruit",title:"Birdsong: Recruit",ref:"§14.4.2–3",steps:[
{title:"Tuyển quân tại Warlord và Stronghold",rule:"Đặt số chiến binh bằng Prowess tại clearing của Warlord, rồi đặt 1 chiến binh tại mỗi Stronghold. Nếu Warlord cùng một Stronghold, clearing nhận cả hai khoản. Đặt theo nguồn quân còn lại, không cần thống trị. Prowess được xét sau Raze nên item vừa lấy từ ruin có thể tăng số quân tuyển ngay Birdsong này."},
{title:"Recruit diễn ra trước Anoint",rule:"Nếu Warlord không có trên bản đồ, không đặt được khoản quân Prowess tại Warlord; các Stronghold vẫn tuyển quân bình thường. Sau đó mới Anoint. Không thực hiện lại Recruit sau khi Warlord được đặt lại. Thứ tự Birdsong là Raze → Recruit → Anoint → Choose Mood."}]},
{id:"anoint",title:"Warlord và Anoint",ref:"§14.2.2; §14.4.3",steps:[
{title:"Đặt lại Warlord vắng bản đồ",rule:"Nếu Warlord không ở trên bản đồ, bắt buộc Anoint: thay một chiến binh Chuột tại một clearing bằng Warlord, trả chiến binh được thay về nguồn. Nếu không thể thay chiến binh nào, đặt Warlord tại clearing bất kỳ. Không thêm Warlord bên cạnh chiến binh khi có thể thay. Warlord chỉ được đặt qua thiết lập hoặc Anoint, không qua hiệu ứng đặt chiến binh thông thường."},
{title:"Warlord là chiến binh có luật riêng",rule:"Warlord không thể bị loại ngoài battle và không thể di chuyển ngoài lượt Chuột. Trong battle, bạn có thể chọn nhận hit bằng Warlord hoặc chiến binh thường; không bắt buộc giữ Warlord đến khi hết quân thường. Warlord tính vào số chiến binh, giới hạn rolled hits và thống trị. Hiệu ứng không loại được Warlord vẫn có thể loại các piece khác."}]},
{id:"mood",title:"Birdsong: Choose Mood",ref:"§14.4.4; §14.7",steps:[
{title:"Chọn Mood khác và không bị item khóa",rule:"Phải đổi sang Mood khác Mood hiện tại và không được chọn Mood có icon item đang nằm trong Hoard. Boot khóa Jubilant, Sword khóa Wrathful. Không được giữ Stubborn liên tục dù không có Crossbow. Ngoại lệ: đang Lavish và không thể chọn Mood mới thì giữ Lavish. Điều kiện xét loại item trong Hoard, không xét trạng thái đã dùng."},
{title:"Thời điểm và phạm vi năng lực",rule:"Raze và Recruit diễn ra trước Choose Mood. Lavish xử lý cuối Birdsong; bỏ item có thể giảm Command/Prowess của Daylight. Wrathful cho thêm hit khi tấn công tại clearing Warlord; Stubborn bỏ hit đầu nhận trong battle tại đó. Đội quân đánh ở clearing khác không hưởng các bonus này. Mỗi Mood khác có điều kiện riêng trong bảng tra."}]},
{id:"craft",title:"Daylight: Craft",ref:"§14.2.1,3; §14.5.1",steps:[
{title:"Chế tác bằng Stronghold",rule:"Đầu Daylight, kích hoạt Stronghold theo chất clearing để trả chi phí craft. Mỗi crafting piece chỉ kích hoạt một lần mỗi lượt. Không dùng Warlord, chiến binh hoặc Mob làm crafting piece. Stronghold xây trong Command diễn ra sau bước Craft; không quay lại Craft để dùng công trình mới."},
{title:"Contempt for Trade",rule:"Khi craft item, chọn giữ item vào Hoard và không nhận VP in trên lá, hoặc bỏ item vĩnh viễn để nhận VP in trên lá. Không nhận đồng thời cả item và VP in trên card. Extra crafting VP từ hiệu ứng riêng vẫn áp dụng. Craft hiệu ứng không phải item theo card như thường; item cần còn trong nguồn."}]},
{id:"command",title:"Daylight: Command",ref:"§14.5.2",steps:[
{title:"Move, Battle hoặc Build",rule:"Sau Craft, thực hiện tối đa số hành động bằng Command, mỗi hành động là một Move, Battle hoặc Build. Move/Battle không bắt buộc tại Warlord. Một Command thông thường không gồm cả Move lẫn Battle. Move tuân theo đường nối và cần thống trị ở nguồn hoặc đích. Có thể dùng ít hơn giới hạn hành động."},
{title:"Điều kiện Build Stronghold",rule:"Spend 1 card đúng chất để đặt Stronghold tại clearing bạn thống trị, có ô công trình trống và Stronghold trong nguồn. Không trả chi phí bằng chiến binh. Card Chim là chất thay thế theo luật chung; nếu có enclave Ếch thì xét chất clearing hiện tại. Token không góp thống trị; chiến binh và công trình có góp. Stronghold không di chuyển cùng quân."}]},
{id:"advance",title:"Daylight: Advance",ref:"§14.5.3",steps:[
{title:"Move Warlord rồi Battle",rule:"Sau Command, thực hiện tối đa số lần Advance bằng Prowess. Mỗi lần có thể Move Warlord cùng bất kỳ số chiến binh Chuột tại nguồn, rồi có thể Battle tại clearing của Warlord. Mỗi phần đều tùy chọn; nếu làm cả hai phải Move trước. Move vẫn cần đường nối và thống trị ở nguồn hoặc đích. Không dùng Advance cho đội quân không có Warlord."},
{title:"Giới hạn Command và Advance riêng biệt",rule:"Một Advance có cả Move và Battle chỉ dùng một lần trong giới hạn Prowess. Không chuyển Command thừa thành Advance. Grandiose đổi thứ tự hai bước, không cho trộn chúng tùy ý. Relentless chỉ cho hành động thêm khi cùng một Advance đã thực hiện cả Move lẫn Battle. Nếu Warlord vắng bản đồ, không thay bằng chiến binh thường để thực hiện Advance."}]},
{id:"battle",title:"Battle và dọn piece địch",ref:"§4.3; §14.6.2",steps:[
{title:"Nhận hit và loại piece",rule:"Battle theo luật chung: rolled hits bị giới hạn bởi số chiến binh, chiến binh chịu hit trước công trình/token. Warlord góp một chiến binh; Chuột chọn mất Warlord hoặc chiến binh thường. Ví dụ tương tác bỏ qua Ambush và các hiệu ứng khác, giả định giữ Warlord. Loại chiến binh địch không tự cho 1 VP mỗi quân."},
{title:"Thống trị chưa đủ để Oppress",rule:"Loại công trình/token địch thường cho 1 VP mỗi piece, riêng với khoản Oppress cuối lượt. Clearing còn bất kỳ piece địch nào đều chưa đủ điều kiện Oppress, dù Chuột đã thống trị. Công trình, token và pawn địch còn lại vẫn chặn; có nhiều quân hơn không tự loại chúng."}]},
{id:"loot",title:"Looters: lấy item qua battle",ref:"§14.2.5",steps:[
{title:"Tuyên bố loot ở đầu battle",rule:"Khi là attacker, ở đầu battle có thể tuyên bố loot defender có item trong Crafted Items box. Không loot Vagabond và không chờ sau khi lăn dice mới chọn. Khi loot, Chuột gây 0 rolled hits nhưng vẫn nhận rolled hits từ defender và có thể gây extra hits. Extra hit như Wrathful vẫn áp dụng khi đúng điều kiện. Loot không phải một hành động lấy item tự do."},
{title:"Lấy item nếu thống trị cuối battle",rule:"Cuối battle, nếu Chuột thống trị clearing đó, lấy 1 item từ Crafted Items box của defender vào Hoard. Không cần loại hết piece của defender; hòa thống trị thông thường không đủ. Không tự nhận VP in trên card của item lấy. Loot thành công có thể vẫn chưa đủ điều kiện Oppress vì còn piece địch."}]},
{id:"incite",title:"Evening: Incite",ref:"§14.6.1",steps:[
{title:"Đặt Mob bằng card đúng chất",rule:"Spend card đúng chất để đặt Mob tại clearing có chiến binh Chuột, kể cả Warlord, và chưa có Mob. Có thể làm nhiều lần nếu đủ điều kiện, card và Mob trong nguồn. Không cần thống trị hoặc có công trình địch. Chỉ có Stronghold hoặc Mob mà không có chiến binh tại clearing đích thì chưa đủ. Mỗi clearing không chứa hai Mob Chuột."},
{title:"Mob mới chờ Birdsong sau để Raze",rule:"Incite không loại ngay công trình, token hoặc quân địch. Mob Raze vào Birdsong lượt sau nếu còn trên bản đồ; đối thủ có thể loại Mob trước đó. Mob không góp thống trị. Đối thủ loại Mob thường ghi VP như token khác. Jubilant cho thêm các lần lan chỉ sau Incite tại Warlord, không sau mọi Incite trên bản đồ."}]},
{id:"oppress",title:"Evening: Oppress",ref:"§14.6.2",steps:[
{title:"Ba điều kiện cho mỗi clearing",rule:"Clearing được tính khi bạn thống trị, có ít nhất một piece Chuột và hoàn toàn không có piece địch. Chiến binh, công trình, token và pawn địch đều có thể chặn; token địch vẫn chặn dù không góp thống trị. Ruin, item dưới ruin và marker bản đồ trung lập không phải piece phe địch. Mob đơn độc không tự tạo thống trị. Khi có Mercenary, vẫn cần piece Chuột thật; chỉ quân thuê không đáp ứng điều kiện đó."},
{title:"Tính VP sau Incite",rule:"Đếm clearing hợp lệ: 0 → 0 VP; 1–2 → 1 VP; 3–4 → 2 VP; 5 → 3 VP; 6 trở lên → 4 VP. Ghi sau Incite, trước Draw. Chỉ xét trạng thái ở bước Oppress Evening, không tính mọi clearing từng chiếm trong lượt. Các nguồn VP khác cộng riêng."}]},
{id:"moods",title:"Năng lực tám Mood",ref:"§14.7",steps:[
{title:"Bitter và Rowdy",rule:"Bitter: trước dice trong battle tại clearing Warlord, có thể loại Mob ở đó hoặc clearing kề; mỗi Mob đặt 1 chiến binh tại Warlord. Không lấy Mob khắp bản đồ. Rowdy: Evening rút thêm 1 card; nếu clearing Warlord có ít nhất 3 piece địch, thay vào đó rút thêm 2. Tổng rút là 2 hoặc 3 card, không đếm piece địch toàn bản đồ."},
{title:"Lavish, Jubilant và các Mood khác",rule:"Lavish: cuối Birdsong, có thể bỏ vĩnh viễn item Hoard; mỗi item đặt 2 chiến binh tại Warlord, rồi dồn item trên thanh sang trái. Jubilant: sau Incite tại Warlord, có thể lăn Mob die tối đa 4 lần, mỗi lần đặt theo điều kiện lan Mob. Grandiose đảo Command/Advance. Relentless yêu cầu cả Move và Battle trong một Advance để thêm một Move hoặc Battle. Tra bảng bên dưới để xem đủ điều kiện và item khóa của tám Mood."}]},
{id:"turn",title:"Thứ tự một lượt",ref:"§14.4–6",steps:[
{title:"Birdsong và Daylight",rule:"Birdsong: Raze Mob cũ và lăn die lan một lần → Recruit → Anoint nếu thiếu Warlord → Choose Mood; Lavish xử lý cuối Birdsong. Daylight: Craft → Command → Advance; Grandiose đảo hai bước cuối. Không Recruit lại sau Anoint và không Craft lại bằng Stronghold vừa xây sau bước Craft. Công trình và Mob ở lại khi quân Move."},
{title:"Evening và giới hạn bài trên tay",rule:"Evening: Incite → Oppress → rút 1 card, cộng bonus Rowdy nếu có → discard xuống 5 card. Mob đặt trong Evening không Raze ngay tối đó. Các ví dụ tương tác độc lập, không phải một trận mô phỏng liên tục; trên bàn thật vẫn áp dụng hiệu ứng card, map, hireling và thiết lập riêng."}]}
];
export const faqs=[
["Warlord có phải pawn như Vagabond?","Không, là warrior; góp rule, giới hạn hits và số warrior trong battle."],
["Warlord bắt buộc chết sau lính thường?","Không. Chuột chọn chịu hit bằng Warlord hoặc quân thường trong battle, khác Captain của Hảo hán."],
["Favor hoặc Revolt loại Warlord không?","Không thể remove Warlord ngoài battle; các piece khác vẫn bị ảnh hưởng nếu hiệu ứng áp dụng."],
["Mất Warlord có được tuyển bằng Prowess ngay lúc Anoint?","Không. Recruit xảy ra trước Anoint, không làm lại. Stronghold vẫn Recruit trước đó."],
["Mob có cần rule để Raze?","Không. Mob tự Raze theo bước Birdsong, không cần warrior Chuột tại đó."],
["Raze có loại warrior hoặc pawn?","Không theo tác dụng Raze mặc định. Nó remove enemy buildings và tokens; warrior/pawn còn lại."],
["Mob vừa lan có đốt ngay không?","Không. Resolve mọi Mob cũ rồi mới lăn die lan một token mới. Token mới chờ Birdsong sau."],
["Không có Mob nào có lăn Mob die không?","Có. Nhưng không có clearing kề Mob thì không đặt được token từ lần lan ấy."],
["Mob lan có cần lính tại đích không?","Không. Điều kiện lan khác Incite: matching die, chưa Mob và kề clearing có Mob."],
["Incite có cần rule không?","Không. Cần card matching, warrior Chuột tại đích, chưa Mob và token nguồn."],
["Chỉ có Stronghold thì Incite được?","Không, cần warrior Chuột hoặc Warlord tại clearing."],
["Incite tối nay có đốt building tối nay?","Không. Raze ở đầu Birdsong lượt tiếp của Chuột, nếu Mob còn."],
["Mob hay Stronghold có đi theo Move không?","Không. Move di chuyển warrior và Warlord hợp lệ, không di chuyển building/token này."],
["Command 2 và Prowess 2 có phải 4 action giống nhau?","Không. Command là 2 Move/Battle/Build; Prowess là 2 Advance, mỗi lần có thể Move Warlord rồi Battle."],
["Advance bắt buộc cả Move và Battle?","Không. Mỗi phần tùy chọn; nếu làm cả hai thì Move trước Battle. Relentless cần cả hai để có phần thêm."],
["Stronghold mới xây craft ngay?","Không trong trình tự mặc định: Craft đã qua trước Command Build. Không quay lại bước Craft."],
["Craft item vừa lấy item vừa lấy VP?","Contempt for Trade buộc chọn giữ item không lấy VP in trên lá, hoặc bỏ item vĩnh viễn để nhận VP in trên lá. Extra VP từ hiệu ứng riêng vẫn có thể có."],
["Track Hoard đầy nhưng track kia còn trống?","Không chuyển sai loại. Bỏ item mới hoặc một item ở track đúng đang đầy; nhận 1 VP theo luật đầy track."],
["Item có cần lật xuống để Move?","Không. Hoard tăng Command/Prowess qua số item, không có vòng exhausted như Vagabond hoặc Stash Captain."],
["Có Boot thì chọn Jubilant được không?","Không khi Boot còn trong Hoard. Mỗi Mood có icon bị khóa bởi item tương ứng, Lavish không có icon."],
["Không có Crossbow thì giữ Stubborn liên tục?","Không, phải đổi sang Mood khác. Ngoại lệ duy nhất ghi ở luật là đang Lavish mà không thể chọn Mood mới."],
["Loot có gây rolled hits?","Chuột gây 0 rolled hits, nhưng extra hits vẫn có thể có; defender vẫn gây rolled hits bình thường."],
["Loot cần sạch clearing?","Không. Cuối battle chỉ cần rule; Oppress còn cần không enemy pieces. Có thể loot thành công nhưng chưa Oppress."],
["Loot Vagabond được không?","Không. Looters nhắm Crafted Items box của defender hợp lệ, không lấy đồ Vagabond."],
["Token địch không góp rule có chặn Oppress?","Có. Bất kỳ enemy piece nào còn lại đều chặn điều kiện sạch."],
["Mob đơn độc cho Oppress?","Mob không góp rule, nên riêng Mob không đủ nếu bạn không rule bằng nguồn hợp lệ khác. Vẫn phải có piece Chuột."],
["Năm clearing sạch cho bao nhiêu VP?","3 VP Oppress. Sáu trở lên cho 4 VP; không phải mỗi clearing một điểm."],
["Ruin và item dưới ruin chặn Oppress?","Không phải enemy faction pieces nên không tự chặn điều kiện này."],
["Rowdy ở ba enemy pieces rút tổng bao nhiêu?","Tổng 3 lá trong bước Draw Evening: 1 thường + 2 thêm, thay vì +1 thêm."],
["Bitter có lấy Mob cả map để thêm lính?","Không. Chỉ Mob tại Warlord hoặc clearing kề, trước dice trong battle tại Warlord."]
];
