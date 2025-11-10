import React from "react";
import TitleHead from "@/components/custom/TitleHead";
import SmartImage from "@/components/custom/SmartImage";
import Image from "next/image";
import { useGetReservationAttemptQuery } from "@/store/api/reservationApiSlice";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CurrentBooking() {
  const {
    data: reservation,
    isLoading,
    isError,
  } = useGetReservationAttemptQuery();

  const selectedVehicle = reservation?.selectedVehicle;
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-gray-500 text-sm">Loading current booking...</p>
      </div>
    );

  if (isError || !reservation || reservation?.selectedVehicle == null)
    return (
      <></>
    );

  // Format dates to "8 Nov" style
  const pickupDate = reservation?.pick_up_date
    ? format(new Date(reservation.pick_up_date), "d MMM")
    : "";
  const returnDate = reservation?.return_date
    ? format(new Date(reservation.return_date), "d MMM")
    : "";

  const handleRoute = () => {
    router.push(`/book/step-0${reservation?.step}?ssid=${reservation?._id}`)
  }  
  return (
    <div onClick={handleRoute} className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px]">
      <TitleHead name="Continue Planning Your Trip" />

      <div className="bg-white shadow-lg rounded-2xl px-5 py-5 mt-4">
        {/* Vehicle Info Row */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          {/* Vehicle Image */}
          {selectedVehicle?.image && (
            <SmartImage
              src={selectedVehicle.image}
              width={90}
              height={90}
              alt="Vehicle image"
              className="rounded-lg object-cover"
            />
          )}

          {/* Vehicle Name + Features */}
          <div className="flex-1">
            <h3 className="text-[18px] font-semibold text-gray-900">
              {selectedVehicle?.name}
            </h3>

            <div className="flex flex-wrap gap-3 mt-2">
              {selectedVehicle?.features?.map((f, i) => {
                const icon =
                  f?.images?.[0]?.public_link || f?.icon || f?.image || null;
                const isValidUrl =
                  typeof icon === "string" &&
                  (icon.startsWith("http") || icon.startsWith("/"));

                return (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md text-xs text-gray-600"
                  >
                    {isValidUrl ? (
                      <Image
                        src={icon}
                        alt={f?.label || "feature"}
                        width={14}
                        height={14}
                        className="object-contain"
                        loading="lazy"
                      />
                    ) : icon ? (
                      <i className={`${icon} text-gray-500 text-sm`} />
                    ) : null}
                    <span>{f?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Pickup & Return Details */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
          <div className="flex-1">
            <p className="text-gray-800 font-medium">Pick-up</p>
            <p className="text-gray-600 mt-1">
              {reservation?.pick_up_location?.name}
            </p>
            <p className="text-gray-500">
              {pickupDate} • {reservation?.pick_up_time}
            </p>
          </div>

          <div className="flex-1">
            <p className="text-gray-800 font-medium">Return</p>
            <p className="text-gray-600 mt-1">
              {reservation?.return_location?.name}
            </p>
            <p className="text-gray-500">
              {returnDate} • {reservation?.return_time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentBooking;
