"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import PaymentSuccessBar from "../_components/PaymentSuccessCard";
import VehicleBookingDetails from "../_components/VehicleBookingDetails";
import Step7Sidebar from "../_components/Step7Sidebar";
import { transformCustomerData } from "@/lib/transformCustomerData";
import Spinner from "@/components/custom/Spinner";
import Nav from "@/components/custom/Nav";

export default function Page() {
  const [conformeReservation, setConformReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const router = useRouter();

  const params = useParams();

  useEffect(() => {
    if (!reservation?.reservation_id) {
      router.push(`/`);
    } else {
      const fetchData = async () => {
        try {
          const response = await hqApi.get(
            "car-rental/reservations/get-reservation"
          );

          console.log(response?.data?.data);

          setConformReservation(response?.data?.data);
          const customerData = transformCustomerData(
            response?.data?.data?.customer
          );

          setCustomerInfo(customerData);
        } catch (error) {
          console.log("Error fetching reservation:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [reservation]);
  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }
  return (
    <div>
      <Nav />
      <PaymentSuccessBar
        reservationNumber={conformeReservation?.reservation?.id}
      />
      <div className="pb-16 py-[20px]  sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <VehicleBookingDetails
              customerData={customerInfo}
              reservationData={conformeReservation}
            />
          </div>
          <Step7Sidebar />
        </div>
      </div>
    </div>
  );
}
