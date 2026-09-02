import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function normalizeDeadlineCategory(value: string | undefined | null): string {
  const normalized = String(value ?? "").trim();
  return normalized || "uncategorized";
}

export function startCaseCategory(category: string): string {
  return category
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Uncategorized";
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const categoryColorPresets = [
  "bg-sky-100 text-sky-600 ring-sky-200",
  "bg-violet-100 text-violet-600 ring-violet-200",
  "bg-emerald-100 text-emerald-600 ring-emerald-200",
  "bg-amber-100 text-amber-600 ring-amber-200",
  "bg-rose-100 text-rose-600 ring-rose-200",
  "bg-fuchsia-100 text-fuchsia-600 ring-fuchsia-200",
  "bg-cyan-100 text-cyan-600 ring-cyan-200",
  "bg-lime-100 text-lime-600 ring-lime-200",
  "bg-orange-100 text-orange-600 ring-orange-200"
];

export function getCategoryColorClass(category: string): string {
  const normalized = normalizeDeadlineCategory(category).toLowerCase();
  const index = hashString(normalized) % categoryColorPresets.length;
  return categoryColorPresets[index];
}

export function getDaysUntil(targetDate: string, baseDate = new Date()): number {
  const target = startOfDay(new Date(targetDate));
  const base = startOfDay(baseDate);

  return Math.round((target - base) / MS_PER_DAY);
}

export function getDeadlineUrgency(daysLeft: number): DeadlineUrgency {
  if (daysLeft < 0) return "past";
  if (daysLeft <= 7) return "danger";
  if (daysLeft <= 30) return "warning";
  return "safe";
}

export function formatDeadlineDate(targetDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(targetDate));
}

export function getUpcomingDeadlines(
  deadlines: ConferenceDeadline[],
  now = new Date()
): ConferenceDeadline[] {
  return [...deadlines]
    .filter((item) => getDaysUntil(item.deadline, now) >= 0)
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
}
