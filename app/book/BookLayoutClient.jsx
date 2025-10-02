"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { useGetReservationAttemptQuery } from "@/store/api/reservationApiSlice";

export default function BookLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ssidFromUrl = searchParams.get("ssid");

  const [sessionState, setSessionState] = useState("checking");

  const {
    data: reservation,
    isLoading,
    isError,
  } = useGetReservationAttemptQuery();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !reservation) {
      router.replace("/");
      setSessionState("invalid");
      return;
    }

    if (ssidFromUrl !== reservation._id) {
      const params = new URLSearchParams(searchParams.toString());
      const parts = pathname.split("/");
      const segment = parts[2];

      if (segment !== "conform-reservation") {
        params.set("ssid", reservation._id);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }

    setSessionState("valid");
  }, [isLoading , searchParams]);

  if (sessionState === "checking" || isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  if (sessionState === "invalid" || isError) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  return <>{children}</>;
}
