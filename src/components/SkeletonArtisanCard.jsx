export default function SkeletonArtisanCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 animate-pulse">
      <div className="flex items-start justify-between mb-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-zinc-800" />
        <div className="w-20 h-6 rounded-full bg-slate-100 dark:bg-zinc-800" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="w-3/4 h-5 rounded-lg bg-slate-100 dark:bg-zinc-800" />
        <div className="w-1/2 h-4 rounded-lg bg-slate-100 dark:bg-zinc-800" />
      </div>

      <div className="w-1/3 h-4 rounded-lg bg-slate-100 dark:bg-zinc-800 mb-6" />

      <div className="space-y-2 mb-8">
        <div className="w-full h-3 rounded-lg bg-slate-100 dark:bg-zinc-800" />
        <div className="w-5/6 h-3 rounded-lg bg-slate-100 dark:bg-zinc-800" />
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-zinc-800">
        <div className="w-1/3 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800" />
        <div className="w-1/4 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
