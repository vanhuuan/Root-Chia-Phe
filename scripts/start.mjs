import { cpSync, existsSync, readdirSync, readlinkSync, statSync, unlinkSync, symlinkSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { spawn } from "node:child_process";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
if (!existsSync(".next/standalone/server.js")) {
  console.error("Run pnpm run build before pnpm run start.");
  process.exit(1);
}
// Next emits directory symlinks; some Windows setups cannot traverse those.
// Replace only generated, internal directory links with Windows junctions.
if (process.platform === "win32") {
  const root = resolve(".next/standalone");
  function prepare(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) {
        const target = resolve(dirname(path), readlinkSync(path));
        if (target.startsWith(root + sep) && existsSync(target) && statSync(target).isDirectory()) {
          unlinkSync(path);
          symlinkSync(target, path, "junction");
        }
      } else if (entry.isDirectory()) prepare(path);
    }
  }
  prepare(root);
}
// Next standalone does not copy assets itself. Docker copies them at build time;
// this helper does the equivalent for a local production preview.
cpSync("public", ".next/standalone/public", { recursive: true });
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
const child = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production", HOSTNAME: "0.0.0.0", PORT: process.env.PORT || "3000" },
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => { process.exitCode = code ?? 1; });
