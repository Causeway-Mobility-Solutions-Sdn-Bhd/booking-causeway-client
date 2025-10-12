"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setReservation, setCurrentUUID } from "@/store/slices/reservationSlice";
import hqApi from "@/lib/hqApi";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUUID = useSelector((state) => state.reservation.currentUUID);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await hqApi.get("car-rental/reservations/reservation-attempts");
        const reservation = res?.data;
        console.log("page book")

        if (!reservation || !reservation._id || !reservation.step) {
          router.replace("/");
          return;
        }

        dispatch(setCurrentUUID(reservation._id));
        dispatch(setReservation(reservation));

        router.replace(`/book/step-0${reservation.step}?ssid=${reservation._id}`);
      } catch (error) {
        console.log("Error fetching reservation:", error);
        router.replace("/");
      }
    };

    fetchAndRedirect();
  }, []);

  return null;
}
