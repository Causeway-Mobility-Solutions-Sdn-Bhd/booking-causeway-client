"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import PaymentSuccessBar from "../_components/PaymentSuccessCard";
import VehicleBookingDetails from "../_components/VehicleBookingDetails";
import Step7Sidebar from "../_components/Step7Sidebar";

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
      <PaymentSuccessBar />
      <div className="pb-16 py-[20px]  sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <VehicleBookingDetails />
          </div>
          <Step7Sidebar />
        </div>
      </div>
    </div>
  );
}
