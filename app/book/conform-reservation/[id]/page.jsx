"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import PaymentSuccessBar from "../_components/PaymentSuccessCard";
import VehicleBookingDetails from "../_components/VehicleBookingDetails";
import Step7Sidebar from "../_components/Step7Sidebar";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import Spinner from "@/components/custom/Spinner";
import Nav from "@/components/custom/Nav";
import SideBar from "@/app/_components/SideBar";

export default function Page() {
  const [conformeReservation, setConformReservation] = useState(null);
  const [rentalAgreement, setRentalAgreement] = useState("");
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const router = useRouter();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    if (!reservation?.reservation_id) {
      router.push(`/`);
    } else {
      const fetchData = async () => {
        try {
          const response = await hqApi.get(
            "car-rental/reservations/get-reservation"
          );

          console.log(response?.data);
          const responseData = response?.data?.data;
          if (responseData?.reservation?.uuid !== params.id) {
            router.replace("/");

            return;
          }
          setConformReservation(responseData);
          setRentalAgreement(response?.data?.rental_agreement?.data?.agreement);
          const customerData = transformCustomerData(responseData?.customer);

          setCustomerInfo(customerData);
          setLoading(false)
        } catch (error) {
          console.log("Error fetching reservation:", error);
          router.replace("/");
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
      <SideBar />
      <PaymentSuccessBar
        reservationNumber={conformeReservation?.reservation?.prefixed_id}
      />
      <div className="pb-16 py-[20px]  sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <VehicleBookingDetails
              customerData={customerInfo}
              reservationData={conformeReservation}
              rentalAgreement={rentalAgreement}
            />
          </div>
          <Step7Sidebar />
        </div>
      </div>
    </div>
  );
}
