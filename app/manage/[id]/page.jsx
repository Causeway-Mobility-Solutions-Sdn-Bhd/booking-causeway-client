"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import Spinner from "@/components/custom/Spinner";
import Nav from "@/app/_components/Nav";
import SideBar from "@/app/_components/SideBar";

import VehicleBookingDetails from "@/app/_components/BookingComponentsGlobal/VehicleBookingDetails";
import Step7Sidebar from "@/app/_components/BookingComponentsGlobal/Step7Sidebar";
import PaymentSuccessBar from "@/app/_components/BookingComponentsGlobal/PaymentSuccessCard";

export default function ViewBooking() {
  const [reservation, setReservation] = useState(null);
  const [rentalAgreement, setRentalAgreement] = useState("");
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const customerUpdated = searchParams.get("customerupdated");
  const cancelled = searchParams.get("cancelled");
  const pickupreturnupdated = searchParams.get("pickupreturnupdated");

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hqApi.get(
          `car-rental/reservations/get-reservation/${id}`
        );

        const responseData = response?.data?.data;

        //   if (responseData?.reservation?.uuid !== params.id) {
        //     console.log("BACKKKK");

        //     router.replace("/");
        //     return;
        //   }
        if (responseData?.reservation?.status === "cancelled") {
          const params = new URLSearchParams(searchParams.toString());
          if (!params.get("cancelled")) {
            params.set("cancelled", "true");
            router.replace(`${pathname}?${params.toString()}`);
          }
        }

        setReservation(responseData);
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
  }, [id, searchParams]);

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
      {customerUpdated && (
        <PaymentSuccessBar
          title="Changes successful!"
          msg="Your car successfully booked. You can check your booking in Manage Booking."
          reservationNumber={reservation?.reservation?.prefixed_id}
        />
      )}
      {pickupreturnupdated && (
        <PaymentSuccessBar
          title="Changes successful!"
          msg="Your Pickup & Return succesfully changed."
          reservationNumber={reservation?.reservation?.prefixed_id}
        />
      )}
      {cancelled && (
        <PaymentSuccessBar
          title="Your booking has been cancelled!"
          msg={`We'll send you an email confirming your cancellation to ${
            customerInfo.email || "No Email"
          }
lf you already made a prepayment, your refund typically takes 5-10 Days calendar days to complete.`}
          reservationNumber={reservation?.reservation?.prefixed_id}
        />
      )}
      <div className="pb-16 py-[20px]  sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <VehicleBookingDetails
              upperSuccess={
                !!(customerUpdated || cancelled || pickupreturnupdated)
              }
              reBook={cancelled ? true : false}
              customerData={customerInfo}
              reservationData={reservation}
              rentalAgreement={rentalAgreement}
            />
          </div>
          <Step7Sidebar
            reservation={reservation}
            manage={!customerUpdated && !cancelled && !pickupreturnupdated}
          />
        </div>
      </div>
    </div>
  );
}
