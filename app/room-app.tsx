"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import ClearingMap from "./clearing-map";
import type { ClearingState } from "./clearing-data";
import { factions, maps, thresholds, type Faction } from "./root-data";

type Member = { user_id: string; display_name: string };
type Assignment = { userId: string; factionId: string };
type Participant = Member & { isBot?: boolean };
type Room = { code: string; hostId: string; config: { map?: string; enabled?: string[]; bots?: number }; result: null | { map: string; reach: number; assignments: Assignment[]; clearings?: ClearingState }; revision: number; members: Member[] };

const combos = (items: Faction[], size: number, start = 0, picked: Faction[] = [], out: Faction[][] = []) => {
  if (picked.length === size) { out.push([...picked]); return out; }
  for (let i = start; i <= items.length - (size - picked.length); i += 1) { picked.push(items[i]); combos(items, size, i + 1, picked, out); picked.pop(); }
  return out;
};
const guestId = () => { const key = "root-room-user"; let id = localStorage.getItem(key); if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); } return id; };
const messageFor = (error: string) => ({ ROOM_NOT_FOUND: "Không tìm thấy phòng.", ROOM_FULL: "Phòng đã đủ 6 người.", HOST_ONLY: "Chỉ chủ phòng mới có thể chia phe." }[error] || "Có lỗi xảy ra. Hãy thử lại.");

export default function RoomApp() {
  const loadedRevision = useRef<string>("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [qr, setQr] = useState("");
  const [map, setMap] = useState("autumn");
  const [enabled, setEnabled] = useState<Set<string>>(new Set(factions.map(f => f.id)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadRoom = useCallback(async (code: string) => {
    const response = await fetch(`/api/rooms/${code}`, { cache: "no-store" });
    const data = await response.json() as Room & { error: string };
    if (!response.ok) { setRoom(null); setError(messageFor(data.error)); return; }
    setRoom(data);
    const revision = `${data.code}:${data.revision}`;
    if (loadedRevision.current !== revision) {
      loadedRevision.current = revision;
      setMap(data.config?.map || "autumn");
      if (data.config?.enabled?.length) setEnabled(new Set(data.config.enabled));
    }
  }, []);

  useEffect(() => {
    const id = guestId(); setUserId(id); setName(localStorage.getItem("root-room-name") || "");
    const code = new URLSearchParams(location.search).get("room")?.toUpperCase() || "";
    if (code) { setRoomCode(code); setCodeInput(code); loadRoom(code); }
  }, [loadRoom]);
  useEffect(() => { if (!roomCode) return; const timer = setInterval(() => loadRoom(roomCode), 2200); return () => clearInterval(timer); }, [roomCode, loadRoom]);
  useEffect(() => { if (!roomCode) return; QRCode.toDataURL(`${location.origin}/?room=${roomCode}`, { width: 280, margin: 2, color: { dark: "#243d32", light: "#fffef9" } }).then(setQr); }, [roomCode]);

  const joined = !!room?.members.some(member => member.user_id === userId);
  const isHost = room?.hostId === userId;
  const joinUrl = typeof location === "undefined" || !roomCode ? "" : `${location.origin}/?room=${roomCode}`;
  const botCount = Math.max(0, Math.min(6, room?.config?.bots || 0));
  const participants = useMemo<Participant[]>(() => room ? [...room.members, ...Array.from({ length: botCount }, (_, index) => ({ user_id: `bot-${index + 1}`, display_name: `Bot ${index + 1}`, isBot: true }))] : [], [room, botCount]);
  const resultByUser = useMemo(() => new Map(room?.result?.assignments.map(item => [item.userId, item.factionId]) || []), [room?.result]);

  function leaveRoom() {
    history.replaceState(null, "", "/");
    setRoomCode(""); setCodeInput(""); setRoom(null); setError("");
  }

  async function createRoom() {
    if (!name.trim()) return setError("Nhập tên của bạn trước.");
    setBusy(true); setError(""); localStorage.setItem("root-room-name", name.trim());
    const response = await fetch("/api/rooms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ hostId: userId, displayName: name.trim() }) });
    const data = await response.json() as Room & { error: string }; setBusy(false);
    if (!response.ok) return setError(messageFor(data.error));
    history.replaceState(null, "", `/?room=${data.code}`); setRoomCode(data.code); setCodeInput(data.code); await loadRoom(data.code);
  }
  async function openRoom() { const code = codeInput.trim().toUpperCase(); if (code.length !== 6) return setError("Mã phòng gồm 6 ký tự."); history.replaceState(null, "", `/?room=${code}`); setRoomCode(code); await loadRoom(code); }
  async function joinRoom() {
    if (!name.trim()) return setError("Nhập tên của bạn trước.");
    setBusy(true); setError(""); localStorage.setItem("root-room-name", name.trim());
    const response = await fetch(`/api/rooms/${roomCode}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ userId, displayName: name.trim() }) });
    const data = await response.json() as Room & { error: string }; setBusy(false); if (!response.ok) return setError(messageFor(data.error)); setRoom(data);
  }
  async function updateBots(next: number) {
    if (!room || !isHost) return;
    const count = Math.max(0, Math.min(6 - room.members.length, next));
    setBusy(true); setError("");
    const response = await fetch(`/api/rooms/${roomCode}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ hostId: userId, config: { map, enabled: [...enabled], bots: count }, result: null }) });
    const data = await response.json() as Room & { error: string }; setBusy(false); if (!response.ok) return setError(messageFor(data.error)); setRoom(data);
  }
  function randomTeam() {
    if (!room || participants.length < 2) return setError("Cần ít nhất 2 người trong phòng.");
    const count = participants.length, minimum = thresholds[count];
    const pool = factions.filter(f => enabled.has(f.id));
    if (pool.length < count) return setError(`Cần bật ít nhất ${count} phe.`);
    let choices = combos(pool, count).filter(group => group.reduce((sum, f) => sum + f.reach, 0) >= minimum && group.reduce((sum, f) => sum + f.reach, 0) <= minimum + 5);
    choices = choices.filter(group => count === 2 ? group.every(f => f.type === "military") : group.some(f => f.type === "military"));
    choices = choices.filter(group => !(group.some(f => f.id === "vagabond") && group.some(f => f.id === "knaves-of-the-deepwood")));
    if (!choices.length) return setError(`Không có tổ hợp Reach ${minimum}–${minimum + 5}. Hãy bật thêm phe.`);
    const reaches = [...new Set(choices.map(group => group.reduce((sum, f) => sum + f.reach, 0)))];
    const middle = minimum + 2.5, weights = reaches.map(reach => 7 - Math.abs(reach - middle) * 1.5);
    let draw = Math.random() * weights.reduce((sum, weight) => sum + weight, 0), target = reaches[0];
    for (let i = 0; i < reaches.length; i += 1) { draw -= weights[i]; if (draw < 0) { target = reaches[i]; break; } }
    const sameReach = choices.filter(group => group.reduce((sum, f) => sum + f.reach, 0) === target);
    const picked = [...sameReach[Math.floor(Math.random() * sameReach.length)]].sort(() => Math.random() - .5);
    const result = { map, reach: target, assignments: participants.map((member, index) => ({ userId: member.user_id, factionId: picked[index].id })) };
    saveResult(result);
  }
  async function saveResult(result: Room["result"]) {
    setBusy(true); setError("");
    const response = await fetch(`/api/rooms/${roomCode}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ hostId: userId, config: { map: result?.map || map, enabled: [...enabled], bots: botCount }, result }) });
    const data = await response.json() as Room & { error: string }; setBusy(false); if (!response.ok) return setError(messageFor(data.error)); setRoom(data);
  }
  async function copyLink() { await navigator.clipboard.writeText(joinUrl); }

  if (!roomCode) return <main className="home"><header className="topbar"><b>ROOT <i>•</i></b><span>CHIA PHE CÙNG BẠN BÈ</span></header><section className="hero"><div><span className="eyebrow">PHÒNG CHIA PHE</span><h1>Tập hợp mọi người<br />trước khi vào rừng.</h1><p>Tạo phòng, đưa QR cho bạn bè quét rồi chia faction cân bằng theo Reach.</p></div><div className="entry-card"><label>Tên của bạn<input value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Nhập tên" /></label><button className="primary" disabled={busy} onClick={createRoom}>{busy ? "Đang tạo…" : "Tạo phòng mới"}</button><div className="divider"><span>hoặc tham gia bằng mã</span></div><div className="code-row"><input value={codeInput} onChange={e => setCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))} maxLength={6} placeholder="ABC123" aria-label="Mã phòng" /><button onClick={openRoom}>Mở phòng</button></div>{error && <p className="error">{error}</p>}</div></section></main>;

  if (!room) return <main className="loading"><p>{error || `Đang mở phòng ${roomCode}…`}</p>{error && <button className="ghost" onClick={leaveRoom}>Về trang chính</button>}</main>;
  if (!joined) return <main className="home"><header className="topbar"><b>ROOT <i>•</i></b><span>PHÒNG {roomCode}</span></header><section className="join-card"><span className="eyebrow">BẠN ĐƯỢC MỜI VÀO PHÒNG</span><h1>Tham gia chia phe</h1><label>Tên của bạn<input value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Nhập tên" /></label><button className="primary" disabled={busy} onClick={joinRoom}>{busy ? "Đang tham gia…" : "Tham gia phòng"}</button>{error && <p className="error">{error}</p>}</section></main>;

  return <main className="room-page"><header className="topbar"><a href="/" className="brand"><b>ROOT <i>•</i></b><span>CHIA PHE</span></a><div className="room-badge">PHÒNG <strong>{roomCode}</strong></div></header><section className="room-grid"><aside className="share-panel"><span className="eyebrow">MỜI BẠN BÈ</span><h2>Quét để tham gia</h2>{qr && <img className="qr" src={qr} alt={`QR tham gia phòng ${roomCode}`} />}<strong className="big-code">{roomCode}</strong><button className="ghost" onClick={copyLink}>Sao chép link</button><div className="members"><div><b>{participants.length}/6 người</b><span>{participants.length < 2 ? "Đang chờ thêm người…" : "Sẵn sàng chia phe"}</span></div>{participants.map((member, index) => <div className="member" key={member.user_id}><span>{index + 1}</span><b>{member.display_name}</b>{member.isBot ? <small>Bot</small> : member.user_id === room.hostId && <small>Chủ phòng</small>}</div>)}</div></aside><section className="setup-area"><div className="section-head"><div><span className="eyebrow">CHUẨN BỊ</span><h1>Chọn bàn và phe</h1></div>{!isHost && <span className="waiting">Chờ chủ phòng chia phe</span>}</div><h3>01 · Bản đồ</h3><div className="maps">{maps.map(item => <button key={item.id} disabled={!isHost} className={map === item.id ? "selected" : ""} onClick={() => setMap(item.id)}><img src={item.image} alt="" /><b>{item.name}</b><small>{item.vi}</small></button>)}</div><div className="faction-head"><h3>02 · Phe có thể chọn</h3>{isHost && <button className="text" onClick={() => setEnabled(new Set(factions.map(f => f.id)))}>Chọn tất cả</button>}</div><div className="factions">{factions.map(faction => <button key={faction.id} disabled={!isHost} className={enabled.has(faction.id) ? "active" : ""} onClick={() => setEnabled(current => { const next = new Set(current); next.has(faction.id) ? next.delete(faction.id) : next.add(faction.id); return next; })}><img src={`/assets/${faction.id}-icon.webp`} alt="" /><span><b>{faction.vi}</b><small>Reach {faction.reach} · {faction.expansion}</small></span></button>)}</div><div className="bot-control"><h3>03 · Người chơi</h3><span>Thêm bot nếu chưa đủ người</span><div><button disabled={!isHost || busy || botCount === 0} onClick={() => updateBots(botCount - 1)} aria-label="Bớt bot">−</button><b>{botCount} bot</b><button disabled={!isHost || busy || participants.length === 6} onClick={() => updateBots(botCount + 1)} aria-label="Thêm bot">+</button></div></div>{isHost && <button className="random" disabled={busy || participants.length < 2} onClick={randomTeam}>{busy ? "Đang chia…" : room.result ? "Chia lại faction" : "Random faction"}</button>}{error && <p className="error">{error}</p>}{room.result && <section className="results"><div><span className="eyebrow">KẾT QUẢ</span><h2>{maps.find(item => item.id === room.result?.map)?.vi} · Tổng Reach {room.result.reach}</h2></div><div className="result-grid">{participants.map(member => { const faction = factions.find(item => item.id === resultByUser.get(member.user_id)); return faction ? <article key={member.user_id}><img src={`/assets/${faction.id}-portrait.webp`} alt={faction.name} /><span>{member.display_name}</span><h3>{faction.name}</h3><p>{faction.vi} · Reach {faction.reach}</p></article> : null; })}</div><ClearingMap map={room.result.map} players={room.result.assignments.length} value={room.result.clearings} canEdit={!!isHost} busy={busy} onSave={clearings => saveResult({ ...room.result!, clearings })} /></section>}</section></section></main>;
}
