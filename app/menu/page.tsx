"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { supabase } from "@/lib/supabase/client";

type Category = {
  id: number;
  name: string;
};

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (error) {
      alert(`Supabase Hatası: ${error.message}`);
      console.error("Supabase Error:", error);
      return;
    }

    setCategories(data ?? []);
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md mx-auto px-5 py-8">
        <Header />

        <div className="mt-5 mb-6">
          <h2 className="text-center text-2xl font-extrabold tracking-wide">
            Menü
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              title={item.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
}