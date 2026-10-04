import RuleBook from "../../rule-book";
import {law,topics} from "./story";
import CorvidExample from "./labs";
import "../../adventure.css";
import "./corvid.css";

export default function CorvidAdventure(){
return <div className="corvid-adventure"><RuleBook id="corvid-conspiracy" name="Âm mưu Quạ" subtitle="CORVID CONSPIRACY · LUẬT PHE" description="Tra cứu thiết lập, bốn loại âm mưu, thứ tự lượt, Exposure và cách ghi điểm. Mọi luật hiển thị trên một trang; mỗi ví dụ hoạt động độc lập." portrait="/assets/corvid-conspiracy-portrait.webp" law={law} topics={topics} renderExample={topic=><CorvidExample key={topic.id} topicId={topic.id}/>}>
<article className="corvid-reference"><h2>Tờ nhắc tại bàn · một lượt Quạ</h2><ol><li><b>Birdsong:</b> Craft bằng plot → lật plot có quân canh, ghi điểm từng lần → Recruit tối đa 1 lần.</li><li><b>Daylight:</b> tối đa 3 hành động Move / Plot / Battle / Trick, được lặp và đổi thứ tự.</li><li><b>Plot:</b> trả 1, 2, 3… warrior theo số plot đã đặt trong lượt; mỗi clearing tối đa 1 plot.</li><li><b>Evening:</b> Exert thêm 1 hành động và bỏ rút, hoặc rút 1 + Extortion ngửa; bỏ xuống 5 lá.</li><li><b>Nhớ:</b> plot ngửa không tự ghi VP mỗi lượt; Exposure đúng Raid không đặt quân; Trick cần hai token cùng mặt.</li></ol><a href={law} target="_blank" rel="noreferrer">Luật chính thức · Corvid Conspiracy, phần 13</a><p>Diễn giải tiếng Việt theo Law of Root, bản 13/10/2025. Artwork phe từ Leder Games; các bảng số là ví dụ học luật.</p></article>
</RuleBook></div>;
}
