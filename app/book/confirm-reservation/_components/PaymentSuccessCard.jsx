"use client";
import React from "react";
import { Copy } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import { showSuccessToast } from "@/app/_lib/toast";

const PaymentSuccessBar = ({ reservationNumber = "#JB04636" }) => {
  const handleCopyReservationNumber = () => {
    navigator.clipboard.writeText(reservationNumber);
    showSuccessToast("Reservation Number Copied!");
    // You can add a toast notification here if needed
  };

  return (
    <div className=" bg-cSecondary rounded-b-2xl pb-11 pt-6 px-20 xs:px-52 md:px-24 lg:px-52">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 flex-1 justify-center md:justify-start">
            <div className="flex-shrink-0">
              <FaCheckCircle className="w-12 h-12 sm:w-13 sm:h-13 text-white" />
            </div>

            <div className="text-white text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold">
                Payment successful!
              </h3>
              <p className="text-xs font-light sm:text-base mt-1">
                Your car successfully booked. You can check your booking in
                Manage Booking.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 px-4 py-2">
            <p className="text-white text-xs font-light">Reservation Number:</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-md sm:text-base">
                {"#" + reservationNumber}
              </span>

              <button
                onClick={handleCopyReservationNumber}
                className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                title="Copy reservation number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessBar;
