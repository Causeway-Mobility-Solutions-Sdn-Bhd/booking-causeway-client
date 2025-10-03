"use client";
import React, { useState } from "react";
import { Eye, EyeOff, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { showErrorToast, showSuccessToast } from "../../../_lib/toast";
import { useRegisterMutation } from "@/store/api/authApiSlice";

function SignupC() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const route = useRouter();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      showSuccessToast(
        "Account Created Successfully! Please Enter OTP to verify your email."
      );
      route.push(`otp-verify/${res.user.clientToken}`);
    } catch (err) {
      console.error(err);
      showErrorToast(err?.data?.message || "Registration failed");
    }
  };

  const getFirstErrorField = () => {
    const errorFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];
    for (const field of errorFields) {
      if (errors[field]) {
        return field;
      }
    }
    return null;
  };

  const firstErrorField = getFirstErrorField();
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

  const password = watch("password");

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>

      <div>
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-200 focus:ring-cPrimary/50"
              }`}
            />
            {firstErrorField === "firstName" && errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-200 focus:ring-cPrimary/50"
              }`}
            />
            {firstErrorField === "lastName" && errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email address is required",
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
          {firstErrorField === "email" && errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-2 relative">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {firstErrorField === "password" && errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-3 relative">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
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
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {firstErrorField === "confirmPassword" && errors.confirmPassword && (
            <p className="text-red-500 text-[12px] mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-cPrimary text-white font-semibold h-12 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors flex justify-center items-center"
        >
          {isLoading ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            <span>Sign up</span>
          )}
        </button>
      </div>

      <div className="text-center">
        <span className="text-[16px]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cSecondary font-bold  transition-colors"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignupC;
