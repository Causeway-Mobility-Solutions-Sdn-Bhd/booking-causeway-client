"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import Spinner from "@/components/custom/Spinner";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation } from "@/store/api/authApiSlice";

function ForgotPasswordC({ type }) {
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
      const res = await forgotPassword({ email: data.email }).unwrap();
      showSuccessToast(res?.message || "OTP sent to your email");
      router.push(`/forgot-password/${res.data.clientToken}`);
    } catch (err) {
      console.log("Forgot password error:", err);
      showErrorToast(err?.data?.message || "Failed to send OTP");
    }
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative`}
    >
      {type === "primary" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Forgot password</h2>
        </div>
      )}

      <div>
        <div className="mb-3">
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
          className="w-full bg-cPrimary text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors"
        >
          {isLoading ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            <span>Recover password</span>
          )}
        </button>
      </div>

      {type === "primary" && (
        <div className="text-center">
          <Link
            href="/login"
            className="text-[16px] inline-flex items-center gap-2 hover:text-cSecondary transition-colors"
          >
            <ArrowLeft size={18} />
            <span>
              Back to <span className="text-cSecondary font-bold">Sign in</span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordC;
