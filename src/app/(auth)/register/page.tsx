import RegisterForm from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Cortex - AI Learning Agent",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
