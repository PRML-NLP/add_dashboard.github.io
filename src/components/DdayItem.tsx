import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";
import {
  formatDeadlineDate,
  getCategoryColorClass,
  getDaysUntil,
  getDeadlineUrgency,
  normalizeDeadlineCategory,
  startCaseCategory
} from "../utils/date";

const badgeStyles: Record<DeadlineUrgency, string> = {
  danger: "bg-rose-100 text-rose-600 ring-rose-200",
  warning: "bg-amber-100 text-amber-600 ring-amber-200",
  safe: "bg-emerald-100 text-emerald-600 ring-emerald-200",
  past: "bg-slate-100 text-slate-500 ring-slate-200"
};

interface DdayItemProps {
  conference: ConferenceDeadline;
  now: Date;
}

export function DdayItem({ conference, now }: DdayItemProps) {
  const daysLeft = getDaysUntil(conference.deadline, now);
  const urgency = getDeadlineUrgency(daysLeft);
  const ddayLabel = daysLeft >= 0 ? `D-${daysLeft}` : `D+${Math.abs(daysLeft)}`;
  const category = normalizeDeadlineCategory(conference.category);

  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_auto] items-center gap-3 rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/70 to-pink-50/60 px-3 py-3 sm:px-4 sm:py-4">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 ${getCategoryColorClass(category)}`}
          >
            {startCaseCategory(category)}
          </span>
        </div>

        <p className="truncate text-lg font-semibold text-slate-800 sm:text-xl xl:text-2xl">
          {conference.conference}
        </p>
      </div>

      <p className="text-sm text-slate-500 sm:text-base xl:text-lg">
        {formatDeadlineDate(conference.deadline)}
      </p>

      <span
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 sm:text-base xl:text-lg ${badgeStyles[urgency]}`}
      >
        {ddayLabel}
      </span>
    </div>
  );
}
