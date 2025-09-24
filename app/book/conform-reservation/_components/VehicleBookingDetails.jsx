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
import CustomerDetails from "./CustomerDetails";

function VehicleBookingDetails({ reservationData, customerData }) {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOnOpen, setIsAddOnOpen] = useState(false);

  console.log(reservationData.reservation);

  return (
    <div className="mt-[-65px] sm:mt-0">
      <VehicleDetail
        selectedVehicle={reservationData?.selected_vehicle_class?.vehicle_class}
      />
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
                    {reservationData?.reservation?.pick_up_location?.name ||
                      "Amari, Suasana Hotel, Johor Bahru"}
                  </p>
                  <p className="text-gray-900 text-[14px]">
                    {formatDate(reservationData?.reservation?.pick_up_date)}{" "}
                    {formatTime(reservationData?.reservation?.pick_up_time)}
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
                    {reservationData?.reservation?.return_location?.name ||
                      "Amari, Suasana Hotel, Johor Bahru"}
                  </p>
                  <p className="text-gray-900 text-[14px]">
                    {formatDate(reservationData?.reservation?.return_date)}{" "}
                    {formatTime(reservationData?.reservation?.return_time)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add-On Services */}
        <div className="border mt-4 border-gray-200 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full px-4 py-2 text-left"
            onClick={() => setIsAddOnOpen(!isAddOnOpen)}
          >
            <span className="font-bold text-gray-900">Add-On Services</span>
            <ChevronDown
              className={`w-5 h-5 text-cSecondary transition-transform ${
                isAddOnOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAddOnOpen && (
            <div className="px-4 pt-2 pb-4">
              {reservationData?.selected_additional_charges?.length === 0 ? (
                <span className="text-[#808080]">No Add-Ons</span>
              ) : (
                reservationData?.selected_additional_charges?.map(
                  (charge, index, array) => (
                    <div key={index}>
                      <div className="flex justify-between py-1">
                        <span className="text-[#808080]">{charge.label}</span>
                      </div>
                      {index !== array.length - 1 && (
                        <div className="border-t border-gray-200 my-1"></div>
                      )}
                    </div>
                  )
                )
              )}
            </div>
          )}
        </div>
        {/* Customer Details */}
        <div className="border mt-4 border-gray-200 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full px-4 py-2 text-left"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <span className="font-bold text-gray-900">Customer Details</span>
            <ChevronDown
              className={`w-5 h-5 text-cSecondary transition-transform ${
                isAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAccordionOpen && <CustomerDetails data={customerData} />}
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
