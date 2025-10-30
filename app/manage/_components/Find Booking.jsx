"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import { useFindBookingMutation } from "@/store/api/reservationApiSlice";
import { showErrorToast } from "@/app/_lib/toast";
import Spinner from "@/components/custom/Spinner";

function FindBookingForm() {
  const router = useRouter();
  const [reservationNumber, setReservationNumber] = useState("");
  const [email, setEmail] = useState("");

  // RTK Query lazy hook
  const [findBooking, { isLoading }] = useFindBookingMutation();

  const handleFindBooking = async (e) => {
    e.preventDefault();

    if (!reservationNumber || !email) {
      showErrorToast("Please enter both reservation number and email.");
      return;
    }

    try {
      const response = await findBooking({
        reservation_id: reservationNumber,
        email,
      }).unwrap();
      const id = response.data.attempt_id;
      if (id) {
        router.push(`/manage/${id}`);
      } else {
        showErrorToast("No booking found. Please check your details.");
      }
    } catch (err) {
      console.error("Error finding booking:", err);

      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while finding your booking.";

      showErrorToast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Header */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div
          className="max-w-7xl mx-auto px-4"
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <button
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 rounded-lg transition-colors"
            style={{
              position: "absolute",
              left: "0",
              padding: "8px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft
              style={{ width: "28px", height: "28px", color: "#2DBDB6" }}
              strokeWidth={3}
            />
          </button>
          <h1
            className="text-gray-900"
            style={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0",
              textTransform: "none",
            }}
          >
            My Booking
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div
        className="max-w-7xl mx-auto px-4 py-6"
        style={{ paddingTop: "90px" }}
      >
        <h2
          className="mb-4 px-1"
          style={{
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            lineHeight: "1.2",
          }}
        >
          Find Your Booking
        </h2>

        <form
          onSubmit={handleFindBooking}
          className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto sm:mx-0 p-6 sm:p-8"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Reservation number"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cPrimary/50 focus:border-transparent placeholder-gray-400 text-[15px]"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cPrimary/50 focus:border-transparent placeholder-gray-400 text-[15px]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cPrimary text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors text-[16px]"
          >
            {isLoading ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              "Find my booking"
            )}
          </button>

          <div className="text-center">
            <p className="text-[15px] text-gray-700">
              Have an account?{" "}
              <a
                href="/my-booking"
                className="text-cSecondary font-bold hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FindBookingForm;
