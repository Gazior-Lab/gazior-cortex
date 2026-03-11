'use client'
import LeftPanel from "@/features/auth/components/LeftPanel";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname(); 

  // Determine mode based on path
  const mode = pathname?.includes('/login') ? 'login' : 'register';

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* Left panel — hidden on mobile, shown on large screens */}
      <div className="hidden lg:block">
        <LeftPanel mode={mode} />
      </div>

      {/* Right panel — the auth form */}
      <div className="flex items-center justify-center min-h-screen bg-background px-6 py-10">
        <div className="w-full max-w-110">
          {children}
        </div>
      </div>
    </div>
  );
}
