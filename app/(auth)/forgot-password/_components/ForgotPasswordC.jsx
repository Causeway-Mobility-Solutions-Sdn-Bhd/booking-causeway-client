"use client";
import React from "react";
import { X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../_lib/toast";
import Spinner from "@/components/custom/Spinner";
import { useForgotPasswordMutation } from "@/store/api/authApiSlice";

function ForgotPasswordC() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      console.log({ email: data.email });
      
      const res = await forgotPassword({ email: data.email }).unwrap();
      
      showSuccessToast("OTP sent to your email!");
      
      // Redirect to OTP verification page with clientToken
      const clientToken = res?.data?.clientToken;
      if (clientToken) {
        router.push(`/otp-verify/${clientToken}?type=forgot-password`);
      }
    } catch (err) {
      console.log("Password recovery error:", err);
      showErrorToast(err?.data?.message || "Failed to send recovery email");
    }
  };

  const handleBackToSignIn = () => {
    router.push("/login");
  };

  const handleClose = () => {
    router.push("/login");
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>

      <div>
        <h2 className="text-2xl font-bold mb-6">Forgot password</h2>
      </div>

      <div>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email address",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-200 focus:ring-cPrimary/50"
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
          className="w-full bg-[#FF7B9C] text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-[#FF7B9C]/90 transition-colors"
        >
          {isLoading ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            <span>Recover password</span>
          )}
        </button>

        <button
          onClick={handleBackToSignIn}
          className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2"
        >
          <ArrowLeft size={20} />
          <span>
            Back to <span className="text-cSecondary">Sign in</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordC;