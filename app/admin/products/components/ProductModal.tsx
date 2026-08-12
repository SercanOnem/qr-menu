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
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [active, setActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? "");
      setDescription(initialData?.description ?? "");
      setPrice(initialData?.price?.toString() ?? "");
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
      price: Number(price),
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

        <div className="space-y-5">

  {/* Ürün Fotoğrafı */}
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      Ürün Fotoğrafı
    </label>

    <p className="text-xs text-zinc-400">
      Menüde gösterilecek ürün fotoğrafını yükleyin.
    </p>

    {preview && (
      <img
        src={preview}
        alt="Ürün önizleme"
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


  {/* Ürün Adı */}
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      Ürün Adı
    </label>

    <p className="text-xs text-zinc-400">
      Ürünün menüde görünecek adını yazın.
    </p>

    <input
      type="text"
      placeholder="Örn. Kaşarlı Tost"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
    />
  </div>


  {/* Açıklama */}
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      Açıklama
    </label>

    <p className="text-xs text-zinc-400">
      Ürünün içeriğini veya müşterinin bilmesi gereken bilgileri yazın.
    </p>

    <textarea
      placeholder="Örn. Adana kaşarı, sucuk ve tereyağı ile hazırlanır."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="h-28 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
    />
  </div>


  {/* Fiyat */}
  <div className="space-y-1">
  <label className="text-sm font-medium text-white">
    Fiyat
  </label>

  <p className="text-xs text-zinc-400">
    Ürünün satış fiyatını Türk Lirası olarak girin.
  </p>

  <div className="relative">
    <input
      type="number"
      placeholder="Örn. 150 ₺"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      min="0"
      className="w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
    />

    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
      ₺
    </span>
  </div>
</div>


  {/* Kategori */}
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-white">
      Kategori
    </label>

    <p className="text-xs text-zinc-400">
      Ürünün menüde hangi kategori altında gösterileceğini seçin.
    </p>

    <select
      value={categoryId}
      onChange={(e) => setCategoryId(Number(e.target.value))}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white focus:border-red-500 focus:outline-none"
    >
      <option value={0}>Kategori seçiniz</option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
      ))}
    </select>
  </div>


  {/* Aktif / Pasif */}
  <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4">
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
        className="h-4 w-4 accent-red-600"
      />

      <div>
        <p className="text-sm font-semibold text-white">
          Ürün Aktif
        </p>

        <p className="text-xs text-zinc-400">
          Aktif olmayan ürünler müşteri menüsünde gösterilmez.
        </p>
      </div>
    </label>
    </div>

        {/* Butonlar */}
        <div className="mt-6 flex justify-end gap-3 border-t border-zinc-800 pt-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-zinc-800 px-5 py-3 font-medium text-white transition hover:bg-zinc-700"
          >
            Vazgeç
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={uploading}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Yükleniyor..." : initialData ? "Değişiklikleri Kaydet" : "Ürünü Kaydet"}
          </button>

        </div>
  </div>

</div>
      </div>

    
  );
}