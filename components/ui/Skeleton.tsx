import React from "react";

// Shared shimmer classes
const shimmerBase = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-gray-400/20 before:to-transparent";
// We rely on a custom keyframes (will add suggestion to globals if missing)

interface SkeletonProps {
  className?: string;
  lines?: number; // for multiline skeleton
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", lines = 1 }) => {
  if (lines <= 1) {
    return (
      <div
  className={`bg-gray-200 dark:bg-gray-800 rounded h-4 ${shimmerBase} ${className}`}
        aria-hidden="true"
      />
    );
  }
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 dark:bg-gray-800 rounded h-4 mb-3 last:mb-0 ${shimmerBase} ${i % 3 === 1 ? 'w-5/6' : i % 3 === 2 ? 'w-11/12' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

export const ChapterSkeleton: React.FC = () => (
  <div className="border rounded-xl p-4 md:p-6 bg-white shadow-sm" aria-busy="true" aria-live="polite">
    <div className="flex flex-wrap gap-3 mb-6">
      <Skeleton className="w-40 h-10" />
      <Skeleton className="w-32 h-10" />
      <Skeleton className="w-24 h-10" />
    </div>
    <Skeleton lines={22} />
    <div className="mt-8 flex gap-4">
      <Skeleton className="w-28 h-10" />
      <Skeleton className="w-28 h-10" />
      <Skeleton className="w-14 h-10" />
    </div>
    <span className="sr-only">Loading chapter content…</span>
  </div>
);

export const BooksSkeleton: React.FC = () => (
  <main className="mx-auto px-4" aria-busy="true" aria-live="polite">
    <section className="pt-10 md:pt-[70px] min-h-[40vh]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Skeleton className="w-40 h-8 rounded-full" />
        </div>
        <Skeleton className="h-12 w-3/4 mx-auto mb-10" />
        <ChapterSkeleton />
      </div>
    </section>
  </main>
);

export default Skeleton;
