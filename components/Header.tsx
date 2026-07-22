import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src="/logo.png"
        alt="DOY DOY 35"
        width={220}
        height={220}
        priority
      />

      <p className="-mt-4 text-lg font-medium text-yellow-400">
        Lezzetin Buluşma Noktası
      </p>
    </header>
  );
}