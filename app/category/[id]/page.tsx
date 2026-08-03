"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function CategoryPage() {
  const params = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    setCategory(categoryData);

    const { data: productData } = await supabase
      .from("products")
      .select("id,name,description,price")
      .eq("category_id", Number(params.id))
      .eq("is_active", true)
      .order("id");

    setProducts(productData ?? []);
  }

  if (!category) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Yükleniyor...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-5 py-8">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-400 transition"
        >
          ← Ana Menü
        </Link>

        <div className="mt-6 mb-8">

          <h1 className="text-4xl font-black tracking-tight">
            🍽️ {category.name}
          </h1>

          <p className="mt-2 text-zinc-400">
            En lezzetli seçenekleri keşfet.
          </p>

        </div>

        <div className="mx-auto flex max-w-md flex-col gap-7">

          {products.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
              Bu kategoride henüz ürün bulunmuyor.
            </div>
          ) : (
            products.map((product) => (

              <div
                key={product.id}
                className="mx-auto flex w-full items-center gap-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:border-red-500 hover:bg-zinc-800">

                {/* FOTO */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-zinc-800">

                  <div className="text-center text-zinc-500">

                    <div className="text-3xl">
                      📷
                    </div>

                    <p className="mt-1 text-[11px]">
                      Fotoğraf
                    </p>

                  </div>

                </div>

                {/* YAZILAR */}
                <div className="flex-1 overflow-hidden">

                  <h2 className="truncate text-2xl font-bold text-white">
                    {product.name}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-300">
                    {product.description}
                  </p>

                </div>

                {/* FİYAT */}
                <div className="flex items-center">

                  <div className="rounded-2xl bg-red-600 px-4 py-2 text-xl font-bold text-white shadow-lg">
                    ₺{product.price}
                  </div>

                </div>

              </div>

            ))
          )}

        </div>

      </div>
    </main>
  );
}