import { RoomError } from "../db/rooms";

export const clean = (value: unknown, max: number) => String(value || "").trim().slice(0, max);
export const json = (data: unknown, status = 200) => Response.json(data, {
  status, headers: { "cache-control": "no-store" },
});

export async function requestBody(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => ({}));
  return body && typeof body === "object" && !Array.isArray(body) ? body : {};
}

export async function roomResponse(action: () => Promise<unknown>) {
  try { return json(await action()); }
  catch (error) {
    if (error instanceof RoomError) return json({ error: error.code }, error.status);
    // Do not log connection strings, bodies or driver error details.
    console.error("Room database operation failed");
    return json({ error: "INTERNAL_ERROR" }, 500);
  }
}
