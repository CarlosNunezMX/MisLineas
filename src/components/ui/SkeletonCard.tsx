export function SkeletonCard() {
  return (
    <div className="bg-white border border-zinc-200 shadow-sm p-4 sm:p-5 rounded-2xl flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 bg-zinc-100 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-zinc-100 rounded w-1/3" />
        <div className="h-3 bg-zinc-100 rounded w-1/2" />
      </div>
    </div>
  );
}
