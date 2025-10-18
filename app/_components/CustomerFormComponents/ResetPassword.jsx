"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/custom/InputInfoTooltip";
import ErrorMessage from "@/components/custom/ErrorMessage";

const ResetPassword = ({ submitFormRef }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate submit
    setSubmitted(true);
    console.log("Password changed successfully:", formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {/* Current Password */}
            <div className="relative">
              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-10 ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />
              <div className="absolute right-3 top-6 -translate-y-1/2">
                <Tooltip
                  message="Enter your existing password to verify your identity."
                  title="Instructions"
                />
              </div>
              {errors.currentPassword && (
                <ErrorMessage message={errors.currentPassword} />
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-10 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              <div className="absolute right-3 top-6 -translate-y-1/2">
                <Tooltip
                  message="Create a strong new password with at least 6 characters."
                  title="Instructions"
                />
              </div>
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
