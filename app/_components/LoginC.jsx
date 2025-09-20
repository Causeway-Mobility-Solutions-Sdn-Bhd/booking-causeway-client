"use client";
import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

function LoginC({ type }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // Validate only on submit
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  // Email validation pattern
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Password validation pattern - at least 8 chars, 1 uppercase, 1 lowercase, 1 special char
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative`}
    >
      {type === "primary" && (
        <>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-6">Sign in</h2>
        </>
      )}

      <div>
        {/* Email Input */}
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

        {/* Password Input */}
        <div className="mb-3 relative">
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

          {errors.password && (
            <p className="text-red-500 text-[12px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="mb-3">
          <a
            href="#"
            className="text-cSecondary text-sm font-medium"
          >
            Forgot password
          </a>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-cPrimary text-white font-semibold py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors"
        >
          Sign in
        </button>
      </div>

      {/* Sign Up Link */}
      {type === "primary" && (
        <div className="text-center">
          <span className="text-[16px]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-cSecondary font-bold  transition-colors"
            >
              Sign up
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default LoginC;
