import { BrainIcon } from "lucide-react";
import type { JSX } from "react";

const LeftPanel = ({ mode }: { mode: string }): JSX.Element => (
  <div className="min-h-screen flex flex-col justify-between px-10 py-9 relative overflow-hidden bg-linear-135 from-0% from-primary via-[#4f46e5] to-accent">
    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-size-[36px_36px]" />
    <div className="absolute -top-15 -right-15 w-70 h-70 rounded-full bg-[rgba(255,255,255,0.07)]" />
    <div className="absolute bottom-[8%] -left-10 w-45 h-45 rounded-full bg-[rgba(255,255,255,0.05)]" />

    {/* Logo */}
    <div className="relative z-10 flex items-center gap-2.5">
      <div className="w-9.5 h-9.5 rounded-[10px] bg-[rgba(255,255,255,0.18)] backdrop-blur border border-[rgba(255,255,255,0.28)] flex items-center justify-center text-white">
        <BrainIcon />
      </div>
      <span className="text-white font-extrabold text-[1.1rem] tracking-[-0.02em]">
        Cortex
      </span>
    </div>

    {/* Hero */}
    <div className="relative z-10">
      <div className="inline-flex items-center gap-1.75 bg-[rgba(10,9,9,0.14)] backdrop-blur border border-[rgba(255,255,255,0.22)] rounded-full px-3.25 py-1.25 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
        <span className="text-[rgba(255,255,255,0.9)] text-[0.75rem] font-medium">
          AI-Powered Learning Agent
        </span>
      </div>

      <h2 className="text-white text-[2.1rem] font-extrabold leading-[1.15] tracking-[-0.03em] mb-4">
        {mode === "login" ? (
          <>
            <span>Welcome back</span>
            <br />
            <span className="opacity-[0.65]">to your study agent.</span>
          </>
        ) : (
          <>
            <span>Your AI tutor</span>
            <br />
            <span className="opacity-[0.65]">is ready to teach.</span>
          </>
        )}
      </h2>
      <p className="text-[rgba(255,255,255,0.68)] leading-[1.7] text-[0.88rem] max-w-75">
        Upload documents, ask anything, generate quizzes and flashcards — all
        powered by your personal AI agent.
      </p>

      <div className="flex gap-7 mt-8">
        {[
          ["12k+", "Learners"],
          ["2M+", "Flashcards"],
          ["98%", "Satisfaction"],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="text-white font-extrabold text-[1.3rem] tracking-[-0.02em]">
              {v}
            </div>
            <div className="text-[rgba(255,255,255,0.55)] text-[0.73rem] font-medium">
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonial */}
    <div className="relative z-10 bg-[rgba(255,255,255,0.11)] backdrop-blur-lg border border-[rgba(255,255,255,0.18)] rounded-[12px] p-4.5">
      <div className="flex gap-0.75 mb-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg key={i} viewBox="0 0 16 16" className="w-3.25 fill-[#fbbf24]">
              <path d="M8 1l1.85 3.75L14 5.5l-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.15-.75z" />
            </svg>
          ))}
      </div>
      <p className="text-[rgba(255,255,255,0.82)] text-[0.83rem] leading-[1.6] mb-3">
        &quot;Cortex turned my 300-page textbook into an interactive quiz
        session in minutes. Passed my exam first try.&quot;
      </p>
      <div className="flex items-center gap-2.25">
        <div className="w-7.5 h-7.5 rounded-full bg-linear-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-white font-bold text-[0.78rem]">
          S
        </div>
        <div>
          <div className="text-white font-semibold text-[0.82rem]">
            Sarah K.
          </div>
          <div className="text-[rgba(255,255,255,0.5)] text-[0.72rem]">
            Medical Student
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LeftPanel;
