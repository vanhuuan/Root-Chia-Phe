import type {RuleTopic} from "../../rule-book";
import type {ItemKind} from "./model";
export const law="https://cdn.shopify.com/s/files/1/0106/0162/7706/files/Root_Base_Law_Oct_2025.pdf?v=1774903758";
export const characters:{id:string;name:string;set:string;items:ItemKind[];ability:string;note:string}[]=[
{id:"thief",name:"Thief · Kẻ trộm",set:"Base",items:["boot","torch","tea","sword"],ability:"Steal: dùng 1 Đuốc để lấy ngẫu nhiên 1 lá của người có piece phe tại clearing của bạn.",note:"Đuốc đã dùng để Steal không thể Explore ngay nếu chưa refresh. Không tự nhận VP cho việc trộm."},
{id:"tinker",name:"Tinker · Thợ sửa",set:"Base",items:["boot","torch","bag","hammer"],ability:"Day Labor: dùng 1 Đuốc để lấy 1 lá trong discard matching clearing; luôn được lấy lá Chim.",note:"Có Búa từ đầu để sửa/craft, nhưng chưa có Kiếm để Battle. Không tự craft được lá cần nhiều búa hoặc sai suit."},
{id:"ranger",name:"Ranger · Kiểm lâm",set:"Base",items:["boot","torch","crossbow","sword"],ability:"Hideout: dùng 1 Đuốc để repair 3 item, rồi lập tức kết thúc Daylight và sang Evening.",note:"Repair giữ nguyên mặt item. Hideout không tự đưa bạn vào rừng; nếu đang ở clearing, Evening không có Rest trong rừng."},
{id:"vagrant",name:"Vagrant · Kẻ phiêu bạt",set:"Riverfolk",items:["coin","torch","boot"],ability:"Instigate: dùng 1 Đuốc để ép một người (kể cả bạn) battle người khác tại clearing của bạn. Building/token bị loại được tính như bạn loại; ghi VP cơ bản và Infamy theo luật.",note:"Đây là battle bị ép, vẫn phải khởi xướng hợp lệ. Warrior bị hai phe khác loại không tự coi là bạn loại để chuyển quan hệ."},
{id:"arbiter",name:"Arbiter · Trọng tài",set:"Riverfolk",items:["boot","torch","sword","sword"],ability:"Protector: trước khi roll, phe phòng thủ tại clearing có bạn có thể nhờ bạn. Bạn +1 VP; họ cộng số Kiếm lành của bạn vào trần rolled hit.",note:"Không exhaust kiếm cho Protector. Không tự nhờ mình, không được nhờ để chống lại chính mình; không biến bạn thành phe phòng thủ nhận hit thay họ."},
{id:"scoundrel",name:"Scoundrel · Kẻ phá hoại",set:"Riverfolk",items:["boot","boot","torch","crossbow"],ability:"Scorched Earth: dùng Đuốc, đặt nó tại clearing để loại mọi piece địch ở đó. Từ đó không được place hoặc move piece vào clearing này.",note:"Bạn vẫn ở đó; rời đi rồi không quay lại được. Đuốc nằm trên map nên mất khả năng dùng nó; đây không phải battle để nhận Infamy."},
{id:"adventurer",name:"Adventurer · Nhà thám hiểm",set:"Vagabond Pack",items:["boot","torch","hammer"],ability:"Improvise: tối đa 1 lần/lượt khi Quest, coi 1 item chưa exhaust như item khác cần cho quest. Khi exhaust item ấy, cũng damage nó.",note:"Chỉ thay 1 trong 2 item của quest. Vẫn cần item lành, sẵn dùng; vẫn phải matching clearing."},
{id:"harrier",name:"Harrier · Chim săn",set:"Vagabond Pack",items:["coin","torch","sword","crossbow"],ability:"Glide: dùng 1 Đuốc để move riêng pawn đến bất kỳ clearing trên map, kể cả Hostile, bỏ adjacency và đường đi, không dùng Giày.",note:"Không kéo quân Allied bằng Glide, không Glide vào forest. Không có Giày khởi đầu nhưng vẫn có Slip."},
{id:"ronin",name:"Ronin · Lãng nhân",set:"Vagabond Pack",items:["boot","boot","torch","sword"],ability:"Swift Strike: sau khi roll trong battle, có thể exhaust 1 Kiếm để gây +1 extra hit.",note:"Nếu dùng kiếm duy nhất để khởi xướng, nó đã úp nên không thể dùng lại cho Swift Strike. Extra hit không bị trần rolled hit giới hạn."},
{id:"cheat",name:"Cheat · Kẻ gian",set:"Homeland",items:["boot","tea","crossbow","torch"],ability:"Con: 1 lần/lượt, làm Quest bằng bất kỳ 2 item thay cặp được yêu cầu. Chọn điểm hoặc bài và thay quest như thường, rồi xáo quest vừa hoàn thành vào quest deck.",note:"Quest đó không nằm lại trong số quest đã hoàn thành cho lần tính điểm sau. Vẫn cần đúng suit clearing và 2 item dùng được."},
{id:"gladiator",name:"Gladiator · Đấu sĩ",set:"Homeland",items:["boot","torch","hammer"],ability:"Duel: exhaust rồi damage 1 item để loại 1 warrior địch tại clearing của bạn và rút 1 lá. Không chuyển sang Hostile vì Duel.",note:"Duel không phải battle và không có Infamy. Ngoại lệ không Hostile chỉ dành cho Duel, không áp dụng Battle/Strike của bạn."},
{id:"jailor",name:"Jailor · Cai ngục",set:"Homeland",items:["boot","crossbow","torch"],ability:"Coerce: 1 lần/lượt, spend lá matching clearing để thay việc exhaust 1 item. Sau hành động được trả/thêm bằng cách này, mất 1 VP. Có thể chen vào hành động trong lượt của bạn.",note:"Có thể thay 1 item cho Repair, Craft, Aid, Quest hoặc trả dịch vụ Riverfolk theo luật. Không tự biến thành item sở hữu hay Kiếm lành để tăng trần hit."}
];
export const topics:RuleTopic[]=[
  {
    "id": "setup",
    "title": "Chuẩn bị và đặc điểm của pawn",
    "ref": "§9.2.2; §9.3",
    "steps": [
      {
        "title": "Pawn và quyền cai trị",
        "rule": "Pawn không phải warrior, không rule và không chặn phe khác rule. Pawn không bị loại khỏi map. Nếu hiệu ứng loại mọi piece địch như Revolt/Bom tác động bạn, damage 3 item thay vì lấy pawn ra."
      },
      {
        "title": "Standard Setup",
        "rule": "Standard: chọn character, pawn ở một forest bất kỳ, mở 3 quest, mỗi ruin 1 item R; lấy item S đúng character; quan hệ với mọi phe không phải Vagabond ở Indifferent. ADSET theo thẻ riêng; hai Vagabond dùng luật riêng ở cảnh cuối."
      }
    ]
  },
  {
    "id": "characters",
    "title": "Nhân vật và kỹ năng riêng",
    "ref": "Phụ lục V.1–V.12",
    "steps": [
      {
        "title": "Chọn nhân vật và item khởi đầu",
        "rule": "Chọn character trước khi lấy item khởi đầu. Đọc đủ item và timing kỹ năng, không dùng kỹ năng Knave Captain cùng tên thay luật Vagabond. Các nút dưới đây là bảng tra cả 12 character, không phải mọi bộ game đều có đủ."
      },
      {
        "title": "Chi phí và thời điểm dùng kỹ năng",
        "rule": "Special Action dùng đúng item/timing trên thẻ. Một số kỹ năng là hiệu ứng trong battle, không phải hành động Daylight độc lập. Item phải ngửa và lành để exhaust, trừ ngoại lệ nêu rõ."
      }
    ]
  },
  {
    "id": "items",
    "title": "Trạng thái item và các track",
    "ref": "§9.2.5–9.2.7",
    "steps": [
      {
        "title": "Exhaust và Damage",
        "rule": "Exhaust: lật item ngửa, lành thành úp. Damage: đưa item lành vào Damaged box, giữ mặt hiện tại. Một item có thể vừa hỏng vừa úp. Item hỏng không thể exhaust để trả hành động."
      },
      {
        "title": "Track Trà, Tiền và Túi",
        "rule": "Track Trà/Tiền/Túi chỉ chứa item lành, ngửa. Mỗi track tối đa 3. Item dư ngửa ở Satchel vẫn tính sức chứa và không cho bonus track. Satchel và Damaged đều tính sức chứa; item trên track không tính."
      }
    ]
  },
  {
    "id": "refresh",
    "title": "Refresh trong Birdsong",
    "ref": "§9.4.1",
    "steps": [
      {
        "title": "Ngân sách Refresh",
        "rule": "Refresh: 2 item úp cho mỗi Trà ngửa trên Refresh track khi bước bắt đầu, rồi thêm 3 item úp. Chọn item cần lật; Trà vừa refresh không tăng ngân sách của bước hiện tại."
      },
      {
        "title": "Refresh và Repair",
        "rule": "Refresh đổi mặt, không bỏ trạng thái hỏng. Repair đổi trạng thái hỏng, không đổi mặt. Dùng ngân sách refresh cho đồ hỏng có thể hữu ích để chuẩn bị Repair sau đó."
      }
    ]
  },
  {
    "id": "slip",
    "title": "Slip trong Birdsong",
    "ref": "§9.4.2; §9.2.10",
    "steps": [
      {
        "title": "Move miễn Giày",
        "rule": "Slip tùy chọn, một move ở Birdsong, không exhaust Giày. Cho phép vào/ra forest theo adjacency. Bỏ mọi hiệu ứng ngăn move ra clearing, ví dụ Snare Quạ."
      },
      {
        "title": "Adjacency và giới hạn của Slip",
        "rule": "Nimble bỏ yêu cầu rule; Slip bỏ chi phí Giày và hạn chế move ra. Không tự bỏ adjacency hay mọi lệnh cấm move vào. Muốn vào forest bình thường, giữ Slip cho bước này."
      }
    ]
  },
  {
    "id": "move",
    "title": "Move trong Daylight",
    "ref": "§9.5.1; §9.2.3; §9.2.9.IIIb",
    "steps": [
      {
        "title": "Chi phí Giày và Hostile",
        "rule": "Move thường: 1 Giày + 1 nếu đích có bất kỳ warrior Hostile. Nhiều phe Hostile cùng đó vẫn chỉ thêm 1. Building/token Hostile không có warrior không làm tăng chi phí."
      },
      {
        "title": "Move giữa clearing và forest",
        "rule": "Move thường bỏ yêu cầu rule nhờ Nimble, vẫn cần adjacency và đường hợp lệ giữa clearings. Không Move thường vào forest hoặc forest sang forest. Slip mới cho move vào forest; kỹ năng riêng đọc đúng ngoại lệ."
      }
    ]
  },
  {
    "id": "explore",
    "title": "Explore ruin",
    "ref": "§9.5.3",
    "steps": [
      {
        "title": "Chi phí và phần thưởng",
        "rule": "Explore tại clearing hiện tại: exhaust 1 Đuốc, lấy 1 item dưới ruin, +1 VP nếu thực sự lấy item. Nếu đó là item cuối, loại ruin để mở slot. Không cần rule và không lấy item từ nguồn craft."
      },
      {
        "title": "Nguồn item R và giới hạn Explore",
        "rule": "Không nhận VP lần nữa khi chỉ dùng item. Một ruin có 2 item trong game hai Vagabond cần hai Explore để lấy cả hai; chỉ lấy 1 item mỗi action và áp dụng giới hạn item R."
      }
    ]
  },
  {
    "id": "aid",
    "title": "Aid",
    "ref": "§9.5.4",
    "steps": [
      {
        "title": "Điều kiện và nhận item",
        "rule": "Aid cần: item ngửa lành bất kỳ + lá matching clearing + đối tượng có piece phe ở cùng clearing. Nhận tối đa 1 item từ Crafted Items box của họ, ngửa; họ không được từ chối hành động hợp lệ."
      },
      {
        "title": "Aid khi không có item hoặc đang Hostile",
        "rule": "Lấy item là tùy chọn, không phải điều kiện để Aid. Có thể Aid người chơi Hostile; vẫn trả đủ và có thể lấy item, nhưng không cải thiện quan hệ bằng Aid. Không lấy item khởi đầu/ruin từ board Vagabond khác."
      }
    ]
  },
  {
    "id": "relationships",
    "title": "Cải thiện quan hệ",
    "ref": "§9.2.9.I–IIa",
    "steps": [
      {
        "title": "Số Aid và VP mỗi mức",
        "rule": "Chi phí theo từng chặng là 1 → 2 → 3 Aid; VP lên mức là +1 → +2 → +2. Một Aid chỉ trả cho một lần cải thiện. Có thể lên nhiều mức trong cùng lượt nếu đủ 6 Aid từ Indifferent."
      },
      {
        "title": "Tiến độ trong lượt và Allied",
        "rule": "Chỉ tiến độ chưa đủ ngưỡng reset khi hết lượt; mức quan hệ giữ lại. Sau khi đã Allied, mỗi Aid tiếp theo +2 VP. Aid đạt Allied chỉ nhận +2 cho việc lên mức, không cộng thêm +2 lần nữa."
      }
    ]
  },
  {
    "id": "allied",
    "title": "Warrior Allied",
    "ref": "§9.2.9.IIb–IId",
    "steps": [
      {
        "title": "Di chuyển và tấn công cùng quân",
        "rule": "Chỉ chọn 1 phe Allied mỗi move/battle. Trần rolled hit khi dùng họ = Kiếm lành + số warrior Allied tham chiến. Không dùng warrior của chính phe bạn đang tấn công. Không mang họ bằng move chỉ cho pawn như Glide."
      },
      {
        "title": "Nhận hit và chuyển Hostile",
        "rule": "So toàn bộ hit bạn nhận bằng warrior Allied và bằng damage item trong cùng battle. Allied mất nhiều hơn → Hostile cuối battle; bằng nhau thì không. Đây là ngoại lệ riêng, không chuyển Hostile ngay sau warrior Allied đầu tiên."
      }
    ]
  },
  {
    "id": "battle",
    "title": "Battle và nhận hit",
    "ref": "§9.2.4; §9.2.6–9.2.7; §9.5.2; §4.3",
    "steps": [
      {
        "title": "Kiếm và trần rolled hit",
        "rule": "Battle tốn 1 Kiếm. Trần rolled hit = tổng Kiếm lành trong Satchel, ngửa hoặc úp, cộng warrior Allied nếu dùng. Extra hit không bị trần này giới hạn. Không có Kiếm ngửa thì không khởi xướng bằng Battle thường."
      },
      {
        "title": "Damage item và Defenseless",
        "rule": "Khi phòng thủ, không cần exhaust Kiếm. Có Kiếm lành úp vẫn không defenseless; chỉ khi không còn Kiếm lành thì bên tấn công có +1 extra hit defenseless. Ambush và hiệu ứng battle khác vẫn áp dụng."
      }
    ]
  },
  {
    "id": "hostile",
    "title": "Hostile và Infamy",
    "ref": "§9.2.9.III; §3.2.1",
    "steps": [
      {
        "title": "Chuyển Hostile và tính điểm",
        "rule": "Infamy = +1 VP mỗi piece Hostile bạn loại trong battle trong lượt của mình, trừ warrior làm họ Hostile. Building/token còn cho +1 cơ bản. Chỉ loại building/token của phe chưa Hostile không tự làm họ Hostile."
      },
      {
        "title": "Phòng thủ, Strike và chi phí Move",
        "rule": "Infamy cần đủ hai điều: trong battle và trong lượt của bạn. Hostile không về lại thân thiện bằng Aid. Move thường vào clearing có warrior Hostile tốn thêm 1 Giày; Slip không tốn thêm."
      }
    ]
  },
  {
    "id": "strike",
    "title": "Strike bằng Nỏ",
    "ref": "§9.5.6",
    "steps": [
      {
        "title": "Chọn mục tiêu hợp lệ",
        "rule": "Strike exhaust 1 Nỏ; không roll, không ambush, không nhận hit phòng thủ. Kiểm tra warrior của chính phe mục tiêu, không phải tất cả quân trên clearing. Không dùng Strike để ưu tiên building khi phe ấy vẫn có warrior."
      },
      {
        "title": "VP và thay đổi quan hệ",
        "rule": "Strike không phải battle. Loại warrior thường 0 VP; loại building/token +1 VP theo luật chung. Khi loại warrior phe chưa Hostile, đổi quan hệ; skill có ngoại lệ nêu rõ thì theo skill."
      }
    ]
  },
  {
    "id": "quest",
    "title": "Quest",
    "ref": "§9.5.5",
    "steps": [
      {
        "title": "Suit clearing và item yêu cầu",
        "rule": "Quest cần đúng suit clearing và đủ 2 item ngửa lành được ghi. Nếu cần 2 cùng loại phải có 2 item riêng. Không spend lá matching để thay item theo luật thường. Skill Adventurer/Cheat là ngoại lệ."
      },
      {
        "title": "Chọn VP hoặc rút bài",
        "rule": "Chọn +VP bằng số quest đã hoàn thành cùng suit, tính cả quest mới, HOẶC rút 2 lá, không cả hai. Sau đó rút quest mới thay chỗ. Quest suit khác không góp vào số điểm lần này; Cheat đưa quest Con trở lại deck."
      }
    ]
  },
  {
    "id": "craft",
    "title": "Craft bằng Búa",
    "ref": "§9.2.1; §9.5.8; §4.1",
    "steps": [
      {
        "title": "Trả crafting icons",
        "rule": "Craft theo crafting icons, không theo suit lá bài. Exhaust 1 Búa mỗi icon; clearing hiện tại phải matching tất cả icon. Búa cho kích hoạt pawn nhiều lần, bỏ giới hạn 1 lần/piece; không tự cho cùng Búa exhaust nhiều lần."
      },
      {
        "title": "Nhận item và xử lý hiệu ứng",
        "rule": "Cost gồm nhiều suit khác nhau thường không trả được tại một clearing thường. Không craft item đã hết nguồn. Không chia một lần craft qua nhiều clearing. Có thể di chuyển rồi craft lá khác nếu còn item trả hành động."
      }
    ]
  },
  {
    "id": "repair",
    "title": "Repair và Rest",
    "ref": "§9.5.7; §9.6.1",
    "steps": [
      {
        "title": "Repair giữ nguyên mặt item",
        "rule": "Repair exhaust 1 Búa, sửa đúng 1 item, giữ mặt. Item Trà/Tiền/Túi được sửa ngửa về track nếu còn chỗ. Búa hỏng không thể tự dùng để sửa chính nó."
      },
      {
        "title": "Rest ở đầu Evening",
        "rule": "Rest chỉ khi ở forest, vào đầu Evening. Chỉ các item trong Damaged box được sửa và lật ngửa, không refresh toàn bộ đồ lành. Slip vào forest rồi Move ra clearing trong Daylight sẽ mất Rest tối đó."
      }
    ]
  },
  {
    "id": "evening",
    "title": "Evening và sức chứa",
    "ref": "§9.6",
    "steps": [
      {
        "title": "Thứ tự Evening",
        "rule": "Evening đúng thứ tự Rest → Draw 1 + Tiền track → discard tay xuống 5 → Check Item Capacity. Tiền hỏng/úp/ngoài track không cho bonus. Không tự nhận VP mỗi Evening."
      },
      {
        "title": "Giới hạn và bỏ item",
        "rule": "Giới hạn = 6 + 2 mỗi Túi ngửa trên track. Đếm item trong Satchel + Damaged. Dư item cuối Evening phải chọn bỏ vĩnh viễn từ hai khu đó; không đưa lại nguồn craft, không chỉ discard tạm. Không kiểm tra giới hạn ngay sau từng action."
      }
    ]
  },
  {
    "id": "coalition",
    "title": "Coalition bằng Dominance",
    "ref": "§9.2.8; §9.2.9.IIId; §3.3.1",
    "steps": [
      {
        "title": "Điều kiện kích hoạt",
        "rule": "Trong Daylight, có ít nhất 10 VP và game ít nhất 4 người, bạn có thể kích hoạt Dominance để coalition thay điều kiện thắng thường. Chọn người có VP ít nhất trong các người khác bạn, và chưa ở coalition; hòa thấp nhất thì chọn một."
      },
      {
        "title": "Quan hệ và chiến thắng chung",
        "rule": "Đặt score marker lên faction board người cùng coalition. Không tự thành Allied; marker quan hệ khác giữ nguyên. Nếu họ đang Hostile, chuyển quan hệ họ về Indifferent. Không dùng điều kiện Dominance thường của các phe để tự thắng."
      }
    ]
  },
  {
    "id": "two",
    "title": "Hai Vagabond",
    "ref": "§9.7",
    "steps": [
      {
        "title": "Quest và ruin dùng chung",
        "rule": "Dùng hai bộ item R; 2 item ngẫu nhiên mỗi ruin. Không mở thêm 3 quest. Standard chọn ngẫu nhiên Vagabond setup trước. Nhân vật phải theo lựa chọn hợp lệ của bộ game/setup."
      },
      {
        "title": "Giới hạn mỗi loại item R",
        "rule": "Không lấy item R cùng loại item R đã có trên faction board. Explore hai lần có thể lấy hai item nếu đều hợp lệ; không lấy item thì không có VP nhưng Đuốc vẫn exhaust. Ruin chỉ rời map khi item cuối được lấy."
      }
    ]
  },
  {
    "id": "plan",
    "title": "Trình tự lượt và chiến thắng",
    "ref": "§9.4–9.6",
    "steps": [
      {
        "title": "Birdsong, Daylight và Evening",
        "rule": "Birdsong: Refresh rồi có thể Slip một lần. Daylight: thực hiện Move, Battle, Explore, Aid, Quest, Strike, Repair, Craft và kỹ năng riêng theo thứ tự tùy chọn, trả đủ chi phí mỗi lần. Evening: Rest nếu ở forest, rút bài, bỏ tay xuống 5, rồi kiểm tra sức chứa."
      },
      {
        "title": "Đạt 30 VP hoặc thắng cùng coalition",
        "rule": "Thắng theo cách thông thường ngay khi đạt 30 VP. Coalition thay mục tiêu này bằng chiến thắng chung với người cùng coalition. Các ví dụ tương tác là tình huống độc lập, không mô phỏng toàn bộ trận; áp dụng luật card, map, hireling và nhân vật cụ thể khi có."
      }
    ]
  }
];
