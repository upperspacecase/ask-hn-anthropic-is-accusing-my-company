import { FooterNav } from "@/components/FooterNav";

export const metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <h1 className="text-display">Privacy</h1>
      <p className="text-body mt-6">
        This site collects one thing: the work email you submit in the form,
        along with the ref tag on the link you followed, if there was one. We
        use it to email you about the evidence packet builder and for nothing
        else.
      </p>
      <p className="text-body mt-4">
        The site sets no cookies and runs no analytics scripts. It never asks
        for an API key, a log upload or company details.
      </p>
      <p className="text-body mt-4">
        This site is not affiliated with Anthropic.
      </p>
      <FooterNav />
    </main>
  );
}
