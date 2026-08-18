"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  is_active: boolean;
  categories:
    | {
        name: string;
      }
    | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  async function loadData() {
    setLoading(true);

    const {
      data: categoryData,
      error: categoryError,
    } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (categoryError) {
      console.error(categoryError);
    }

    setCategories(categoryData ?? []);

    const {
      data: productData,
      error: productError,
    } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        price,
        image_url,
        category_id,
        is_active,
        categories (
          name
        )
      `)
      .order("id");

    if (productError) {
      console.error(productError);
    }

    setProducts((productData as Product[]) ?? []);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
  const searchText = search.toLowerCase().trim();

  const productName = product.name.toLowerCase();
  const categoryName =
    product.categories?.name?.toLowerCase() ?? "";

  const searchMatch =
    !searchText ||
    productName.includes(searchText) ||
    categoryName.includes(searchText);

  const categoryMatch =
    !selectedCategory ||
    product.category_id === Number(selectedCategory);

  return searchMatch && categoryMatch;
});

  const selectedCategoryName = categories.find(
    (c) => c.id === Number(selectedCategory)
  )?.name;

  return (
    <div className="min-w-0 space-y-6">

      {/* Üst Alan */}
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="min-w-0">
          <p className="text-zinc-400">
            Menüdeki tüm ürünleri buradan yönetebilirsin.
          </p>

          {selectedCategoryName && (
            <div className="mt-3 inline-flex max-w-full items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
              📂 Kategori: {selectedCategoryName}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-95 md:w-auto"
        >
          <Plus size={18} />
          Yeni Ürün
        </button>

      </div>

      {/* Arama */}
      <div className="relative min-w-0">
        <Search
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Ürün veya kategori ara..."
  className="h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-900 pl-12 pr-4 text-white placeholder:text-zinc-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
/>
      </div>

      {/* İçerik */}
      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
          Ürünler yükleniyor...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
          Ürün bulunamadı.
        </div>
      ) : (
        <div className="grid min-w-0 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              category={product.categories?.name ?? "-"}
              active={product.is_active}
              onEdit={() => {
                setEditingProduct(product);
                setModalOpen(true);
              }}
              onDelete={async () => {
                if (
                  !confirm(
                    `"${product.name}" ürününü silmek istediğine emin misin?`
                  )
                ) {
                  return;
                }

                const { error } = await supabase
                  .from("products")
                  .delete()
                  .eq("id", product.id);

                if (error) {
                  console.error(error);
                  alert("Ürün silinemedi.");
                  return;
                }

                await loadData();
              }}
            />
          ))}
        </div>
      )}

      <ProductModal
        open={modalOpen}
        categories={categories}
        initialData={
          editingProduct
            ? {
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                image_url: editingProduct.image_url,
                category_id: editingProduct.category_id,
                is_active: editingProduct.is_active,
              }
            : undefined
        }
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={async (data) => {
          let error = null;

          if (editingProduct) {
            const result = await supabase
              .from("products")
              .update(data)
              .eq("id", editingProduct.id);

            error = result.error;
          } else {
            const result = await supabase
              .from("products")
              .insert(data);

            error = result.error;
          }

          if (error) {
            console.error(error);
            alert("Ürün kaydedilemedi.");
            return;
          }

          setModalOpen(false);
          setEditingProduct(null);

          await loadData();
        }}
      />
    </div>
  );
}