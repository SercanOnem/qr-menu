"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  id: number;
  icon?: string;
  title: string;
  desc?: string;
};

export default function CategoryCard({
  id,
  icon = "🍽️",
  title,
  desc = "Kategori",
}: Props) {
  return (
    <Link
      href={`/category/${id}`}
      className="group block overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-red-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-red-500/10"
    >
      <div className="flex items-center gap-4 p-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-3xl transition group-hover:bg-red-500/10">
          {icon}
        </div>

        <div className="flex-1">

          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {desc}
          </p>

        </div>

        <ChevronRight
          size={22}
          className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500"
        />

      </div>
    </Link>
  );
}