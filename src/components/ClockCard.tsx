import type { ClockZone } from "../types/dashboard";
import { formatDateInZone, formatTimeInZone } from "../utils/time";

interface ClockCardProps {
  zone: ClockZone;
  now: Date;
}

export function ClockCard({ zone, now }: ClockCardProps) {
  return (
    <article className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-4 sm:p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-sky-500 sm:text-sm">
        {zone.region}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-800 sm:text-xl xl:text-2xl">
        {zone.city}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold text-indigo-600 sm:text-4xl xl:text-5xl">
        {formatTimeInZone(now, zone.timezone)}
      </p>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        {formatDateInZone(now, zone.timezone)}
      </p>
    </article>
  );
}
