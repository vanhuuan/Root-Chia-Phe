import { getDb } from "../../../../db";
import { joinRoom, readRoom, updateRoom, type RoomConfig } from "../../../../db/rooms";
import { clean, requestBody, roomResponse } from "../../../../lib/room-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ code: string }> };
export async function GET(_request: Request, context: Context) {
  const { code } = await context.params;
  return roomResponse(() => readRoom(getDb(), code));
}
export async function POST(request: Request, context: Context) {
  const { code } = await context.params;
  const body = await requestBody(request);
  return roomResponse(() => joinRoom(getDb(), code, clean(body.userId, 80), clean(body.displayName, 30)));
}
export async function PUT(request: Request, context: Context) {
  const { code } = await context.params;
  const body = await requestBody(request);
  return roomResponse(() => updateRoom(getDb(), code, {
    ...body, hostId: clean(body.hostId, 80), config: body.config as RoomConfig | undefined,
  }));
}
