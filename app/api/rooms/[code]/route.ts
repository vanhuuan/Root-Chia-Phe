import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
const clean = (value: unknown, max: number) => String(value || "").trim().slice(0, max);
async function getRoom(code: string) { return env.DB.prepare("SELECT code, host_id, title, config_json, state_json, revision FROM rooms WHERE code = ?1").bind(code.toUpperCase()).first<Record<string, unknown>>(); }
async function responseFor(code: string) {
  const room = await getRoom(code); if (!room) return json({ error: "ROOM_NOT_FOUND" }, 404);
  const members = await env.DB.prepare("SELECT user_id, display_name, faction_id, joined_at FROM room_members WHERE room_code = ?1 ORDER BY joined_at").bind(code.toUpperCase()).all();
  return json({ code: room.code, title: room.title, hostId: room.host_id, config: JSON.parse(String(room.config_json || "{}")), result: room.state_json ? JSON.parse(String(room.state_json)) : null, revision: Number(room.revision), members: members.results });
}
export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) { const { code } = await context.params; return responseFor(code); }
export async function POST(request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params, room = await getRoom(code); if (!room) return json({ error: "ROOM_NOT_FOUND" }, 404);
  const body = await request.json().catch(() => ({})) as { userId?: string; displayName?: string };
  const userId = clean(body.userId, 80), displayName = clean(body.displayName, 30); if (!userId || !displayName) return json({ error: "NAME_REQUIRED" }, 400);
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM room_members WHERE room_code = ?1").bind(String(room.code)).first<{ total: number }>();
  const existing = await env.DB.prepare("SELECT user_id FROM room_members WHERE room_code = ?1 AND user_id = ?2").bind(String(room.code), userId).first();
  if (!existing && Number(count?.total || 0) >= 6) return json({ error: "ROOM_FULL" }, 409);
  await env.DB.prepare("INSERT INTO room_members (room_code, user_id, display_name, faction_id, joined_at) VALUES (?1, ?2, ?3, NULL, ?4) ON CONFLICT(room_code, user_id) DO UPDATE SET display_name = excluded.display_name").bind(String(room.code), userId, displayName, Date.now()).run();
  if (!existing) {
    const config = JSON.parse(String(room.config_json || "{}"));
    config.bots = Math.max(0, Math.min(6 - Number(count?.total || 0) - 1, Number(config.bots || 0)));
    await env.DB.prepare("UPDATE rooms SET config_json = ?1, state_json = '', revision = revision + 1, updated_at = ?2 WHERE code = ?3").bind(JSON.stringify(config), Date.now(), String(room.code)).run();
  }
  return responseFor(code);
}
export async function PUT(request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params, room = await getRoom(code); if (!room) return json({ error: "ROOM_NOT_FOUND" }, 404);
  const body = await request.json().catch(() => ({})) as { hostId?: string; config?: { bots?: unknown; [key: string]: unknown }; result?: unknown };
  if (clean(body.hostId, 80) !== String(room.host_id)) return json({ error: "HOST_ONLY" }, 403);
  if (!body.config) return json({ error: "CONFIG_REQUIRED" }, 400);
  const requestedBots = Number(body.config.bots || 0);
  const realMembers = await env.DB.prepare("SELECT COUNT(*) AS total FROM room_members WHERE room_code = ?1").bind(String(room.code)).first<{ total: number }>();
  const bots = Number.isFinite(requestedBots) ? Math.max(0, Math.min(6 - Number(realMembers?.total || 0), Math.floor(requestedBots))) : 0;
  const config = { ...body.config, bots };
  const state = Object.prototype.hasOwnProperty.call(body, "result") ? (body.result ? JSON.stringify(body.result) : "") : String(room.state_json || "");
  await env.DB.prepare("UPDATE rooms SET config_json = ?1, state_json = ?2, revision = revision + 1, updated_at = ?3 WHERE code = ?4").bind(JSON.stringify(config), state, Date.now(), String(room.code)).run();
  return responseFor(code);
}
