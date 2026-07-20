type Props = {
  icon: string;
  title: string;
  count: number;
  desc: string;
};

export default function CategoryCard({
  icon,
  title,
  count,
  desc,
}: Props) {
  return (
    <button className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-500 hover:bg-zinc-800">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="text-4xl">
            {icon}
          </div>

          <div className="text-left">

            <h3 className="text-xl font-bold">
              {title}
            </h3>

            <p className="text-sm text-zinc-400">
              {desc}
            </p>

          </div>

        </div>

        <div className="text-right">

          <div className="rounded-full bg-red-600 px-3 py-1 text-sm">
            {count}
          </div>

          <div className="mt-2 text-xl">
            ➜
          </div>

        </div>

      </div>

    </button>
  );
}