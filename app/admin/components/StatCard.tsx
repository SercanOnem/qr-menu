import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  onClick?: () => void;
};

export default function StatCard({
  title,
  value,
  icon,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.20)] active:scale-[0.98]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold tracking-wide text-zinc-300">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-extrabold text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Görüntülemek için tıklayın
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-500 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}