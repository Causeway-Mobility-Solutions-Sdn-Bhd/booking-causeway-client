"use client";
import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import ConfirmModal from "@/components/custom/ConfirmModal";
import { useParams, usePathname, useRouter } from "next/navigation";
import SaveBottomBar from "@/app/_components/SaveBottomBar";
import { useCancelBookingMutation } from "@/store/api/reservationApiSlice";

export const ReasonComponent = () => {
  const [selectedReason, setSelectedReason] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const { id } = useParams();
  const [cancelLoader, setCancelLoader] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const onSubmit = () => {
    if (!selectedReason) {
      showErrorToast("Select a reason of cancellation.");
      return;
    }

    setConfirmCancel(true);
    console.log("OK");
  };

  const [cancelBooking] = useCancelBookingMutation();

  const onConfirm = async () => {
    const pathParts = pathname.split("/");
    const id = pathParts[2];
    const basePath = pathname.split("/cancel-reason")[0];
    try {
      await cancelBooking({ id }).unwrap();
      showSuccessToast("Booking Cancelled Successfully!");
      router.replace(`${basePath}?cancelled=true`);
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        "Failed to cancel booking. Please try again.";

      showErrorToast(errorMessage);
      console.error("Error cancelling booking:", error);
    }

    router.replace(`${basePath}?cancelled=true`);
  };
  const reasons = [
    "Unable to travel due to restrictions related to Coronavirus (COVID-19)",
    "Made bookings for the same dates, want to cancel the one I don't need",
    "Change in the number or needs of travellers",
    "Personal reasons/trip was called off",
    "Change of dates or destinations",
    "I found an alternative accommodation option",
    "None of the above",
  ];

  return (
    <>
      <div className="pt-16 sm:pt-24 flex justify-center w-full">
        <div className="pt-4 w-full max-w-3xl sm:px-6 px-0">
          <h2 className="text-lg font-bold mb-4 sm:px-0 px-4">Reason</h2>

          <div className="bg-white shadow-sm">
            {reasons.map((reason, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => setSelectedReason(index)}
                  className="w-full flex items-center gap-4 py-3 px-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-shrink-0">
                    {selectedReason === index ? (
                      <div className="w-5 h-5 rounded-full bg-cSecondary flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-cSecondary"></div>
                    )}
                  </div>
                  <span className="text-black">{reason}</span>
                </button>

                {index < reasons.length - 1 && (
                  <div className="mx-4 border-b border-gray-200"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <SaveBottomBar
        title="Confirm cancellation"
        onSubmit={onSubmit}
        load={cancelLoader}
      />

      <ConfirmModal
        isOpen={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        onConfirm={onConfirm}
        drawerVariantRequired={false}
        description={
          "Our offers and prices change quickly, so this deal might not be available again if you cancel now. Are you sure want to cancel?"
        }
        title="Are you sure you want to cancel this booking?"
        confirmButtonText="Yes, cancel this booking"
        cancelButtonText="No, keep this booking"
      />
    </>
  );
};
