"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import Spinner from "@/components/custom/Spinner";
import Nav from "@/app/_components/Nav";
import SideBar from "@/app/_components/SideBar";
import Step7Sidebar from "@/app/book/confirm-reservation/_components/Step7Sidebar";
import VehicleBookingDetails from "@/app/book/confirm-reservation/_components/VehicleBookingDetails";
// Using Payment SuccessBar for SUccess
import PaymentSuccessBar from "@/app/book/confirm-reservation/_components/PaymentSuccessCard";

export default function Page() {
  const [cancelledReservation, setCancelledReservation] = useState(null);
  const [rentalAgreement, setRentalAgreement] = useState("");
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const router = useRouter();

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hqApi.get(
          "car-rental/reservations/get-reservation"
        );

        const responseData = response?.data?.data;

        //   if (responseData?.reservation?.uuid !== params.id) {
        //     console.log("BACKKKK");

        //     router.replace("/");
        //     return;
        //   }
        setCancelledReservation(responseData);
        setRentalAgreement(response?.data?.rental_agreement?.data?.agreement);
        const customerData = transformCustomerData(responseData?.customer);

        setCustomerInfo(customerData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reservation:", error);
        router.replace("/");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //   Uncomment this
  //   useEffect(() => {
  //     if (!reservation?.reservation_id) {
  //       router.push(`/`);
  //     } else {
  //       const fetchData = async () => {
  //         try {
  //           const response = await hqApi.get(
  //             "car-rental/reservations/get-reservation"
  //           );

  //           const responseData = response?.data?.data;
  //           console.log("RESPONSE", responseData);

  //         //   if (responseData?.reservation?.uuid !== params.id) {
  //         //     console.log("BACKKKK");

  //         //     router.replace("/");
  //         //     return;
  //         //   }
  //           setCancelledReservation(responseData);
  //           setRentalAgreement(response?.data?.rental_agreement?.data?.agreement);
  //           const customerData = transformCustomerData(responseData?.customer);

  //           setCustomerInfo(customerData);
  //           setLoading(false);
  //         } catch (error) {
  //           console.log("Error fetching reservation:", error);
  //           router.replace("/");
  //           setLoading(false);
  //         }
  //       };
  //       fetchData();
  //     }
  //   }, [reservation]);
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
        title={"Your booking has been cancelled!"}
        msg={`We'll send you an email confirming your cancellation to ${
          customerInfo?.email || "No Email"
        }.If you already made a prepayment, your refund typically takes 5-10 Days calendar days to complete.`}
        reservationNumber={cancelledReservation?.reservation?.prefixed_id}
      />
      <div className="pb-16 py-[20px]  sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <VehicleBookingDetails
              reBook={true}
              customerData={customerInfo}
              reservationData={cancelledReservation}
              rentalAgreement={rentalAgreement}
            />
          </div>
          <Step7Sidebar />
        </div>
      </div>
    </div>
  );
}
