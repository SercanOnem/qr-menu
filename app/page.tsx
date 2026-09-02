"use client";

import Link from "next/link";
import {
  QrCode,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-black text-white">
      <div className="flex min-h-screen w-full max-w-md flex-col px-5 py-8">
        <Header />

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10">
            <UtensilsCrossed
              size={38}
              className="text-red-500"
            />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            Hoş Geldiniz! 👋
          </h1>

          <p className="mt-4 max-w-sm text-base leading-7 text-zinc-400">
            DOY DOY 35 olarak birbirinden lezzetli burgerler,
            dönerler ve daha fazlasıyla sizleri bekliyoruz.
          </p>

          <Link
            href="/menu"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-95"
          >
            <UtensilsCrossed size={22} />
            Menüyü Gör
            <ArrowRight size={20} />
          </Link>

          <div className="mt-6 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />

            <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              veya
            </span>

            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="mt-6 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-center gap-3">
              <QrCode
                size={24}
                className="text-yellow-400"
              />

              <h2 className="font-semibold text-white">
                QR Kod ile Menü
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Masanızdaki QR kodu telefonunuzla okutarak
              menümüze hızlıca ulaşabilirsiniz.
            </p>

            <Link
              href="/menu"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400"
            >
              Menüye Git
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <footer className="pt-8 text-center">
          <p className="font-semibold text-white">
            DOY DOY 35
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Lezzetin Buluşma Noktası
          </p>
        </footer>
      </div>
    </main>
  );
}