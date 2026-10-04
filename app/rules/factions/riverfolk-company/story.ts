export const law="https://cdn.shopify.com/s/files/1/0106/0162/7706/files/Root_Base_Law_Oct_2025.pdf?v=1774903758#page=12";
export const topics=[
  {
    "id": "setup",
    "title": "Thiết lập phe",
    "ref": "§11.3",
    "steps": [
      {
        "title": "Phân bố quân và thương điếm",
        "rule": "Standard Setup: phân bố tổng cộng 4 warrior Rái cá tại các clearing có sông. Đặt 9 thương điếm trên các track cùng suit, 3 warrior Rái cá trong Payments và giá cho từng dịch vụ trên track. Bài tay theo setup chung. ADSET dùng thẻ setup riêng."
      },
      {
        "title": "Payments ban đầu và loại quân",
        "rule": "Phe có tổng cộng 15 warrior: sau thiết lập chuẩn, 4 trên map, 3 trong Payments và 8 trong nguồn. Payments chỉ thành Funds sau Gather Funds ở Birdsong đầu tiên. Trade post là token: không góp rule, không chiếm building slot. Warrior mới góp rule; quân nằm trên bảng phe không ở map."
      }
    ]
  },
  {
    "id": "hand",
    "title": "Bài tay công khai",
    "ref": "§11.2.3",
    "steps": [
      {
        "title": "Giữ bài tay ngửa",
        "rule": "Đặt toàn bộ bài tay ngửa phía trên bảng phe. Người mua Hand Card chọn chính xác lá muốn mua. Public Hand vẫn là bài tay: craft từ đây và cuối lượt discard xuống 5. Không có chồng hàng hóa riêng."
      },
      {
        "title": "Lấy bài ngẫu nhiên",
        "rule": "Nếu một hiệu ứng lấy ngẫu nhiên bài của bạn, tạm úp bài, xáo, lấy một lá rồi ngửa phần còn lại. Chỉ mua Hand Card mới được chọn lá. Public Hand không biến hiệu ứng lấy ngẫu nhiên thành chọn tùy ý."
      }
    ]
  },
  {
    "id": "funds",
    "title": "Funds, Commit và Spend",
    "ref": "§11.2.4; §11.5",
    "steps": [
      {
        "title": "Commit quân",
        "rule": "Move, Battle và Draw đều commit một fund. Quân chuyển sang Committed, chờ Birdsong sau trở lại Funds. Fund là warrior trong Funds box. Có thể dùng fund của bất kỳ chủ sở hữu cho các action không yêu cầu phe cụ thể. Không dùng Payments trực tiếp."
      },
      {
        "title": "Spend quân",
        "rule": "Recruit và dựng thương điếm spend funds: quân về nguồn của chủ sở hữu, mất khỏi ngân quỹ công ty. Commit giữ quân trên bảng; Spend trả quân về đúng chủ. Craft commit lên ô track, không vào Committed box."
      }
    ]
  },
  {
    "id": "buy",
    "title": "Mua dịch vụ",
    "ref": "§11.2.6",
    "steps": [
      {
        "title": "Thời điểm và giới hạn mua",
        "rule": "Người chơi khác quyết định mua dịch vụ trước các bước Birdsong của họ. Trả warrior từ nguồn, không rút quân đang trên map. Mỗi lượt: tối đa 1 dịch vụ + 1 cho mỗi clearing vừa có trade post vừa có piece của phe người mua. Đếm clearing, không đếm số quân."
      },
      {
        "title": "Thanh toán từng dịch vụ",
        "rule": "Không cần ở thương điếm để mua lần đầu. Hai clearing thỏa điều kiện cho phép tổng cộng ba lần mua. Mỗi lần mua trả giá dịch vụ hiện tại vào Payments. Có thể mua nhiều Hand Card nếu còn lượt mua và đủ nguồn. Không mua giữa Daylight."
      }
    ]
  },
  {
    "id": "cards",
    "title": "Dịch vụ Hand Card",
    "ref": "§11.2.7.I",
    "steps": [
      {
        "title": "Chọn một lá bài",
        "rule": "Khách trả đủ giá Hand Card bằng quân nguồn, rồi chọn một lá trên tay Rái cá để thêm vào tay mình. Một lần mua lấy một lá. Lá đã bán rời tay Rái cá; không thể vừa bán vừa craft cùng lá."
      },
      {
        "title": "Thanh toán vào Payments",
        "rule": "Quân khách đưa vào Payments không lập tức chi được trong lượt người khác. Công ty phải chờ Gather Funds của mình. Không ghi VP trực tiếp chỉ vì bán bài. Lợi ích là vốn cho các lượt sau; bài mới có thể mua phải thực sự còn trên tay."
      }
    ]
  },
  {
    "id": "boats",
    "title": "Swimmers và Riverboats",
    "ref": "§11.2.2; §11.2.7.II",
    "steps": [
      {
        "title": "Di chuyển theo sông của Rái cá",
        "rule": "Công ty coi sông là đường. Khi một đoạn sông nối hoàn toàn clearing xuất phát và đích, Rái cá đi theo sông mà không cần rule. Swimmers chỉ bỏ yêu cầu rule cho Move theo sông. Đi bằng đường in thông thường vẫn cần rule nơi xuất phát hoặc đích. Các hạn chế Move khác vẫn áp dụng."
      },
      {
        "title": "Di chuyển theo sông của khách",
        "rule": "Riverboats cho khách coi sông là đường tới hết lượt. Nó không trao khả năng bỏ rule của Swimmers. Khách vẫn cần rule xuất phát hoặc đích khi Move theo sông. Mua thuyền không tạo Move miễn phí: vẫn trả action theo phe của khách."
      }
    ]
  },
  {
    "id": "merc",
    "title": "Dịch vụ Mercenaries",
    "ref": "§11.2.7.III",
    "steps": [
      {
        "title": "Thời gian và phạm vi hiệu lực",
        "rule": "Khách coi warrior Rái cá là quân mình để rule và battle trong hai giai đoạn này. Ở Birdsong, quân thuê chưa góp rule. Không áp dụng khi khách battle Rái cá. Không move quân thuê, không tính chúng cho dominance, không remove chúng ngoài việc nhận hits."
      },
      {
        "title": "Quyền sở hữu quân thuê",
        "rule": "Thuê không đổi chủ sở hữu: Field Hospitals của Mèo không cứu quân Rái cá, và không dùng chúng để Sway Ministers. Chúng không còn là enemy pieces của khách trong phạm vi dịch vụ, nhưng vẫn là faction pieces Rái cá. Hết lượt khách, dịch vụ hết hiệu lực."
      }
    ]
  },
  {
    "id": "hits",
    "title": "Nhận hits với Mercenaries",
    "ref": "§11.2.7.IIIa–b",
    "steps": [
      {
        "title": "Chia hits giữa hai nhóm quân",
        "rule": "Trong ví dụ khách có 2 warrior của mình và 2 warrior thuê, phải chịu 3 hits: loại 2 quân của khách và 1 quân Rái cá. Phải chia hits giữa quân sở hữu và quân thuê; hit lẻ loại warrior sở hữu nếu còn. Chỉ loại building/token của khách khi không còn warrior nào, kể cả Rái cá, tại battle."
      },
      {
        "title": "Giới hạn của Lãng khách",
        "rule": "Lãng khách không thể mua Mercenaries. Nếu họ loại quân Rái cá đang làm mercenary trong battle chống khách, không khiến Rái cá thành Hostile. Đây là ngoại lệ quan hệ với Rái cá khi đánh mercenaries; không xóa các quy tắc Hostile và Infamy khác của Lãng khách."
      }
    ]
  },
  {
    "id": "birdsong",
    "title": "Birdsong",
    "ref": "§11.4",
    "steps": [
      {
        "title": "Protectionism và cổ tức",
        "rule": "Nếu Payments trống, đặt 2 warrior Rái cá từ nguồn vào đó. Sau đó xét cổ tức với Funds đang có. Protectionism → Score Dividends → Gather Funds, đúng thứ tự. Có ít nhất 1 trade post trên map mới ghi 1 VP mỗi 2 Funds, làm tròn xuống."
      },
      {
        "title": "Gather Funds",
        "rule": "Chỉ sau cổ tức, chuyển tất cả warrior trên bảng phe vào Funds: Payments, Committed và cả quân đang commit trên track craft. Không tính Payments hoặc Committed cho cổ tức vừa rồi. Funds chưa dùng còn lại từ lượt trước mới cho cổ tức; 5 Funds cho 2 VP."
      }
    ]
  },
  {
    "id": "actions",
    "title": "Hành động Daylight",
    "ref": "§11.5.1–4",
    "steps": [
      {
        "title": "Move, Battle và Draw",
        "rule": "Daylight cho phép thực hiện các action theo bất kỳ thứ tự và số lần nào, miễn trả được và hành động hợp lệ. Move: commit 1 cho một Move. Battle: commit 1 để khởi xướng một battle. Draw: commit 1 để rút một lá vào tay ngửa."
      },
      {
        "title": "Thứ tự và số lần hành động",
        "rule": "Move một nhóm quân hợp lệ không phải commit một fund cho từng warrior. Nhưng hai Move riêng cần hai funds. Commit không bỏ yêu cầu rule, adjacency, quân để battle hay hiệu ứng hạn chế. Craft cũng là action Daylight, trả bằng funds và ô track phù hợp."
      }
    ]
  },
  {
    "id": "recruit",
    "title": "Recruit",
    "ref": "§11.5.5",
    "steps": [
      {
        "title": "Chi phí và vị trí tuyển quân",
        "rule": "Chọn bất kỳ clearing có sông, spend 1 fund rồi đặt 1 warrior Rái cá từ nguồn. Không cần rule hoặc có sẵn quân tại đó. Recruit là Spend, không Commit. Fund dùng trả về nguồn đúng chủ; warrior được đặt luôn là Rái cá. Hạn chế place vẫn áp dụng."
      },
      {
        "title": "Nguồn quân Rái cá",
        "rule": "Nếu spend chính quân Rái cá, quân đó quay về nguồn và có thể được dùng để đặt. Nếu spend quân của khách, bạn vẫn phải có quân Rái cá để đặt. Không lấy warrior của khách làm quân mình trên map. Chỉ có tổng 15 warrior Rái cá, chia giữa nguồn, map và các box."
      }
    ]
  },
  {
    "id": "posts",
    "title": "Establish Trade Post",
    "ref": "§11.5.6",
    "steps": [
      {
        "title": "Funds của người rule clearing",
        "rule": "Chọn clearing chưa có trade post và được một người chơi rule. Spend 2 funds thuộc chính người đang rule nơi đó. Mèo rule: cần 2 funds Mèo. Rái cá rule: cần 2 funds Rái cá. Không thay bằng hai fund khác chủ hoặc một của mỗi phe. Không ai rule thì không dựng được."
      },
      {
        "title": "Đặt thương điếm và ghi điểm",
        "rule": "Đặt trade post matching suit clearing và 1 warrior Rái cá, rồi ghi VP in trên ô vừa mở. Thương điếm có thể ở clearing không sông. Cần post matching còn track và placement hợp lệ. Mỗi clearing tối đa 1 trade post; không cần sẵn quân Rái cá ở đó."
      }
    ]
  },
  {
    "id": "craft",
    "title": "Craft",
    "ref": "§11.2.1; §11.5.3",
    "steps": [
      {
        "title": "Ô trống trên track và crafting cost",
        "rule": "Lấy post khỏi track mở một ô craft của suit đó. Muốn craft Sword cost 2 Cáo, cần hai ô Cáo trống chưa dùng và hai Funds. Commit funds lên ô matching crafting cost, mỗi ô chứa một fund. Suit góc lá bài không phải crafting cost. Không craft bằng post đang trên map."
      },
      {
        "title": "Mỗi ô dùng một lần mỗi lượt",
        "rule": "Quân commit trên ô craft đợi Gather Funds. Bạn không dùng cùng ô hai lần trong một lượt. Trade post bị loại vĩnh viễn không trở về track, nên ô vẫn mở cho các lượt sau. Item craft thông thường cần item còn nguồn chung và ghi thưởng theo card."
      }
    ]
  },
  {
    "id": "export",
    "title": "Export",
    "ref": "§11.5.3.I",
    "steps": [
      {
        "title": "Thay lợi ích craft bằng Payments",
        "rule": "Bạn có thể Export một lá craft: trả đầy đủ crafting cost, bỏ qua lợi ích in trên lá, discard và đặt 1 warrior Rái cá vào Payments. Export không miễn crafting cost. Chỉ nhận 1 warrior Payments thay lợi ích craft: không item, VP in trên card hoặc hiệu ứng của card đó."
      },
      {
        "title": "Gather quân xuất khẩu",
        "rule": "Lá Sword Export không cho Kiếm và 2 VP. Fund đã commit vẫn nằm ở ô track, quân xuất khẩu mới ở Payments. Quân Payments chưa dùng ngay. Nó được gom ở Birdsong sau, và không tính trong cổ tức trước Gather Funds."
      }
    ]
  },
  {
    "id": "disruption",
    "title": "Trade Disruption",
    "ref": "§11.2.5.I",
    "steps": [
      {
        "title": "Mất Funds khi thương điếm bị loại",
        "rule": "Mỗi khi trade post bị remove, loại một nửa Funds hiện tại, làm tròn lên, trả quân về nguồn chủ sở hữu. Trade post rời game vĩnh viễn. 5 Funds: mất 3, còn 2. Payments và Committed không bị mất bởi Trade Disruption. Không tự mất VP đã ghi khi đặt post."
      },
      {
        "title": "Áp dụng riêng cho từng thương điếm",
        "rule": "Với 5 Funds và hai trade post bị remove: lần một còn 2, lần hai mất 1 nên còn 1. Không chỉ tính một lần cho cả sự kiện. Đối thủ vẫn ghi VP nếu được phép ghi vì loại enemy token. Không còn post trên map thì Birdsong sau không có cổ tức, dù còn Funds."
      }
    ]
  },
  {
    "id": "evening",
    "title": "Evening",
    "ref": "§11.6",
    "steps": [
      {
        "title": "Bỏ bài và đặt giá",
        "rule": "Kết thúc Daylight, discard bài tay tùy chọn xuống 5 nếu vượt. Sau đó có thể chỉnh từng giá dịch vụ đến ô bất kỳ trên track của nó. Evening: Discard Cards → Set Costs. Không có bước rút bài mặc định. Muốn rút phải dùng Draw ở Daylight, commit 1 mỗi lá."
      },
      {
        "title": "Thời điểm giao dịch và ghi điểm",
        "rule": "Thỏa thuận mua bán vẫn phải tuân theo thời điểm và chi phí luật định: khách quyết định mua vào đầu Birdsong của họ. Không ghi VP mỗi Evening theo số post. Điểm đến từ đặt post, craft thường, cổ tức Birdsong và các cách ghi điểm chung hợp lệ."
      }
    ]
  }
];
export const faqs=[["Có mua dịch vụ khi không đứng tại thương điếm?", "Có. Mỗi lượt có 1 lần mua cơ bản; clearing có post và piece phe bạn chỉ tăng giới hạn số lần mua."], ["Trả quân đang trên map được không?", "Không. Người mua trả warrior từ nguồn vào Payments; Lãng khách exhaust item thay thế."], ["Lãng khách trả thế nào?", "Mỗi item exhaust để trả giá khiến Rái cá đặt 1 warrior của mình vào Payments. Phải trả đủ giá, dùng item exhaust hợp lệ và nguồn quân thực tế. Không được mua Mercenaries."], ["Payments dùng ngay được không?", "Không. Chờ Gather Funds của Rái cá. Cổ tức xảy ra trước Gather, nên chưa tính số quân mới mua dịch vụ."], ["Commit khác Spend ở đâu?", "Commit giữ quân trên bảng để dùng lại lượt sau. Spend trả quân về nguồn đúng chủ sở hữu."], ["Giữ 5 Funds được mấy điểm?", "2 VP ở Birdsong, nếu còn ít nhất 1 trade post trên map. Payments và Committed không tính."], ["Không ai mua thì có vốn không?", "Nếu Payments trống ở bước Protectionism, đặt 2 warrior Rái cá từ nguồn vào Payments, rồi gom ở bước Gather. Đặt tối đa theo nguồn thực tế."], ["Thuê thuyền có bỏ yêu cầu rule?", "Không. Riverboats chỉ coi sông là đường đến hết lượt. Swimmers bỏ rule khi đi sông là khả năng riêng của Rái cá."], ["Quân thuê góp rule ở Birdsong không?", "Không. Mercenaries chỉ có hiệu lực Daylight và Evening của lượt mua."], ["Có dẫn quân thuê đi cùng không?", "Không được move chúng. Chúng chỉ được tính cho rule và battle, với các giới hạn của dịch vụ."], ["Battle Rái cá có tính lính thuê không?", "Không. Ngoại lệ dịch vụ không cho dùng quân Rái cá làm quân mình khi battle Rái cá."], ["Có dựng post ở clearing không sông?", "Có. Điều kiện sông thuộc Recruit; dựng post cần clearing được rule, chưa có post, fund đúng chủ và placement hợp lệ."], ["Post có góp rule hoặc tốn slot?", "Không. Nó là token. Warrior đi kèm góp rule, building slot không bị post chiếm."], ["Mèo rule, dùng fund Đại bàng được không?", "Không. Dựng post cần spend 2 funds của người rule clearing, cả hai đều phải thuộc Mèo trong ví dụ này."], ["Dựng post khi hòa rule?", "Cần một người thực sự rule theo luật chung và khả năng phe, như Lords of the Forest của Đại bàng. Nếu không ai rule thì không được chọn clearing đó."], ["Post bị phá có đặt lại được không?", "Không. Nó rời game vĩnh viễn; không quay về track. Ô craft đã mở vẫn mở."], ["Trade Disruption mất cả Payments?", "Không. Chỉ Funds hiện tại mất một nửa làm tròn lên. Áp dụng từng post bị remove; không tự trừ điểm đã ghi."], ["Craft dùng suit lá hay cost?", "Dùng các suit ở crafting cost và ô trống matching trên track. Không dùng suit góc lá, không dùng post trên map."], ["Export có cho VP hoặc item không?", "Không nhận lợi ích in trên lá; thay bằng 1 warrior Rái cá vào Payments. Vẫn trả đầy đủ crafting cost và discard lá."], ["Cuối lượt rút mấy lá?", "Không có bước rút bài mặc định. Daylight Draw commit 1 fund cho 1 lá; Evening bỏ xuống 5 rồi đặt giá."]];
