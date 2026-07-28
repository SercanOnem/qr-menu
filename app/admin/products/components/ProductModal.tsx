"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface ProductModalProps {
  open: boolean;
  categories: Category[];
  initialData?: {
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_id: number;
    is_active: boolean;
  };
  onClose: () => void;
  onSave: (data: {
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_id: number;
    is_active: boolean;
  }) => void;
}

export default function ProductModal({
  open,
  categories,
  initialData,
  onClose,
  onSave,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? "");
      setDescription(initialData?.description ?? "");
      setPrice(initialData?.price ?? 0);
      setImageUrl(initialData?.image_url ?? "");
      setCategoryId(initialData?.category_id ?? 0);
      setActive(initialData?.is_active ?? true);
    }
  }, [open, initialData]);

  if (!open) return null;

  function handleSave() {
    if (!name.trim()) return;

    onSave({
      name,
      description,
      price,
      image_url: imageUrl,
      category_id: categoryId,
      is_active: active,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            {initialData ? "Ürün Düzenle" : "Yeni Ürün"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="text-white" size={18} />
          </button>

        </div>

        <div className="space-y-4">

          <input
            placeholder="Ürün Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          />

          <textarea
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-28 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          />

          <input
            type="number"
            placeholder="Fiyat"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          >
            <option value={0}>Kategori Seç</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Resim URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          />

          <label className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />

            Aktif

          </label>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-800 px-5 py-3 text-white"
          >
            Vazgeç
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Kaydet
          </button>

        </div>

      </div>

    </div>
  );
}