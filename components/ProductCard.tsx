"use client";

type Props = {
  name: string;
  description?: string;
  price: number;
  image?: string;
};

export default function ProductCard({
  name,
  description,
  price,
  image,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-red-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-red-500/10">

      <div className="flex items-center gap-4 p-5">

        {/* FOTO */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-800">

          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl">🍔</span>
          )}

        </div>

        {/* YAZILAR */}
        <div className="flex-1">

          <h3 className="text-xl font-bold text-white">
            {name}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {description || "Ürün açıklaması"}
          </p>

        </div>

        {/* FİYAT */}
        <div className="rounded-xl bg-red-600 px-3 py-2 text-lg font-bold text-white">
          ₺{price}
        </div>

      </div>

    </div>
  );
}