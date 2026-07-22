import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function Home() {
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
              key={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </main>
  );
}