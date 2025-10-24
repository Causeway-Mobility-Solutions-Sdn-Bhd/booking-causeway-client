"use client";
import ConfirmModal from "@/components/custom/ConfirmModal";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const CancelBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  // Mock cancellation options based on your image
  const cancellationOptions = [
    {
      id: "free-cancellation",
      label: "Cancellation is currently FREE",
      description: "Until 26 September 2025 at 18:00 Johor Bahru time",
      cost: "FREE",

      isFree: true,
      isSelected: true,
    },
    {
      id: "paid-cancellation",
      label: "Cancellation will cost MYR 175.02",
      description: "From 26 September 2025 at 18:00 Johor Bahru time",
      cost: "MMR TITLE02",

      isFree: false,
      isSelected: false,
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCancellation = () => {
    // Add your cancellation logic here
    // You can make API calls, update state, etc.
    console.log(id);
    router.push(`/cancel-booking/${id}/reason`);
    // For demo purposes, just close the modal
    setIsModalOpen(false);

    // Show success message or redirect
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Cancel Booking
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancellation}
        cancellationOptions={cancellationOptions}
        title="Cancel Booking"
        modalSubTitle={"Cancellation Policy"}
        description="Please review the cancellation policy and select an option."
        confirmButtonText="Cancellation Options"
        drawerVariantRequired={true}
      />
    </div>
  );
};

export default CancelBooking;
