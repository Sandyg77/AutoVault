// A small colored pill showing availability. Colors map to status.
const styles: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  reserved: "bg-amber-100 text-amber-800 ring-amber-600/20",
  sold: "bg-neutral-200 text-neutral-600 ring-neutral-500/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${
        styles[status] ?? styles.sold
      }`}
    >
      {status}
    </span>
  );
}
