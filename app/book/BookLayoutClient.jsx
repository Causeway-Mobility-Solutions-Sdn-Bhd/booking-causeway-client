"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { useDispatch } from "react-redux";
import {
  setCurrentUUID,
  setReservation,
} from "@/store/slices/reservationSlice";
import hqApi from "@/lib/hqApi";

export default function BookLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ssidFromUrl = searchParams.get("ssid");
  const [sessionState, setSessionState] = useState("checking");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await hqApi.get(
          "car-rental/reservations/reservation-attempts"
        );
        const reservation = res?.data;

        if (!reservation) {
          console.log("redirect");
          router.replace("/");
          return;
        }

        dispatch(setCurrentUUID(reservation._id));
        dispatch(setReservation(reservation));
        console.log(reservation);

        if (ssidFromUrl !== reservation._id) {
          const params = new URLSearchParams(searchParams.toString());
          const parts = pathname.split("/");
          const segment = parts[2];
          
          if(segment !== "conform-reservation"){
            params.set("ssid", reservation._id);
            router.replace(`${pathname}?${params.toString()}`);
          }
        }

        setSessionState("valid");
      } catch (error) {
        console.error("Error fetching reservation:", error);
        router.replace("/");
        setSessionState("invalid");
      }
    };

    fetchReservation();
  }, [searchParams]);

  if (sessionState === "checking") {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  if (sessionState === "invalid") {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  return <>{children}</>;
}
