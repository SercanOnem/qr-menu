"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
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
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobil hamburger */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white lg:hidden"
          aria-label="Menüyü aç"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold text-white sm:text-2xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white sm:h-10 sm:w-10">
          D
        </div>

        <div className="hidden sm:block">
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