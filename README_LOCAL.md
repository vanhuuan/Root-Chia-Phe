# Root • Chia phe — chạy local

Bản xuất source phiên bản 28, gồm toàn bộ hướng dẫn phe mới nhất, assets, fonts và migrations.
Source commit: `1c10b80fb238faae6109989f39df5df2d58d97af`.

## Yêu cầu

- Node.js 22, phiên bản ít nhất 22.13.0 (https://nodejs.org/en/download).
- pnpm **11.25.0**, đúng phiên bản `packageManager` trong package.json.
- Windows PowerShell hoặc Command Prompt, macOS/Linux terminal.
- Kết nối Internet khi cài dependencies lần đầu. Không cần tài khoản Cloudflare, API key hay SQL Server cho local.

Stack: React + TypeScript, Vinext/Vite, Cloudflare Worker và D1 SQLite local qua Miniflare. Đây không phải Next.js chạy bằng `next dev`; dùng các scripts có sẵn.

## Bước 1 — giải nén và cài dependencies

Giải nén ZIP. Mở terminal trong thư mục `root-chia-phe` có package.json.

```powershell
node --version
npm install -g pnpm@11.25.0
pnpm --version
pnpm install --frozen-lockfile
```

Nếu PowerShell chặn file .ps1, dùng Command Prompt hoặc gọi `npm.cmd` và `pnpm.cmd` thay cho npm/pnpm, không cần đổi policy hệ thống.
Nếu installer báo một dependency cần chạy build script, đọc tên package và dùng `pnpm approve-builds` để cho phép package phù hợp, rồi chạy lại install nếu được yêu cầu. Không đổi lockfile chỉ để nâng phiên bản.

## Bước 2 — tạo build config và database local (lần đầu)

```powershell
pnpm run build
node scripts/local-db.mjs
```

`local-db.mjs` áp dụng migration `drizzle/0000_soft_meggan.sql` cho binding DB **local**.
Database lưu trong `.wrangler/state`, không kết nối dữ liệu phòng trên site đang online.
Chỉ chạy migration này lần đầu cho mỗi database local mới. Nếu báo table already exists, database đã được tạo: không cần chạy lại.

## Bước 3 — chạy chế độ phát triển

```powershell
pnpm run dev
```

Mở **http://localhost:5173** (hoặc port terminal thông báo).

- `/`: chia phe, chọn map, phòng chơi.
- `/rules`: luật cơ bản và liên kết hướng dẫn mọi phe.
- `/rules/factions/keepers-in-iron`: Hiệp sĩ Lửng sắt.
- `/rules/factions/lord-of-the-hundreds`: Lãnh chúa Bầy Chuột.

Chỉnh file trong `app/`, trình duyệt tự cập nhật qua HMR. Dừng server: Ctrl+C.

Để chỉ xem hướng dẫn luật/chia phe trên trình duyệt, có thể dùng `pnpm run dev` ngay sau install; tính năng tạo/join phòng cần database được khởi tạo ở bước 2.

## Chạy bản build

Sau `pnpm run build` và khởi tạo database:

```powershell
pnpm run start -- --port 8787
```

Mở http://127.0.0.1:8787. Dev và start dùng cùng `.wrangler/state`.
Lệnh này chạy Worker tại máy, không publish/deploy.

## Cấu trúc quan trọng

| Thư mục/file | Nội dung |
| --- | --- |
| app/ | Trang, component React, API phòng chơi |
| app/rules/factions/ | Nội dung và các mô hình luật từng phe |
| public/assets/ | Ảnh map, phe, icon |
| public/fonts/ | Font Be Vietnam Pro và giấy phép |
| db/ | Schema Drizzle |
| drizzle/ | SQL migration và metadata |
| vite.config.ts | Vinext/Vite, binding local D1 |
| .openai/hosting.json | Metadata project và binding DB; giữ nguyên khi chạy local |
| scripts/local-db.mjs | Khởi tạo schema database local |

## Lỗi thường gặp

- `no such table: rooms`: chạy build rồi `node scripts/local-db.mjs` từ project root.
- `table already exists`: migration đã chạy; không cần chạy lại.
- Không tìm thấy pnpm/Node: đóng và mở terminal sau khi cài, kiểm tra PATH.
- Port 5173 bận: dừng server cũ hoặc `pnpm run dev -- --port 5174`.
- Không chạy trên Windows vì Bash/timeout: dùng `pnpm install`, `pnpm run dev`, `pnpm run build`; không dùng các installer `.sh` trong README starter. ZIP không chứa cấu hình managed-linux, nên project tự chọn portable.
- `pnpm install` bị lệch lockfile: dùng đúng pnpm 11.25.0, không trộn npm install với pnpm install trong dự án.
- Chạy `tsc --noEmit` có thể báo 12 lỗi hiện hữu tại API phòng về `env.DB` possibly undefined vì binding được khai báo optional; build thực tế hoạt động với DB được cấu hình. Đây không phải lỗi mới của bản ZIP.

## Phạm vi bản ZIP

Có source, lockfile, assets và hướng dẫn local; không có node_modules, build output, Git history, dữ liệu phòng production, credentials hoặc cache. Cần cài dependencies trên máy mình. Các tài nguyên artwork giữ nguyên thông tin nguồn/giấy phép trong repository; bản ZIP không cấp thêm quyền tái sử dụng artwork.

README.md gốc là README starter; làm theo README_LOCAL.md này cho bản Root hiện tại.
