import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
          {icon}
        </div>
      </div>
    </div>
  );
}