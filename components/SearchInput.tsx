"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Ara...",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      />
    </div>
  );
}