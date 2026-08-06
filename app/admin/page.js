"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="text-gray-500 text-sm">Redirecting to login...</p>
    </div>
  );
}
