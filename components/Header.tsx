import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col items-center text-center">

      <Image
        src="/logo.png"
        alt="DOY DOY 35"
        width={170}
        height={170}
        priority
      />

      <h1 className="mt-6 text-5xl font-black tracking-wide">
        DOY DOY 35
      </h1>

      <div className="mt-4 h-1 w-24 rounded-full bg-red-600" />

      <p className="mt-4 text-lg text-yellow-400">
        Lezzetin Buluşma Noktası
      </p>

    </header>
  );
}