import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
}

export function Panel({
  title,
  subtitle,
  children,
  className,
  rightSlot
}: PanelProps) {
  return (
    <article
      className={[
        "flex h-full min-h-0 flex-col rounded-2xl border border-white/80 bg-white/75 p-4 shadow-panel backdrop-blur-sm sm:p-6",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-800 sm:text-2xl xl:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
          ) : null}
        </div>
        {rightSlot}
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </article>
  );
}
