export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Process health only: no credentials, instance details or DB dependency.
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "cache-control": "no-store" } });
}
