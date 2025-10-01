import { statusProgress } from "@/lib/utils";
export default function ProgressBar({ status }:{ status: keyof typeof statusProgress }) {
  const pct = statusProgress[status] ?? 0;
  return (
    <div className="h-2 bg-gray-200 rounded">
      <div className="h-2 rounded bg-black" style={{ width: `${pct}%` }}/>
    </div>
  );
}
