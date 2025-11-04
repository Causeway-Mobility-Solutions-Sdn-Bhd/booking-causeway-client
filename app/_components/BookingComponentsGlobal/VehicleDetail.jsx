import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import SmartImage from "@/components/custom/SmartImage";
import { Button } from "@/components/ui/button";
import { useReBookMutation } from "@/store/api/reservationApiSlice";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

function VehicleDetail({ selectedVehicle, reBook = false }) {
  const pathname = usePathname();
  const router = useRouter();
  const [triggerRebook, { isLoading }] = useReBookMutation();

  const getBookingIdFromPath = () => {
    const parts = pathname.split("/");

    return parts[2] || null;
  };

  const onRebook = async () => {
    const bookingId = getBookingIdFromPath();

    if (!bookingId) {
      showErrorToast("Invalid booking ID in URL");
      return;
    }
    try {
      const response = await triggerRebook({ id: bookingId }).unwrap();
      const { reservation } = response;

      showSuccessToast("Booking rebooked successfully!");
      console.log(reservation);

      if (reservation?._id) {
        router.push(`/book/step-02?ssid=${reservation._id}`);
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to rebook. Please try again.";
      showErrorToast(errorMessage);
      console.error("Error rebooking:", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <div className="bg-white w-full sm:w-[450px] flex justify-start items-center gap-2 shadow-sm rounded-lg overflow-hidden px-4 py-2.5 mb-5">
        <div className="relative">
          {selectedVehicle?.image && (
            <SmartImage
              src={selectedVehicle.image}
              width={70}
              height={70}
              alt="Vehicle image"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] font-semibold">
            {selectedVehicle?.label}
          </h3>
          <div className="flex flex-wrap justify-start  gap-2.5 mt-1">
            {selectedVehicle?.features?.map((f) => (
              <div
                key={f?.id}
                className="flex flex-row gap-1 items-center text-center"
              >
                <Image
                  src={f?.images[0]?.public_link}
                  alt={`${f?.id}`}
                  className="h-full w-[15px] object-contain"
                  width={15}
                  height={15}
                  priority
                />
                <span className="text-xs  text-muted-foreground">
                  {f?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {reBook && (
        <Button
          onClick={onRebook}
          className={"bg-cPrimary sm:flex-1  cursor-pointer py-5 mb-4"}
        >
          Re-book
        </Button>
      )}
    </div>
  );
}

export default VehicleDetail;
