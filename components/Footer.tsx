export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      {/* Emerald accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-emerald-800 via-emerald-600 to-emerald-700" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-neutral-500 sm:flex-row">
        <div>
          <p className="font-display text-lg font-semibold text-neutral-900">
            Auto<span className="text-emerald-900">Vault</span>
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">
            Curated electric cars &amp; camper vans · Germany
          </p>
        </div>
        <p className="text-xs text-neutral-400">
          Prototype · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
