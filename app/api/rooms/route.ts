import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
const clean = (value: unknown, max: number) => String(value || "").trim().slice(0, max);
const roomCode = () => { const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(""); };

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { hostId?: string; displayName?: string };
  const hostId = clean(body.hostId, 80), displayName = clean(body.displayName, 30);
  if (!hostId || !displayName) return json({ error: "NAME_REQUIRED" }, 400);
  let code = roomCode();
  for (let attempt = 0; attempt < 6; attempt += 1) { if (!await env.DB.prepare("SELECT code FROM rooms WHERE code = ?1").bind(code).first()) break; code = roomCode(); }
  const now = Date.now(), config = { map: "autumn", enabled: [] };
  await env.DB.batch([
    env.DB.prepare("INSERT INTO rooms (code, host_id, title, config_json, state_json, revision, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, '', 0, ?5, ?5)").bind(code, hostId, `Phòng của ${displayName}`, JSON.stringify(config), now),
    env.DB.prepare("INSERT INTO room_members (room_code, user_id, display_name, faction_id, joined_at) VALUES (?1, ?2, ?3, NULL, ?4)").bind(code, hostId, displayName, now),
  ]);
  return json({ code });
}
