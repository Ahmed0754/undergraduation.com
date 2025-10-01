import { AppStatus } from "./models";

export const statusProgress: Record<AppStatus, number> = {
  Exploring: 25,
  Shortlisting: 50,
  Applying: 75,
  Submitted: 100
};

export function daysAgo(d: Date | string | undefined) {
  if (!d) return "—";
  const dt = typeof d === "string" ? new Date(d) : d;
  const ms = Date.now() - dt.getTime();
  if (isNaN(ms)) return "—";
  const days = Math.floor(ms / (1000*60*60*24));
  return `${days}d`;
}
