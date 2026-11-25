import { EmailCapture } from "@/components/EmailCapture";
import { DemoPlayer } from "@/components/DemoPlayer";
import { LogoStrip } from "@/components/LogoStrip";
import { FooterNav } from "@/components/FooterNav";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <section className="flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="text-display text-balance">
          Anthropic flagged your eval suite as distillation: show them every
          traffic spike on your key lines up with a git commit and a CI run.
        </h1>
        <p className="text-body mt-5 max-w-2xl text-balance text-slate-600">
          For founders and CTOs who build on the Anthropic API, train no
          models, and have no account rep: turn your CI history and usage
          export into an evidence packet you can attach to your appeal.
        </p>
        <div className="mt-8 w-full max-w-xl">
          <EmailCapture />
        </div>
      </section>

      <section
        id="sample"
        className="mt-12 w-full scroll-mt-6 sm:mt-16"
        aria-label="Sample evidence packet"
      >
        <DemoPlayer />
        <p className="text-body mx-auto mt-5 max-w-3xl text-balance text-center text-slate-600">
          Sample packet with illustrative data. We cannot promise
          reinstatement; the packet holds only timestamps, token counts and
          request volumes they can compare against their own records.
        </p>
      </section>

      <LogoStrip />

      <FooterNav />
    </main>
  );
}
