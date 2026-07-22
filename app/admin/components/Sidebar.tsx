"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LayoutGrid,
  Package,
  QrCode,
  Settings,
  ExternalLink,
} from "lucide-react";

const menuItems = [
  {
    name: "Genel Bakış",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Kategoriler",
    href: "/admin/categories",
    icon: LayoutGrid,
  },
  {
    name: "Ürünler",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "QR Kod",
    href: "/admin/qr",
    icon: QrCode,
  },
  {
    name: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          DOY DOY 35
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Yönetim Paneli
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                pathname === item.href
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <a
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 font-medium text-white transition hover:bg-zinc-700"
        >
          <ExternalLink size={18} />
          Menüyü Gör
        </a>
      </div>
    </aside>
  );
}