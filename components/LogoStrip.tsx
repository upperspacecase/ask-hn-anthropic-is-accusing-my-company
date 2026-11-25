const LOGOS = [
  "Git",
  "GitHub Actions",
  "GitLab CI",
  "CircleCI",
  "Buildkite",
  "Anthropic Console",
];

export function LogoStrip() {
  return (
    <section className="mt-16 w-full text-center sm:mt-20" aria-label="Inputs">
      <p className="text-body text-slate-600">
        It works from what you already have: git log, CI run history and your
        Anthropic Console usage export.
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {LOGOS.map((name) => (
          <li
            key={name}
            className="text-body font-semibold uppercase tracking-wide text-slate-500"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
