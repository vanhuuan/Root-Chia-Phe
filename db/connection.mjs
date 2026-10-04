// Shared by the application and the explicit migration runner.
/** @returns {import("postgres").Options<{}>} */
export function connectionOptions(connectionString) {
  const url = new URL(connectionString);
  const sslmode = url.searchParams.get("sslmode");
  const local = ["localhost", "127.0.0.1", "::1", "[::1]", "postgres"].includes(url.hostname);
  if (sslmode === "disable" && !local) {
    throw new Error("Unencrypted database connections are allowed only for local PostgreSQL.");
  }
  if (sslmode && !["disable", "require", "verify-full"].includes(sslmode)) {
    throw new Error("Use sslmode=verify-full for remote PostgreSQL or disable for local development.");
  }
  return {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    // Even sslmode=require validates certificate and hostname.
    ssl: sslmode === "disable" || (!sslmode && local)
      ? false : { rejectUnauthorized: true, minVersion: "TLSv1.2" },
    connection: { application_name: "root-chia-phe" },
  };
}
