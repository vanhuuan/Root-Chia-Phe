import { getDb } from "../../../db";
import { createRoom } from "../../../db/rooms";
import { clean, json, requestBody, roomResponse } from "../../../lib/room-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const body = await requestBody(request);
  const hostId = clean(body.hostId, 80), displayName = clean(body.displayName, 30);
  if (!hostId || !displayName) return json({ error: "NAME_REQUIRED" }, 400);
  return roomResponse(() => createRoom(getDb(), hostId, displayName));
}
