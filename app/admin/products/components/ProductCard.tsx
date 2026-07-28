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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-500">

      <div className="flex items-start gap-4">

        <div className="rounded-xl bg-red-600/20 p-3">
          <Package
            size={24}
            className="text-red-500"
          />
        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">
              {name}
            </h2>

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

          <p className="mt-2 text-zinc-400">
            {category}
          </p>

          <p className="mt-3 text-2xl font-bold text-red-500">
            ₺{price}
          </p>

          <div className="mt-5 flex gap-3">

            <button
              onClick={onEdit}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <div className="flex items-center justify-center gap-2">
                <Pencil size={18} />
                Düzenle
              </div>
            </button>

            <button
              onClick={onDelete}
              className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
            >
              <div className="flex items-center justify-center gap-2">
                <Trash2 size={18} />
                Sil
              </div>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}