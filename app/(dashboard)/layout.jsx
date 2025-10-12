"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRefreshMutation } from "@/store/api/authApiSlice";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [refresh, { isLoading, isError, isSuccess }] = useRefreshMutation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await refresh().unwrap();
        if (!result?.success) {
          router.replace("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/");
      }
    };
    verifyUser();
  }, [refresh, router]);

  if (isLoading) {
    return <div className="flex justify-center p-6">Checking session...</div>;
  }

  if (isError) {
    router.replace("/");
    return null;
  }

  return <>{children}</>;
}
