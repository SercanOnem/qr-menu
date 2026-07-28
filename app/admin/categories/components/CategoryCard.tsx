"use client";

import { FolderOpen, Pencil, Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  id: number;
  name: string;
  productCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CategoryCard({
  id,
  name,
  productCount,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/admin/products?category=${id}`)
      }
      className="group flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:scale-[1.01] hover:border-red-500"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-red-600/20 p-3">
          <FolderOpen
            size={26}
            className="text-red-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">
              {name}
            </h2>

            <ArrowRight
              size={18}
              className="translate-x-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500"
            />
          </div>

          <p className="text-sm text-zinc-400">
            {productCount} ürün
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded-xl bg-zinc-800 p-3 transition hover:bg-blue-600"
        >
          <Pencil
            size={18}
            className="text-white"
          />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded-xl bg-zinc-800 p-3 transition hover:bg-red-600"
        >
          <Trash2
            size={18}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
}