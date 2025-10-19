"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { format, parse } from "date-fns";
import { ImageUpload } from "@/components/custom/UploadDocumentInput";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import ErrorMessage from "@/components/custom/ErrorMessage";
import hqApi from "@/lib/hqApi";
import { showErrorToast } from "@/app/_lib/toast";

const DriverLicenseInfo = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLicenseDateChange = (date) => {
    const formatted = date ? format(date, "dd/MM/yy") : "";
    setFormData((prev) => ({ ...prev, licenseExpiry: formatted }));
    setErrors((prev) => ({ ...prev, licenseExpiry: "" }));
  };

  const parseLicenseDate = () => {
    if (!formData.licenseExpiry) return null;
    try {
      return parse(formData.licenseExpiry, "dd/MM/yy", new Date());
    } catch {
      return null;
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await hqApi.delete(`file/${fileId}`);
    } catch {
      showErrorToast("Error Deleting File.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver's License Information
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {/* License Number Input */}
          <div>
            <Input
              name="driverLicense"
              value={formData.driverLicense || ""}
              onChange={handleChange}
              placeholder="License Number"
              className={`h-11 border-gray-200 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                errors.driverLicense ? "border-red-500" : ""
              }`}
            />
            {errors.driverLicense && (
              <ErrorMessage message={errors.driverLicense} />
            )}
          </div>

          {/* Expiry Date Picker */}
          <CustomDatePicker
            value={parseLicenseDate()}
            onChange={handleLicenseDateChange}
            placeholder="DD/MM/YY"
            label="Exp Date"
            error={!!errors.licenseExpiry}
            errorMessage={errors.licenseExpiry}
            disabledDateCondition={(date) => date < new Date()}
          />

          {/* File Upload */}
          <div className="col-span-2 sm:col-span-1">
            <ImageUpload
              onDeleteExisting={handleDeleteFile}
              label="Driver License image"
              files={formData.licenseFiles || []}
              setFiles={(files) => {
                setFormData((prev) => ({ ...prev, licenseFiles: files }));
                setErrors((prev) => ({ ...prev, licenseFiles: "" }));
              }}
              instructionsRequired={false}
              error={errors.licenseFiles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLicenseInfo;
