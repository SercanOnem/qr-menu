"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import {
  QrCode,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const menuUrl = "https://doydoy35.com.tr/menu";

  return (
    <main className="flex min-h-screen justify-center bg-black text-white">
      <div className="flex min-h-screen w-full max-w-md flex-col px-5 py-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="text-center">
            <div className="text-2xl font-extrabold tracking-tight">
              DOY DOY 35
            </div>

            <p className="mt-1 text-sm font-medium text-yellow-400">
              Lezzetin Buluşma Noktası
            </p>
          </div>
        </div>

        {/* Ana İçerik */}
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

          {/* Menü Butonu */}
          <Link
            href="/menu"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-95"
          >
            <UtensilsCrossed size={22} />
            Menüyü Gör
            <ArrowRight size={20} />
          </Link>

          {/* Ayraç */}
          <div className="mt-6 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />

            <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              veya
            </span>

            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* QR Alanı */}
          <div className="mt-6 w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-center gap-3">
              <QrCode
                size={24}
                className="text-yellow-400"
              />

              <h2 className="font-semibold text-white">
                QR Kod ile Menü
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Masanızdaki QR kodu okutabilir veya
              aşağıdaki QR kodu telefonunuzla taratabilirsiniz.
            </p>

            {/* QR Kod */}
            <div className="mt-5 flex justify-center">
              <div className="rounded-2xl bg-white p-4 shadow-lg">
                <QRCodeCanvas
                  value={menuUrl}
                  size={190}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Kameranızı QR koda doğrultun
            </p>

            <Link
              href="/menu"
              className="mt-4 inline-flex items-center gap-2 text-base font-bold text-red-500 transition hover:text-red-400"
            >
              Menüye Git
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Footer */}
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