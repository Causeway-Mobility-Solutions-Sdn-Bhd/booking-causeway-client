"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { useGetReservationAttemptQuery } from "@/store/api/reservationApiSlice";
import { useGetCurrenciesQuery } from "@/store/api/fleetApiSlice";
import { useDispatch } from "react-redux";
import { setFavorites } from "@/store/slices/reservationSlice";
import { useAppSelector } from "@/store/hooks";

export default function BookLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ssidFromUrl = searchParams.get("ssid");

  const [sessionState, setSessionState] = useState("checking");

  const { data: allCurrencies } = useGetCurrenciesQuery();
  const {
    data: data,
    isLoading,
    isError,
  } = useGetReservationAttemptQuery();

  const dispatch = useDispatch();
  const reservation = useAppSelector((state) => state.reservation.reservation);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setFavorites(storedFavorites));
  }, []);

  useEffect(() => {
    if (isLoading) return;
    console.log("Reservation data in BookLayoutClient:", reservation);
    console.log(isError)

    if (isError && !reservation._id) {
      router.replace("/");
      setSessionState("invalid");
      console.log("No valid reservation found, redirecting to home.");
      return;
    }

    if (ssidFromUrl !== reservation._id) {
      const params = new URLSearchParams(searchParams.toString());
      const parts = pathname.split("/");
      const segment = parts[2];

      if (segment !== "confirm-reservation") {
        params.set("ssid", reservation._id);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }

    setSessionState("valid");
  }, [isLoading, searchParams]);

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
