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
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-red-600/20 p-3 transition-all duration-300 group-hover:bg-red-600">
          <Package
            size={24}
            className="text-red-500 transition-colors duration-300 group-hover:text-white"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {name}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Kategori
              </p>

              <p className="font-medium text-zinc-300">
                {category}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                active
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {active ? "Aktif" : "Pasif"}
            </span>
          </div>

          <div className="mt-5 border-t border-zinc-800 pt-5">
            <p className="text-sm text-zinc-500">
              Fiyat
            </p>

            <p className="mt-1 text-3xl font-extrabold tracking-tight text-red-500">
              ₺{price}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onEdit}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 font-medium text-white transition-all duration-300 hover:border-red-500 hover:bg-zinc-700"
            >
              <Pencil size={18} />
              Düzenle
            </button>

            <button
              onClick={onDelete}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition-all duration-300 hover:bg-red-700"
            >
              <Trash2 size={18} />
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}