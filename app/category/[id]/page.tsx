"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Header from "@/components/Header";
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
  image_url?: string;
};

export default function CategoryPage() {
  const params = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    setCategory(categoryData);

    const { data: productData } = await supabase
      .from("products")
      .select("id,name,description,price,image_url")
      .eq("category_id", Number(params.id))
      .eq("is_active", true)
      .order("id");

    setProducts(productData ?? []);

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Yükleniyor...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-md px-5 py-8">

        <Header />

        <div className="mt-4">
          <Link
            href="/"
            className="text-red-500 font-semibold hover:text-red-400"
          >
            ← Ana Menü
          </Link>
        </div>

        <div className="mt-5 mb-6 text-center">

          <h2 className="text-2xl font-extrabold tracking-wide">
            {category?.name}
          </h2>
        </div>

        <div className="flex flex-col gap-4">

          {products.length === 0 ? (

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
              Bu kategoride henüz ürün bulunmuyor.
            </div>

          ) : (

            products.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-red-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-red-500/10"
              >

                <div className="flex items-center gap-4 p-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-800">

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">🍔</span>
                    )}

                  </div>

                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-white">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      {product.description || "Ürün açıklaması"}
                    </p>

                  </div>

                  <div className="rounded-xl bg-red-600 px-3 py-2 text-sm font-bold text-white">
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