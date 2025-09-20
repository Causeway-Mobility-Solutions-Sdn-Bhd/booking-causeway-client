"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function Page() {
  const [conformeReservation, setConformReservation] = useState(null);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const router = useRouter();

  useEffect(() => {
    if (!reservation?.reservation_id) {
      router.push(`/`);
    } else {
      const fetchData = async () => {
        try {
          const response = await hqApi.get(
            "car-rental/reservations/get-reservation"
          );
          setConformReservation(response?.data);
          console.log(response?.data);
        } catch (error) {
          console.error("Error fetching reservation:", error);
        }
      };

      fetchData();
    }
  }, [reservation]);

  return (
    <div>
      <h1>Reservation Confirmation</h1>
      
    </div>
  );
}
