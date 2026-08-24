"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Download,
  ExternalLink,
  Copy,
  Check,
  Printer,
  QrCode,
  Smartphone,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

export default function QRPage() {
  const [menuUrl, setMenuUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMenuUrl("http://10.216.146.151:3000");
  }, []);

  const copyUrl = async () => {
    if (!menuUrl) return;

    await navigator.clipboard.writeText(menuUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadQR = () => {
    const canvas = document.querySelector(
      "#menu-qr canvas"
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "menu-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printQR = () => {
    window.print();
  };

  return (
    <div className="min-h-full p-6 md:p-8">
      {/* Başlık */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/15 text-red-500">
            <QrCode size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              QR Kod
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Menünüz için QR kod oluşturun ve paylaşın.
            </p>
          </div>
        </div>
      </div>

      {/* Ana Kart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Alanı */}
        <div className="rounded-3xl border border-white/10 bg-[#111113] p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Menü QR Kodunuz
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Müşterileriniz QR kodu okutarak menünüze hızlıca ulaşabilir.
            </p>
          </div>

          <div
            id="menu-qr"
            className="flex justify-center rounded-3xl bg-white p-6"
          >
            {menuUrl && (
              <QRCodeCanvas
                value={menuUrl}
                size={260}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              />
            )}
          </div>

          {/* Butonlar */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Download size={19} />
              QR İndir
            </button>

            <button
              onClick={printQR}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <Printer size={19} />
              Yazdır
            </button>
          </div>
        </div>

        {/* Menü Bilgileri */}
        <div className="rounded-3xl border border-white/10 bg-[#111113] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
              <LinkIcon size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Menü Linki
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                QR kodunuzun yönlendirdiği menü adresi.
              </p>
            </div>
          </div>

          {/* Menü URL */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Menü URL
            </label>

            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <input
                type="text"
                value={menuUrl}
                readOnly
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-300 outline-none"
              />

              <button
                onClick={copyUrl}
                className="flex items-center gap-2 border-l border-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/5"
              >
                {copied ? (
                  <>
                    <Check
                      size={17}
                      className="text-green-500"
                    />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy size={17} />
                    Kopyala
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Menüye Git */}
          <a
            href={menuUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <ExternalLink size={19} />
            Menüyü Aç
          </a>

          {/* Nasıl Kullanılır */}
          <div className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-5">
            <h3 className="font-semibold text-white">
              QR Kod Nasıl Kullanılır?
            </h3>

            <div className="mt-5 space-y-4">
              {/* Adım 1 */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Download size={18} />
                </div>

                <div>
                  <p className="font-medium text-white">
                    QR kodu indirin
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-400">
                    QR kodunuzu indirin veya yazdırın.
                  </p>
                </div>
              </div>

              {/* Adım 2 */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="font-medium text-white">
                    Görünür bir yere yerleştirin
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-400">
                    Masalara, girişe veya menülerin üzerine koyun.
                  </p>
                </div>
              </div>

              {/* Adım 3 */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Smartphone size={18} />
                </div>

                <div>
                  <p className="font-medium text-white">
                    Müşteriler menünüze ulaşsın
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-400">
                    QR kod okutulduğunda menünüz doğrudan açılır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}