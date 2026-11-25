import Link from "next/link";

const LINKS = [
  { label: "See a sample packet", href: "/#sample" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function FooterNav() {
  return (
    <footer className="mt-20 w-full border-t border-slate-300 pt-8">
      <nav aria-label="Footer">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-body cursor-pointer rounded text-slate-600 transition-colors duration-200 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 motion-reduce:transition-none"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
