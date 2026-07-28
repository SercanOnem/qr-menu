"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryModalProps {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export default function CategoryModal({
  open,
  initialValue = "",
  onClose,
  onSave,
}: CategoryModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialValue);
    }
  }, [open, initialValue]);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) return;

    onSave(name.trim());

    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {initialValue ? "Kategori Düzenle" : "Yeni Kategori"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="text-white" size={18} />
          </button>
        </div>

        <label className="mb-2 block text-sm text-zinc-400">
          Kategori Adı
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Örn: Burgerler"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-800 px-5 py-3 text-white hover:bg-zinc-700"
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