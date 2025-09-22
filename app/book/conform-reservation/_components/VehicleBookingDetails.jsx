"use client";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate, formatTime } from "@/app/_lib/formattingDateTime";
import { useAppSelector } from "@/store/hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VehicleDetail from "./VehicleDetail";

function VehicleBookingDetails() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="mt-[-65px] sm:mt-0">
      <VehicleDetail />
      <div className="mb-3">
        <h1 className="text-[18px] font-bold">Booking Details</h1>
      </div>

      {/* Main container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4">
        {/* Pickup and Return */}
        <div className="flex border rounded-lg border-gray-200 flex-col md:flex-row">
          {/* Pickup Section */}
          <div className="flex-1 p-4">
            <div className="flex items-start gap-3">
              <div>
                <RiMapPin2Line className="text-lg mt-[3px]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[16px] text-gray-900 mb-2">
                  Pickup
                </h3>
                <div>
                  <p className="text-gray-900 text-[14px]">
                    {reservation?.pick_up_location?.name ||
                      "Amari, Suasana Hotel, Johor Bahru"}
                  </p>
                  <p className="text-gray-900 text-[14px]">
                    {formatDate(reservation?.pick_up_date)}{" "}
                    {formatTime(reservation?.pick_up_time)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block border-l border-gray-200 mx-1 my-4"></div>
          <div className="block md:hidden border-t border-gray-200 mx-4 my-2"></div>

          {/* Return Section */}
          <div className="flex-1 p-4">
            <div className="flex items-start gap-3">
              <div>
                <RiMapPin2Line className="text-lg mt-[3px]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[16px] text-gray-900 mb-2">
                  Return
                </h3>
                <div>
                  <p className="text-gray-900 text-[14px]">
                    {reservation?.return_location?.name ||
                      "Amari, Suasana Hotel, Johor Bahru"}
                  </p>
                  <p className="text-gray-900 text-[14px]">
                    {formatDate(reservation?.return_date)}{" "}
                    {formatTime(reservation?.return_time)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Details */}
        <div className="border mt-4 border-gray-200 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full px-4 py-2 text-left"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <span className="font-semibold text-gray-900">
              Customer Details
            </span>
            <ChevronDown
              className={`w-5 h-5 text-cSecondary transition-transform ${
                isAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAccordionOpen && (
            <div className="p-4 border-t border-gray-200">
              {/* Accordion content goes here */}
              <p>Customer details content...</p>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full md:w-auto md:text-center font-bold py-5 justify-center border-cSecondary text-cSecondary hover:bg-cSecondary hover:text-white mt-4"
        >
          Download Agreement
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default VehicleBookingDetails;
