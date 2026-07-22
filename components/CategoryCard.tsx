type Props = {
  icon: string;
  title: string;
  desc: string;
};

export default function CategoryCard({
  icon,
  title,
  desc,
}: Props) {
  return (
    <button className="w-[92%] mx-auto rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4 transition-all duration-200 hover:border-red-500 hover:bg-zinc-800 hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <div className="text-3xl flex-shrink-0">
          {icon}
        </div>

        <div className="text-left">
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="text-sm text-zinc-400">
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}