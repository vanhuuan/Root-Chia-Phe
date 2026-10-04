# Root • Chia phe — Next.js và PostgreSQL local

Ứng dụng chia phe và học luật Root bằng tiếng Việt. Luật chung và mỗi phe có một
trang cuộn đọc, mục lục và ví dụ tương tác, không cần chuyển bước câu chuyện.
Giữ 13 hướng dẫn phe, 6 bản đồ, artwork và font. Stack: Next.js **16.3.4**, React **19.2.6**,
TypeScript **5.9.3**, Drizzle **0.45.2**, Postgres.js **3.4.9**, Node.js.
Không cần Vinext, Cloudflare, D1 hoặc tài khoản Sites.

## Yêu cầu và dependencies

- Node.js >=22.13.0; Docker image dùng Node 22.
- pnpm **11.25.0**, Docker Desktop với Linux containers và Docker Compose.
- PowerShell; dùng `.cmd` nếu execution policy chặn `.ps1`. Không cần Bash.

```powershell
node --version
npm.cmd install --global pnpm@11.25.0
pnpm.cmd install --frozen-lockfile
Copy-Item .env.example .env
notepad .env
```

Thay placeholder password trong `.env` bằng mật khẩu local ngẫu nhiên, giống nhau
ở `POSTGRES_PASSWORD`, `DATABASE_URL` và `CONTAINER_DATABASE_URL`. URL-encode
password trong connection string; dùng chuỗi hex ngẫu nhiên sẽ tránh ký tự đặc
biệt. User/database phải khớp với URL. Không commit `.env` hoặc trộn package managers.

`DATABASE_URL` dùng `127.0.0.1:5433` cho app trên máy. `CONTAINER_DATABASE_URL`
dùng `postgres:5432` cho app trong Compose. `POSTGRES_PORT=5433` là cổng publish
trên máy; nếu đổi cổng, sửa cả URL local. `NEXT_PUBLIC_SITE_URL` là URL công khai
cho metadata, được đọc khi build; không đặt secret trong biến `NEXT_PUBLIC_*`.

## PostgreSQL và migrations

```powershell
docker compose up -d --wait postgres
pnpm.cmd run db:migrate
```

Database lưu trong volume `postgres_data`, độc lập với D1 cũ và dữ liệu online.
Migration chỉ tạo schema PostgreSQL; **không import/copy production data**.
Runner đọc `.env` hoặc environment, áp dụng `drizzle/postgresql/`, kiểm tra lịch
sử/hash và chạy SQL trong transaction với advisory lock. Chạy lại an toàn;
không chạy migration tự động trong startup của từng replica.

Đổi password trong `.env` không đổi password của volume đã khởi tạo. Giữ cấu hình
khớp hoặc đổi password theo quy trình quản trị DB; không xóa dữ liệu cần giữ.

## Chạy app

```powershell
pnpm.cmd run dev
```

Mở **http://127.0.0.1:3000**. HMR hoạt động với file trong `app/`. Dừng bằng Ctrl+C.
Cổng khác: `pnpm.cmd run dev --port 3002`.

Production local, sau khi dừng dev:

```powershell
pnpm.cmd run build
pnpm.cmd run start
```

`start` chạy Node standalone server, copy public/static assets vào output. Trên
Windows, helper đổi directory symlink do Next sinh ra thành junction trong
`.next/standalone` nếu cần. Production nghe `0.0.0.0:3000`; dùng mạng tin cậy cho
preview. Cổng khác: đặt `$env:PORT = '3002'` trước khi start. Build không cần
database; trang luật và health chạy độc lập, room APIs cần DB đã migrate.

## Production container

```powershell
docker build --target runner --tag root-chia-phe:local .
docker compose --profile app up -d --build app
Invoke-RestMethod http://127.0.0.1:3000/api/health
docker compose logs --tail 100 app
```

Điền `CONTAINER_DATABASE_URL` và dừng server khác ở cổng 3000 trước khi chạy.
Image chứa standalone, public assets, `.next/static`; chạy UID 1001,
`NODE_ENV=production`, `0.0.0.0:3000`. `.env` không vào image. `/api/health` chỉ trả
`{"status":"ok"}`, không trả thông tin nhạy cảm và không kiểm tra DB.

Migration image chạy riêng, explicit, trong cùng mạng Compose:

```powershell
docker build --target migrator --tag root-chia-phe-migrator:local .
$match = Select-String -LiteralPath .env -Pattern '^CONTAINER_DATABASE_URL=(.*)$'
$env:DATABASE_URL = $match.Matches[0].Groups[1].Value
docker run --rm --network root-chia-phe_default -e DATABASE_URL root-chia-phe-migrator:local
Remove-Item Env:DATABASE_URL
```

Nếu đổi project name bằng `docker compose -p`, dùng tên mạng tương ứng.
`db:migrate` trên máy thường tiện hơn cho local. `docker compose --profile app down`
dừng container và giữ dữ liệu. `docker compose down --volumes` **xóa dữ liệu local**;
chỉ dùng khi chủ động reset.

## URL và cấu trúc

| URL / thư mục | Nội dung |
| --- | --- |
| `/` | Phòng, QR, chia phe và clearing |
| `/rules` | Luật chung mở sẵn trên một trang, ví dụ tương tác và tra cứu chi tiết |
| `/rules/factions/<faction-id>` | Hướng dẫn từng phe và map/lab tương tác |
| `/api/rooms` | POST tạo phòng |
| `/api/rooms/<code>` | GET đọc, POST join/đổi tên, PUT thao tác host |
| `/api/health` | Process health |
| `db/` | Schema, pool và transaction phòng |
| `drizzle/postgresql/` | SQL PostgreSQL và metadata |
| `public/assets/`, `public/fonts/` | Artwork/font và giấy phép |
| `scripts/migrate.mjs` | Migration explicit |

Timestamp vẫn là epoch milliseconds (PostgreSQL bigint); JSON vẫn là text, result
rỗng tương ứng null. Giữ primary/composite keys, FK và index. Creation retry code
trùng; join/update khóa row phòng, bảo vệ giới hạn 6 người và revision increments.
Host updates vẫn last-serialized-writer-wins, không yêu cầu expectedRevision.
Omit result giữ bản mới nhất; `result: null` xóa kết quả.

## Authentication khi rời Sites

Giữ guest UUID ở localStorage `root-room-user` và tên ở `root-room-name`. App không
dùng header `oai-authenticated-user-*`. Sites sign-in/sign-out/callback, mock
cookie và workspace access policy không còn ở runtime mới; URL cũ trả 404.
Không thêm login mới. Host-ID contract giữ nguyên; đây **không phải authenticated
authorization**, vì snapshot lộ hostId và PUT nhận ID từ client.

## Validation và phát triển

```powershell
pnpm.cmd run typecheck
pnpm.cmd run lint
pnpm.cmd run test:db
pnpm.cmd exec playwright install chromium
# App local/container phải đang chạy ở port 3000 với database local.
pnpm.cmd run test:e2e
```

DB test chỉ cho loopback, tạo/migrate database `root_test_<uuid>` riêng, kiểm tra
API/concurrency rồi xóa database vừa tạo; cần quyền CREATEDB. E2E tạo phòng trong
DB của app đang chạy: **không chạy trên production**. Cổng khác: đặt
`$env:TEST_BASE_URL = 'http://127.0.0.1:3001'`. Kết quả ở [VALIDATION.md](VALIDATION.md).
Lint còn baseline UI errors; không tắt rules để che lỗi.

Đổi schema: sửa `db/schema.ts`, chạy `pnpm.cmd run db:generate`, review SQL mới,
rồi chạy `pnpm.cmd run db:migrate`. Không sửa SQL đã apply. Runner dùng transaction
cho toàn bộ pending migrations; không dùng `CREATE INDEX CONCURRENTLY` trong
workflow này. Production cần schema tương thích các app revisions.

## Lỗi thường gặp

- Docker không chạy: khởi động Docker Desktop, chọn Linux engine.
- Port DB bận/bị chặn: đổi `POSTGRES_PORT` và URL local, giữ port nội bộ 5432.
- `relation rooms does not exist`: migrate đúng `DATABASE_URL`.
- API 500: kiểm tra URL/password/quyền DB/migration; API không trả secret.
- Remote TLS: `sslmode=verify-full`, hostname đúng certificate và CA trust phù hợp;
  không tắt certificate verification. Local dùng `sslmode=disable`.
- Dừng preview trước khi rebuild. Không dùng `dist/`, `.wrangler/`, `.vinext/` cũ.

Giữ attribution và licenses của artwork/font; source không cấp thêm quyền artwork
Leder Games/Kyle Ferrin. Azure runbook: [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md).
