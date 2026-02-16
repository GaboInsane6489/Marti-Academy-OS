"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirector() {
  const { profile, loading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && profile) {
      if (profile.role === "admin") {
        router.push("/dashboard/admin");
      } else if (profile.role === "docente") {
        router.push("/dashboard/docente");
      } else {
        router.push("/dashboard/estudiante");
      }
    }
  }, [loading, isAuthenticated, profile, router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  );
}
