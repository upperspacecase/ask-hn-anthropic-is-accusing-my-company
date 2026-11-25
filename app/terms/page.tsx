import { FooterNav } from "@/components/FooterNav";

export const metadata = { title: "Terms" };

export default function Terms() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <h1 className="text-display">Terms</h1>
      <p className="text-body mt-6">
        The evidence packet builder described on this site is not released
        yet. Joining the list is free and commits you to nothing.
      </p>
      <p className="text-body mt-4">
        The packet is self-reported data. Anthropic alone decides the outcome
        of an appeal, and we cannot promise it will accept the packet or
        restore access. The sample shown on the home page uses illustrative
        data, not a real account.
      </p>
      <p className="text-body mt-4">
        This site is not affiliated with Anthropic.
      </p>
      <FooterNav />
    </main>
  );
}
