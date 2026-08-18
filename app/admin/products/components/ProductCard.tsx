"use client";

import { Package, Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  active: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  name,
  price,
  category,
  active,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="group min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] sm:p-5">

      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">

        {/* Sol - Ürün Bilgileri */}
        <div className="flex min-w-0 flex-1 items-start gap-4">

          <div className="shrink-0 rounded-xl bg-red-600/20 p-3 transition-all duration-300 group-hover:bg-red-600">
            <Package
              size={24}
              className="text-red-500 transition-colors duration-300 group-hover:text-white"
            />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex min-w-0 items-start justify-between gap-3">

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-white">
                  {name}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Kategori
                </p>

                <p className="truncate font-medium text-zinc-300">
                  {category}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {active ? "Aktif" : "Pasif"}
              </span>

            </div>

            {/* Fiyat */}
            <div className="mt-3">
              <p className="text-xs text-zinc-500">
                Fiyat
              </p>

              <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-red-500">
                ₺{price}
              </p>
            </div>

          </div>
        </div>

        {/* Sağ - İşlemler */}
        <div className="flex w-full shrink-0 gap-2 lg:w-auto">

          <button
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-medium text-white transition-all duration-300 hover:border-red-500 hover:bg-zinc-700 lg:min-w-[130px] lg:flex-none"
          >
            <Pencil size={17} />
            Düzenle
          </button>

          <button
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-medium text-white transition-all duration-300 hover:bg-red-700 lg:min-w-[100px] lg:flex-none"
          >
            <Trash2 size={17} />
            Sil
          </button>

        </div>

      </div>
    </div>
  );
}