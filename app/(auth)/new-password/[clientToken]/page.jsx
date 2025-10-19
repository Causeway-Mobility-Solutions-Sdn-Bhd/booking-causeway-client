"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import axios from "axios";
import { useResetForgotPasswordMutation } from "@/store/api/authApiSlice";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clientToken } = useParams();
  const [resetForgotPassword] = useResetForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const password = watch("password");
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await resetForgotPassword({
        clientToken,
        newPassword: data.password,
      }).unwrap();

      showSuccessToast("Password reset successfully!");
      router.push("/login");
    } catch (err) {
      const message =
        err?.data?.message || "Failed to reset password. Please try again.";

      if (
        err?.status === 403 ||
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("invalid")
      ) {
        showErrorToast("Link expired. Please restart password reset.");
        router.push("/forgot-password");
      } else {
        showErrorToast(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[95%] mx-auto  flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <div className="bg-white rounded-lg shadow-lg w-full  max-w-sm p-5 md:p-6 relative">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="mb-3 relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "Password must be at least 8 characters with uppercase, lowercase, and special character",
                  },
                })}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-200 focus:ring-cPrimary/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5 relative">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-200 focus:ring-cPrimary/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cPrimary text-white font-semibold h-12 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors flex justify-center items-center"
          >
            {isLoading ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
