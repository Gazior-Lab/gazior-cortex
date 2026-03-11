"use client";

import Divider from "@/features/auth/components/ui/Divider";
import FormInput from "@/features/auth/components/ui/FormInput";
import GoogleLoginBtn from "@/features/auth/components/ui/GoogleLoginBtn";
import EyeIcon from "@/features/auth/components/ui/EyeIcon";
import Link from "next/link";
import {  SyntheticEvent, useState } from "react";



export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  console.log("ERROR: ",errors)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!pw) errs.pw = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const data = {
      email,
      password: pw
    }
    console.log(data)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[1.65rem] font-extrabold tracking-[-0.03em] text-foreground mb-1.5">
          Sign in
        </h1>
        <p className="text-[0.85rem] text-muted">
          New here?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>

      {/* Google */}
      <GoogleLoginBtn label="Continue with Google" />
      <Divider />

      {/* Inputs */}
      <div className="flex flex-col gap-3.5">
        <FormInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <FormInput
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Your password"
          value={pw}
          onChange={setPw}
          error={errors.pw}
          suffix={
            <span onClick={() => setShowPw((p) => !p)}>
              <EyeIcon open={showPw} />
            </span>
          }
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-[0.82rem] text-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-primary w-3.5 h-3.5"
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-[0.82rem] font-semibold text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg border-none font-bold text-[0.92rem] tracking-[0.01em] font-sans transition-all duration-150 text-primary-foreground cursor-pointer
          ${success ? "bg-success" : loading ? "bg-muted cursor-not-allowed" : "bg-primary hover:opacity-90"}`}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Signing in...
          </>
        ) : success ? (
          "✓ Signed in!"
        ) : (
          "Sign in to Cortex"
        )}
      </button>
    </form>
  );
}
