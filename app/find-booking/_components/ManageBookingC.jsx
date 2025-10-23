"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import Spinner from "@/components/custom/Spinner";
import { useRouter } from "next/navigation";

function ManageBookingC({ type }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      




      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccessToast("Booking found successfully");
      
    } catch (err) {
      console.log("Find booking error:", err);
      showErrorToast(err?.data?.message || "Failed to find booking");
    } finally {
      setIsLoading(false);
    }
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div className="w-full">
      
      {type === "primary" && (
        <h2 className="text-[20px] sm:text-2xl font-bold mb-4 px-1">
          Find Your Booking
        </h2>
      )}

      
      <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto sm:mx-0 p-6 sm:p-8">
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Reservation number"
              {...register("reservationNumber", {
                required: "Reservation number is required",
                minLength: {
                  value: 3,
                  message: "Reservation number must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 text-[15px] ${
                errors.reservationNumber
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-cPrimary/50"
              }`}
            />
            {errors.reservationNumber && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.reservationNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 text-[15px] ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-cPrimary/50"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-cPrimary text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-[16px]"
          >
            {isLoading ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              <span>Find my booking</span>
            )}
          </button>

          {type === "primary" && (
            <div className="text-center">
              <p className="text-[15px] text-gray-700">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="text-cSecondary font-bold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageBookingC;