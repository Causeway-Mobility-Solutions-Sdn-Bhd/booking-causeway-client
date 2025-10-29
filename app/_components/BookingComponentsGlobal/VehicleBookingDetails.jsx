"use client";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
  formatDate,
  formatTime,
  formatTimeFromDate,
  formatTimeWithAmPm,
} from "@/app/_lib/formattingDateTime";
import { useAppSelector } from "@/store/hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import VehicleDetail from "./VehicleDetail";
import CustomerDetails from "./CustomerDetails";
import { ChevronDown, Download, FileText, Loader2 } from "lucide-react";
import { showErrorToast } from "@/app/_lib/toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function VehicleBookingDetails({
  reservationData,
  customerData,
  rentalAgreement,
  reBook = false,
  upperSuccess = true,
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOnOpen, setIsAddOnOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const response = await fetch(rentalAgreement, {
        method: "GET",
        headers: {},
      });

      if (!response.ok) throw new Error("File download failed");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Rental_Agreement.pdf";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      showErrorToast("Error Downloading Agreement.");
      console.log("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className={`${upperSuccess && "mt-[-65px]"} sm:mt-0`}>
      <VehicleDetail
        reBook={reBook}
        selectedVehicle={reservationData?.selected_vehicle_class?.vehicle_class}
      />
      <div className="mb-3">
        <h1 className="text-[18px] font-bold">Booking Details</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4">
        <div className="flex border rounded-lg border-gray-200 flex-col md:flex-row">
          <div className="flex-1 p-4">
            <div className="flex items-start gap-1">
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
                    {formatTimeWithAmPm(
                      reservationData?.reservation?.pick_up_date
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block border-l border-gray-200 mx-1 my-4"></div>
          <div className="block md:hidden border-t border-gray-200 mx-4 my-[-5px]"></div>

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
                    {formatTimeWithAmPm(
                      reservationData?.reservation?.return_date
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
          onClick={handleDownload}
          variant="outline"
          className="cursor-pointer w-full md:w-auto md:text-center font-bold py-5 justify-center border-cSecondary text-cSecondary hover:bg-cSecondary hover:text-white mt-4"
        >
          Download Agreement
          <Download className="w-4 h-4" />
        </Button>
      </div>
      {/* Download Modal */}
      <Dialog
        open={isDownloading}
        onOpenChange={(open) => {
          if (!open) return;
          setIsDownloading(open);
        }}
      >
        <DialogTitle className="sr-only">Downloading Document</DialogTitle>
        <DialogContent
          className="sm:max-w-md border-0 shadow-2xl"
          showCloseButton={false}
        >
          <div className="flex flex-col items-center justify-center py-8 px-4">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 w-24 h-24 border-4 border-cSecondary/20 rounded-full animate-spin"></div>

              {/* Inner pulsing circle */}
              <div className="w-24 h-24 bg-gradient-to-br from-cSecondary/20 to-cSecondary/5 rounded-full flex items-center justify-center animate-pulse">
                {/* Icon container with subtle animation */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-cSecondary animate-bounce" />
                </div>
              </div>

              {/* Orbiting dots */}
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-cSecondary rounded-full -ml-1.5 animate-ping"></div>
            </div>

            {/* Text Content */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Preparing Your Document
              </h3>
              <p className="text-sm text-gray-600">
                We're fetching your rental agreement
              </p>

              {/* Animated dots */}
              <div className="flex items-center justify-center gap-1 pt-2">
                <span className="w-2 h-2 bg-cSecondary rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-cSecondary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-cSecondary rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default VehicleBookingDetails;
