import Header from "@/components/Header";
import Featured from "@/components/Featured";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-lg mx-auto px-6 py-10">
        <Header />

        <Featured />

        <h2 className="mt-10 mb-6 text-center text-2xl font-black">
          📋 Tüm Kategoriler
        </h2>

        <div className="flex flex-col gap-4">
          {categories.map((item) => (
            <CategoryCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              count={item.count}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </main>
  );
}