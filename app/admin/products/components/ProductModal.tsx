"use client";

import { X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
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
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? "");
      setDescription(initialData?.description ?? "");
      setPrice(initialData?.price ?? 0);
      setImageUrl(initialData?.image_url ?? "");
      setPreview(initialData?.image_url ?? "");
      setCategoryId(initialData?.category_id ?? 0);
      setActive(initialData?.is_active ?? true);
    }
  }, [open, initialData]);

  if (!open) return null;
  async function uploadImage(file: File) {
  try {
    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert("Resim yüklenemedi.");
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setPreview(data.publicUrl);
  } finally {
    setUploading(false);
  }
}

  function handleSave() {
    if (!name.trim()) {
  alert("Ürün adı zorunludur.");
  return;
}

if (categoryId === 0) {
  alert("Kategori seçiniz.");
  return;
}

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

          <div className="space-y-3">

  <label className="text-sm font-medium text-white">
    Ürün Fotoğrafı
  </label>

  {preview && (
    <img
      src={preview}
      alt="Önizleme"
      className="h-36 w-36 rounded-2xl border border-zinc-700 object-cover"

    />
  )}

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      if (!e.target.files?.length) return;

      await uploadImage(e.target.files[0]);
    }}
    className="block w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white
    file:mr-4 file:rounded-lg file:border-0 file:bg-red-600 file:px-4 file:py-2
    file:text-white hover:file:bg-red-700"
  />

  {uploading && (
    <p className="text-sm text-yellow-400">
      Fotoğraf yükleniyor...
    </p>
  )}

</div>

          <input
  type="text"
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
            disabled={uploading}
             className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Yükleniyor..." : "Kaydet"}
          </button>

        </div>

      </div>

    </div>
  );
}