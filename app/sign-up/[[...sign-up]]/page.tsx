import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh font-sans text-text-primary">
      {/* Left panel — 50% wide, surface background, visible on large screens only */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-surface px-14 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-md flex items-center justify-center"
            style={{ background: "var(--accent-primary)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" fill="#080809" />
              <rect x="9" y="2" width="5" height="5" fill="#080809" />
              <rect x="2" y="9" width="5" height="5" fill="#080809" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            Ghost AI
          </span>
        </div>

        {/* Main copy */}
        <div className="space-y-6 max-w-sm">
          <h1 className="font-heading text-4xl font-bold leading-tight text-text-primary">
            Design systems at the speed of thought.
          </h1>
          <p className="text-sm leading-relaxed text-text-muted">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          {/* Feature list */}
          <ul className="space-y-5">
            {[
              {
                title: "AI Architecture Generation",
                desc: "Describe your system. AI maps it to nodes and edges on a live canvas.",
              },
              {
                title: "Real-time Collaboration",
                desc: "Live cursors, presence indicators, and shared node editing across your team.",
              },
              {
                title: "Instant Spec Generation",
                desc: "Export a complete Markdown technical spec directly from the canvas graph.",
              },
            ].map(({ title, desc }) => (
              <li key={title} className="flex gap-3 items-start">
                <div
                  className="mt-0.5 h-6 w-6 shrink-0 rounded flex items-center justify-center"
                  style={{
                    background: "var(--accent-primary-dim)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <div
                    className="h-2 w-2 rounded-sm"
                    style={{ background: "var(--accent-primary)" }}
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-text-primary">
                    {title}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer footer */}
        <div />
      </div>

      {/* Right panel — 50% wide, base background, Clerk form centered */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-base p-8">
        <Suspense>
          <SignUp />
        </Suspense>
      </div>
    </div>
  );
}
