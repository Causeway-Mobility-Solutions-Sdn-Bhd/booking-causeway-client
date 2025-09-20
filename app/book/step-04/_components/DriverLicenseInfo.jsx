import React from "react";
import { Input } from "@/components/ui/input";
import { format, parse } from "date-fns";
import { ImageUpload } from "@/components/custom/UploadDocumentInput";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import ErrorMessage from "../../../../components/custom/ErrorMessage";

const DriverLicenseInfo = ({
  register,
  setValue,
  errors,
  watch,
  clearErrors,
  firstErrorField,
}) => {
  const handleLicenseDateChange = (date) => {
    setValue("licenseExpiry", date ? format(date, "dd/MM/yy") : "", {
      shouldValidate: true,
    });
  };
  const parseLicenseDate = () => {
    const dateString = watch("licenseExpiry");
    if (!dateString) return null;

    try {
      // Parse the dd/MM/yy format back to Date object
      return parse(dateString, "dd/MM/yy", new Date());
    } catch (e) {
      console.error("Error parsing license date:", e);
      return null;
    }
  };
  // Check if fields have errors
  const hasDriverLicenseError = !!errors.driverLicense;
  const hasLicenseExpiryError = !!errors.licenseExpiry;
  const licenseFiles = watch("licenseFiles") || [];

  const shouldShowErrorGap = () => {
    const fieldNames = ["driverLicense", "licenseExpiry"];
    return fieldNames.some(
      (field) => errors[field] && firstErrorField === field
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver's License Information
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 items-start`}>
          {/* License Number Input */}
          <div>
            <Input
              {...register("driverLicense", {
                required: "License number is required",
                pattern: {
                  value: /^[A-Z0-9]{5,20}$/,
                  message: "Please enter a valid license number",
                },
              })}
              placeholder="License Number"
              className={`h-11 border-gray-200 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasDriverLicenseError ? "border-red-500" : ""
              }`}
            />
            {hasDriverLicenseError && firstErrorField === "driverLicense" && (
              <ErrorMessage message={errors.driverLicense.message} />
            )}
          </div>

          {/* Expiry Date Picker */}
          <CustomDatePicker
            value={parseLicenseDate()}
            onChange={handleLicenseDateChange}
            placeholder="DD/MM/YY"
            label="Exp Date"
            error={hasLicenseExpiryError}
            errorMessage={
              firstErrorField === "licenseExpiry"
                ? errors.licenseExpiry.message
                : ""
            }
            disabledDateCondition={(date) => date < new Date()}
          />
          <input
            type="hidden"
            {...register("licenseExpiry", {
              required: "Expiry Date is Required",
              validate: (value) => {
                if (!value) return "Expiry Date is Required";
                return true;
              },
            })}
          />

          {/* File Upload */}
          <div className="col-span-2 sm:col-span-1">
            <ImageUpload
              label={"Driver License image"}
              files={licenseFiles}
              setFiles={(files) => {
                setValue("licenseFiles", files, { shouldValidate: true });
                if (files && files.length > 0) {
                  clearErrors("licenseFiles");
                }
              }}
              error={errors.licenseFiles ? errors.licenseFiles.message : false}
            />
            <input
              type="hidden"
              {...register("licenseFiles", {
                required: "At least one license image is required",
                validate: (value) => {
                  if (!value || value.length === 0) {
                    return "At least one license image is required";
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLicenseInfo;
