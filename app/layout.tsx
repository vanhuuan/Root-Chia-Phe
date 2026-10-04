import type { Metadata } from "next";
import "./globals.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  title: "Root • Phòng chia phe",
  description: "Tạo phòng, mời bạn bè bằng QR và random faction Root cân bằng theo Reach.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Root • Phòng chia phe", description: "Quét QR, tập hợp bạn bè và chia faction Root cân bằng.", url: origin, images: [{ url: `${origin}/og.png`, width: 1730, height: 909, alt: "Root • Chia phe" }] },
  twitter: { card: "summary_large_image", title: "Root • Phòng chia phe", description: "Quét QR, tập hợp bạn bè và chia faction Root cân bằng.", images: [`${origin}/og.png`] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="vi"><head><link rel="preload" href="/fonts/be-vietnam-pro-400.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/be-vietnam-pro-600.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body>{children}<a className="rules-shortcut" href="/rules">📖 Luật cơ bản</a></body></html>; }
