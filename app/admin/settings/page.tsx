"use client";

import { useState } from "react";
import {
  Store,
  Phone,
  MapPin,
  Image as ImageIcon,
  Palette,
  Settings,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [restaurantName, setRestaurantName] = useState("DOY DOY 35");
  const [slogan, setSlogan] = useState("Lezzetin Buluşma Noktası");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [primaryColor, setPrimaryColor] = useState("#ff0000");
  const [showPrices, setShowPrices] = useState(true);
  const [menuActive, setMenuActive] = useState(true);

  const handleSave = () => {
    alert("Ayarlar kaydedildi!");
  };

  return (
    <div className="space-y-6">
      {/* İşletme Bilgileri */}
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
            <Store size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">İşletme Bilgileri</h2>
            <p className="text-sm text-gray-400">
              Menüde gösterilecek işletme bilgilerini düzenleyin.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* İşletme adı */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              İşletme Adı
            </label>

            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>

          {/* Slogan */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Slogan
            </label>

            <input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
              <Phone size={16} />
              Telefon
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>

          {/* Adres */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
              <MapPin size={16} />
              Adres
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="İşletme adresi"
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
            <ImageIcon size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Logo</h2>
            <p className="text-sm text-gray-400">
              Menüde kullanılacak işletme logosunu yönetin.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-black">
            <span className="text-sm text-gray-500">Logo</span>
          </div>

          <div>
            <button
              type="button"
              className="rounded-xl bg-white/10 px-5 py-3 font-medium transition hover:bg-white/15"
            >
              Logo Değiştir
            </button>

            <p className="mt-2 text-xs text-gray-500">
              PNG, JPG veya WEBP. Önerilen boyut: 500x500px
            </p>
          </div>
        </div>
      </div>

      {/* Menü Görünümü */}
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
            <Palette size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Menü Görünümü</h2>
            <p className="text-sm text-gray-400">
              Menünüzün renk ayarlarını yönetin.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1b1e] p-4">
          <div>
            <p className="font-medium">Ana Renk</p>
            <p className="text-sm text-gray-500">
              Butonlar ve vurgu alanlarında kullanılır.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
            />

            <span className="text-sm text-gray-400">
              {primaryColor}
            </span>
          </div>
        </div>
      </div>

      {/* Menü Ayarları */}
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
            <Settings size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Menü Ayarları</h2>
            <p className="text-sm text-gray-400">
              Menünüzün çalışma şeklini belirleyin.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Menü aktif */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1b1e] p-4">
            <div>
              <p className="font-medium">Menüyü Aktif Et</p>
              <p className="text-sm text-gray-500">
                Müşteriler menünüze erişebilsin.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMenuActive(!menuActive)}
              className={`relative h-7 w-12 rounded-full transition ${
                menuActive ? "bg-red-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  menuActive ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Fiyat göster */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1b1e] p-4">
            <div>
              <p className="font-medium">Ürün Fiyatlarını Göster</p>
              <p className="text-sm text-gray-500">
                Menüde ürün fiyatları gösterilsin.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPrices(!showPrices)}
              className={`relative h-7 w-12 rounded-full transition ${
                showPrices ? "bg-red-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  showPrices ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Kaydet */}
      <div className="flex justify-end pb-8">
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
        >
          <Save size={18} />
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
}