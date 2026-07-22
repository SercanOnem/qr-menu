import StatCard from "./components/StatCard";
import {
  LayoutGrid,
  Package,
  Plus,
  QrCode,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatCard
          title="Toplam Kategori"
          value={8}
          icon={<LayoutGrid size={26} />}
        />

        <StatCard
          title="Toplam Ürün"
          value={42}
          icon={<Package size={26} />}
        />
      </div>

      {/* Hızlı İşlemler */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Hızlı İşlemler
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-semibold text-white transition-all hover:bg-red-700 hover:scale-[1.02]">
            <Plus size={20} />
            Yeni Kategori
          </button>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-4 font-semibold text-white transition-all hover:bg-zinc-700 hover:scale-[1.02]">
            <Plus size={20} />
            Yeni Ürün
          </button>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-4 font-semibold text-white transition-all hover:bg-zinc-700 hover:scale-[1.02]">
            <QrCode size={20} />
            QR Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}