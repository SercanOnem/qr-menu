"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

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
    <div className="space-y-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="text-zinc-400">
      Menü kategorilerini buradan yönetebilirsin.
    </p>
  </div>

  <button
    onClick={() => {
      setEditingCategory(null);
      setModalOpen(true);
    }}
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
  >
    <Plus size={18} />
    Yeni Kategori
  </button>
</div>


      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
          Kategoriler yükleniyor...
        </div>
      ) : (
        <div className="grid gap-5">
          {categories.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              Henüz kategori bulunmuyor.
            </div>
          ) : (
            categories.map((category) => (
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
            ))
          )}
        </div>
      )}

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