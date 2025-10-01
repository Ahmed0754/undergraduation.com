export default function StatusBadge({ status }: { status: string }) {
  return <span className="px-2 py-0.5 rounded-full border text-xs">{status}</span>;
}
