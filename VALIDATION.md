# Migration validation

## Single-page rules update · 2026-10-04

Completed one faction assignment per subagent (13 agents). General rules and all
13 faction guides now render direct rule topics with anchor navigation, visible
references/FAQs and independently mounted examples. Original topic counts are
preserved: 192 faction topics plus 11 general topics. No room/database contract
or schema changed in this presentation update.

Verified after the final guide changes:

- `pnpm.cmd run typecheck` passed.
- `pnpm.cmd run build` passed and generated all 13 faction routes.
- Shared rule components, general page/navigation and browser tests passed scoped
  ESLint with no errors. Full repository lint was not rerun for this update; the
  original migration baseline remains documented below.
- Windows standalone production server passed the original four browser
  scenarios, then the added Cat/Eyrie scenario passed separately against that
  same build.
- `docker compose build app` passed. The rebuilt local app container started,
  became healthy and passed all **five** browser scenarios in one run (34.0s):
  homepage/assets/health plus every guide's topic counts, visible rule text,
  anchors and hydration; mobile layout for all guides; Cat/Eyrie action limits
  and independent resets; host/guest room sharing with both Marsh variants; and
  mobile Keepers Encamp/reset.
- Desktop/mobile screenshots were inspected. All guide pages fit a 390px
  viewport without document-level horizontal overflow; wide learning maps keep
  their own scrolling region.
- A hydration warning observed during live editing was not reproduced on either
  production runtime. The browser suite explicitly checks hydration console
  errors as well as uncaught page errors.

The app and PostgreSQL Compose containers remain running locally at loopback
ports 3000 and 5433. No cloud or production service was changed.

Verified on 2026-10-04 in the Windows PowerShell workspace. Node 22.22.2,
pnpm 11.25.0, Docker Engine 29.2.1 and Compose 5.0.2 were available. Docker's
Linux engine was started for these local checks. PostgreSQL used the Compose
`postgres:17-bookworm` image, with a new project-local volume and generated
local-only password. No production database or Azure resource was accessed.

## Passed

| Check | Verified result |
| --- | --- |
| Dependency migration | pnpm install regenerated the lockfile; Docker's frozen-lockfile installation succeeded |
| TypeScript | `pnpm.cmd run typecheck` exited 0; previous 12 D1-binding errors are gone |
| Production build | `pnpm.cmd run build` exited 0 on standard Next.js 16.3.4; home/rules/all 13 faction routes generated and Node APIs built |
| Windows startup | `pnpm.cmd run start` started the final standalone server on 0.0.0.0:3000 |
| Fresh local migrations | `db:migrate` applied the PostgreSQL schema; integration tests separately created and migrated a fresh random local DB |
| DB integration/concurrency | All 8 nested scenarios passed (Node reports 9 passing tests including the parent test), no failures |
| Local browser | All 3 Playwright scenarios passed against final production Node startup |
| App Docker image | Linux multi-stage runner built with no DATABASE_URL and started on mapped port 3001 |
| Docker browser | All 3 extended Playwright scenarios passed against the final app image |
| Container process | App and migrator report UID 1001/GID 1001; app Docker health status was `healthy` |
| Container secret files | `.env`, `.env.local` and `.env.production` were absent from the app container; build context excludes environment secrets |
| Removed Sites endpoints | Sign-in, sign-out and callback URLs returned 404 on the migrated server |
| Migration image | Slim migrator target built; ran twice against a fresh random local DB, both succeeded, exactly one migration-history row |
| Changed code lint | ESLint exited 0 for APIs, db, HTTP helper, migration/start scripts, tests and configuration |
| Whitespace/source preservation | `git diff --check` passed; room UI, clearing logic, faction guides, assets and shared UI source have no changes |

Database scenarios:

1. Initial schema, bigint timestamp type, member index, idempotent rerun and
   simultaneous migration processes.
2. Duplicate room code retry/exhaustion with original room/host intact.
3. Simultaneous room creators colliding on one code produce unique rooms.
4. Twelve concurrent joins accept exactly five guests beside the host, preserve
   the six-member limit, clamp bots to zero and increment revisions correctly.
5. Concurrent joins for the same user create one membership; rename retains
   joined timestamp and does not increment revision.
6. Eleven simultaneous host writes preserve every revision increment and retain
   saved result when omitted; explicit null clears it.
7. Simultaneous joins and host bot updates respect human-plus-bot capacity.
8. Route request/response contracts, no-store, 400/403/404 responses and faction/
   clearing result round trip, plus the minimal health response.

Browser scenarios:

1. Homepage, local fonts/map/favicon, health response, general rules, all 13
   faction guide routes, scene navigation and hydration without page errors.
2. Separate host/guest contexts create/join a room, reject too-small faction pool,
   draw the chosen Cat/Eyrie pair at Reach 17, share ordinary clearing results,
   enforce guest controls, then verify Marsh flooding for two participants and
   three landmarks for five human-plus-bot participants.
3. A mobile 390×844 Keepers in Iron map scene supports Encamp and reset.

The fresh random databases created by integration/image checks were removed by
those checks. Browser scenarios leave ordinary test rooms in the local app DB.
The generated `.env` and local PostgreSQL volume are ignored, not deliverable
credentials. Existing D1 state was neither read nor copied.

## Known failures and unverified checks

- Full `pnpm.cmd run lint` still fails with **34 errors and 79 warnings**, matching
  the original project baseline. These are existing UI hook/link/image/unused
  issues. No broad lint disable was added; changed migration code lint passes.
- Azure resource provisioning, actual Azure PostgreSQL TLS/DNS/firewall
  connectivity, ACR push/pull, migration job execution, Azure probes and
  revision rollout/rollback were **not executed**. Official Microsoft/Next.js
  documentation was consulted for the deployment instructions and CLI options.
- Automated browser coverage is Chromium, not a full browser/device matrix.
  Every guide's hydration/navigation was tested, but not every individual rule
  action. Representative mobile map interaction and room setup were tested.
- No D1-to-PostgreSQL data migration was attempted, by design.
- The original client-provided host-ID authorization and client-generated result
  contracts remain; this migration does not introduce an authenticated account
  system or independently validate the game's full rules on the server.

## Reproduce

Follow README_LOCAL.md to configure a new local `.env`, then:

```powershell
pnpm.cmd install --frozen-lockfile
docker compose up -d --wait postgres
pnpm.cmd run db:migrate
pnpm.cmd run typecheck
pnpm.cmd run test:db
pnpm.cmd run build
pnpm.cmd exec playwright install chromium
pnpm.cmd run start
# In a second terminal:
pnpm.cmd run test:e2e
```

For Docker, stop the local Node server and use
`docker compose --profile app up -d --build app`, then run the same browser suite.
The explicit migrator-image commands are in README_LOCAL.md. Azure deployment
and rollback commands, placeholders and validation gates are in
AZURE_DEPLOYMENT.md.
