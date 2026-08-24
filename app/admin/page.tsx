"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StatCard from "./components/StatCard";
import { supabase } from "@/lib/supabase/client";

import {
  LayoutGrid,
  Package,
  Plus,
  QrCode,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: categories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    setCategoryCount(categories ?? 0);
    setProductCount(products ?? 0);
  }

  return (
    <div className="space-y-10">
      {/* Açıklama */}
      <div>
        <p className="text-zinc-400">
          Restoran yönetimine buradan hızlıca erişebilirsiniz.
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatCard
          title="Toplam Kategori"
          value={categoryCount}
          icon={<LayoutGrid size={30} />}
          onClick={() => router.push("/admin/categories")}
        />

        <StatCard
          title="Toplam Ürün"
          value={productCount}
          icon={<Package size={30} />}
          onClick={() => router.push("/admin/products")}
        />
      </div>

      {/* Hızlı İşlemler */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">
          Hızlı İşlemler
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <button
            onClick={() => router.push("/admin/categories")}
            className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.20)] active:scale-[0.98]"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600/15 transition-all duration-300 group-hover:bg-red-600">
              <Plus
                size={42}
                className="text-red-500 transition group-hover:text-white"
              />
            </div>

            <h3 className="mt-6 text-3xl font-bold text-white">
              Yeni Kategori
            </h3>

            <p className="mt-3 text-zinc-400 group-hover:text-zinc-200">
              Menüye yeni kategori ekleyin.
            </p>
          </button>

          <button
            onClick={() => router.push("/admin/products")}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.20)]"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-red-600">
              <Plus
                size={42}
                className="text-white transition group-hover:text-white"
              />
            </div>

            <h3 className="mt-6 text-3xl font-bold text-white">
              Yeni Ürün
            </h3>

            <p className="mt-3 text-zinc-400 group-hover:text-zinc-200">
              Menüye yeni ürün ekleyin.
            </p>
          </button>

          <button
            onClick={() => router.push("/admin/qr")}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.20)]"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-red-600">
              <QrCode
                size={42}
                className="text-white transition group-hover:text-white"
              />
            </div>

            <h3 className="mt-6 text-3xl font-bold text-white">
              QR Oluştur
            </h3>

            <p className="mt-3 text-zinc-400 group-hover:text-zinc-200">
              Menü QR kodunu oluşturun.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}