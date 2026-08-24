"use client";

import { useEffect, useState } from "react";
import { Plus, FolderOpen } from "lucide-react";

import CategoryCard from "./components/CategoryCard";
import CategoryModal from "./components/CategoryModal";

import { supabase } from "@/lib/supabase/client";

interface Category {
  id: number;
  name: string;
  products: {
    id: number;
  }[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  async function getCategories() {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        products (
          id
        )
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setCategories((data as Category[]) || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function handleSave(name: string) {
    if (editingCategory) {
      const { error } = await supabase
        .from("categories")
        .update({
          name,
        })
        .eq("id", editingCategory.id);

      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("categories")
        .insert({
          name,
        });

      if (error) {
        console.error(error);
        return;
      }
    }

    setModalOpen(false);
    setEditingCategory(null);

    await getCategories();
  }

  async function handleDelete(id: number) {
    const result = confirm(
      "Bu kategoriyi silmek istediğine emin misin?"
    );

    if (!result) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    await getCategories();
  }

  return (
    <div className="min-w-0 space-y-6">

      {/* Üst Alan */}
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="min-w-0">
          <p className="text-zinc-400">
            Menü kategorilerini buradan yönetebilirsin.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-95 md:w-auto"
        >
          <Plus size={18} />
          Yeni Kategori
        </button>
      </div>

      {/* İçerik */}
      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
          Kategoriler yükleniyor...
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
            <FolderOpen size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            Henüz kategori bulunmuyor
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Menünü oluşturmak için ilk kategorini ekleyebilirsin.
          </p>

          <button
            onClick={() => {
              setEditingCategory(null);
              setModalOpen(true);
            }}
            className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
          >
            <Plus size={18} />
            İlk Kategoriyi Ekle
          </button>
        </div>
      ) : (
        <div className="grid min-w-0 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              productCount={category.products.length}
              onEdit={() => {
                setEditingCategory(category);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(category.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CategoryModal
        open={modalOpen}
        initialValue={editingCategory?.name || ""}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}