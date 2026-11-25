"use client";

import { useState, type FormEvent } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        ref: new URLSearchParams(window.location.search).get("ref"),
      }),
    });
    setStatus(res.ok ? "done" : "failed");
  }

  if (status === "done") {
    return (
      <p
        className="text-body rounded-xl border border-slate-300 bg-white px-5 py-4"
        role="status"
      >
        You are on the list. The packet builder is not released yet. We will
        email you when you can run it against your own logs.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-body w-full flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink placeholder:text-slate-500 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="text-body cursor-pointer rounded-lg bg-accent px-5 py-3 font-semibold text-ink transition-colors duration-200 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none"
        >
          Build my evidence packet
        </button>
      </div>
      <p className="text-body mt-3 text-slate-600">
        Runs locally against your own logs. Nothing leaves your
        infrastructure. No call required.
      </p>
      {status === "failed" && (
        <p className="text-body mt-2" role="alert">
          That did not go through. Please try again.
        </p>
      )}
    </form>
  );
}
