"use client";

import Divider from "@/features/auth/components/Divider";
import FormInput from "@/features/auth/components/FormInput";
import GoogleLoginBtn from "@/features/auth/components/GoogleLoginBtn";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx={12} cy={12} r={3} />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1={1} y1={1} x2={23} y2={23} />
      </>
    )}
  </svg>
);

// ── Password Strength ─────────────────────────────────────────────────────────

const getStrength = (
  pw: string,
): { score: number; label: string; color: string } => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: Record<number, { label: string; color: string }> = {
    1: { label: "Weak", color: "bg-destructive" },
    2: { label: "Fair", color: "bg-warning" },
    3: { label: "Good", color: "bg-accent" },
    4: { label: "Strong", color: "bg-success" },
  };
  return { score, ...map[score] };
};

const PasswordStrength = ({ password }: { password: string }) => {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= score ? color : "bg-border"}`}
          />
        ))}
      </div>
      <span className="text-[0.72rem] text-muted font-medium">{label}</span>
    </div>
  );
};

// ── Register Page ─────────────────────────────────────────────────────────────

const plans = [
  { id: "free", label: "Free", desc: "5 docs, 20 chats/day" },
  { id: "pro", label: "Pro ✦", desc: "Unlimited, all features" },
] as const;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "At least 8 characters required";
    if (!agreed) e.agreed = "You must accept the terms";
    return e;
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[1.75rem] font-extrabold tracking-[-0.03em] text-foreground mb-1.5">
          Create account
        </h1>
        <p className="text-[0.9rem] text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Google */}
      <GoogleLoginBtn label="Sign up with Google" />
      <Divider />

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <FormInput
          label="Full name"
          placeholder="Jane Smith"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <FormInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <div className="flex flex-col gap-2">
          <FormInput
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={password}
            onChange={setPassword}
            error={errors.password}
            suffix={
              <span onClick={() => setShowPw((p) => !p)}>
                <EyeIcon open={showPw} />
              </span>
            }
          />
          <PasswordStrength password={password} />
        </div>
      </div>

      {/* Plan Selection */}
      <div className="flex flex-col gap-2">
        <span className="text-[0.85rem] font-semibold text-foreground">
          Start with
        </span>
        <div className="grid grid-cols-2 gap-2">
          {plans.map((plan) => (
            <label
              key={plan.id}
              className={`flex flex-col gap-0.5 p-3 rounded-lg cursor-pointer border-[1.5px] transition-colors ${
                plan.id === "pro"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plan"
                  defaultChecked={plan.id === "free"}
                  className="accent-primary"
                />
                <span
                  className={`text-[0.85rem] font-bold ${
                    plan.id === "pro" ? "text-primary" : "text-foreground"
                  }`}
                >
                  {plan.label}
                </span>
              </div>
              <span className="text-[0.75rem] text-muted pl-5">
                {plan.desc}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer text-[0.83rem] text-muted leading-relaxed">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-primary mt-0.5 shrink-0"
          />
          I agree to the{" "}
          <span className="text-primary font-semibold">Terms of Service</span>{" "}
          and <span className="text-primary font-semibold">Privacy Policy</span>
        </label>
        {errors.agreed && (
          <p className="text-[0.75rem] text-destructive mt-1 font-medium">
            {errors.agreed}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg border-none font-bold text-[0.95rem] tracking-[0.01em] font-sans transition-opacity duration-150 text-primary-foreground
          ${loading ? "bg-muted cursor-not-allowed" : "bg-primary hover:opacity-90 cursor-pointer"}`}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Creating account...
          </>
        ) : (
          "Get started free"
        )}
      </button>
    </form>
  );
}
