import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Cortex - AI Learning Agent",
};

export default function LoginPage() {
  return <LoginForm />;
}
