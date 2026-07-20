export default function Featured() {
  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-5 shadow-xl">

      <p className="text-sm uppercase tracking-widest text-yellow-300">
        ⭐ En Çok Tercih Edilenler
      </p>

      <div className="mt-5 space-y-3">

        <div className="rounded-xl bg-white/10 p-3">
          🍔 Maxi Kare Menü
        </div>

        <div className="rounded-xl bg-white/10 p-3">
          🥪 Karışık Tost
        </div>

        <div className="rounded-xl bg-white/10 p-3">
          🌯 Tavuk Döner
        </div>

        <div className="rounded-xl bg-white/10 p-3">
          🦪 Midye Dolma
        </div>

      </div>

    </div>
  );
}