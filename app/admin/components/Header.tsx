"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/admin": "Genel Bakış",
    "/admin/categories": "Kategoriler",
    "/admin/products": "Ürünler",
    "/admin/settings": "Ayarlar",
    "/admin/qr": "QR Kod",
  };

  const title = titles[pathname] ?? "Yönetim Paneli";

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <h1 className="text-2xl font-bold text-white">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
          D
        </div>

        <div>
          <p className="font-semibold text-white">
            DOY DOY 35
          </p>

          <p className="text-xs text-zinc-400">
            Yönetici
          </p>
        </div>
      </div>
    </header>
  );
}