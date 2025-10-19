"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import ErrorMessage from "@/components/custom/ErrorMessage";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import { useResetPasswordMutation } from "@/store/api/authApiSlice";

const ResetPassword = ({ submitFormRef, setSubmitLoader }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~`]).{8,}$/;

      if (!strongPasswordRegex.test(formData.newPassword)) {
        newErrors.newPassword =
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitLoader(true);
    try {
      const response = await resetPassword(formData).unwrap();
      showSuccessToast(response.message || "Password changed successfully!");

      setSubmitted(true);
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Failed to reset password. Try again.";
      showErrorToast(errorMsg);
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Reset Password</h2>

      <form
        ref={(el) => {
          if (el) {
            submitFormRef.current = () => {
              el.requestSubmit();
            };
          }
        }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {/* Current Password */}
            <div className="relative">
              <Input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-12 ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-5 top-6 -translate-y-1/2 focus:outline-none"
              >
                {showPassword.current ? (
                  <IoEye className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeOff className="w-5 h-5 text-black" />
                )}
              </button>

              {errors.currentPassword && (
                <ErrorMessage message={errors.currentPassword} />
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <Input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-12 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-5 top-6 -translate-y-1/2 focus:outline-none"
              >
                {showPassword.new ? (
                  <IoEye className="w-5 h-5 text-black" />
                ) : (
                  <IoEyeOff className="w-5 h-5 text-black" />
                )}
              </button>

              {errors.newPassword && (
                <ErrorMessage message={errors.newPassword} />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
