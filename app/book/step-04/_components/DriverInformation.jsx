import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { differenceInYears, format, isValid, parse } from "date-fns";
import { ImageUpload } from "@/components/custom/UploadDocumentInput";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import ErrorMessage from "../../../../components/custom/ErrorMessage";
import { useWatch } from "react-hook-form";

const DriverInformation = ({
  register,
  setValue,
  errors,
  clearErrors,
  firstErrorField,
  watch,
  control,
}) => {
  const hasFirstNameError = !!errors.firstName;
  const hasLastNameError = !!errors.lastName;
  const hasPassportError = !!errors.passportNumber;
  const hasBirthDateError = !!errors.birthDate;

  const idCardOrPass = useWatch({ name: "idCardOrPass", control }) || [];

  const handleBirthDateChange = (date) => {
    setValue("birthDate", date ? format(date, "dd/MM/yy") : "", {
      shouldValidate: true,
    });
  };

  const dateString = useWatch({ name: "birthDate", control });
  const parseLicenseDate = () => {
    if (!dateString) return null;

    try {
      return parse(dateString, "dd/MM/yy", new Date());
    } catch (e) {
      console.log("Error parsing license date:", e);
      return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver Information
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 items-start`}>
          {/* First Name Input */}
          <div>
            <Input
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets are allowed",
                },
              })}
              placeholder="First Name"
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasFirstNameError ? "border-red-500" : ""
              }`}
            />
            {hasFirstNameError && firstErrorField === "firstName" && (
              <ErrorMessage message={errors.firstName.message} />
            )}
          </div>

          {/* Last Name Input */}
          <div>
            <Input
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets are allowed",
                },
              })}
              placeholder="Last Name"
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasLastNameError ? "border-red-500" : ""
              }`}
            />
            {hasLastNameError && firstErrorField === "lastName" && (
              <ErrorMessage message={errors.lastName.message} />
            )}
          </div>

          {/* ID Card/Passport Number Input */}
          <div>
            <Input
              {...register("passportNumber", {
                required: "ID/Passport number is required",
                pattern: {
                  value: /^[A-Z0-9]{5,20}$/,
                  message: "Please enter a valid ID/Passport number",
                },
              })}
              placeholder="ID Card/Passport Number"
              className={`!w-full h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasPassportError ? "border-red-500" : ""
              }`}
            />
            {hasPassportError && firstErrorField === "passportNumber" && (
              <ErrorMessage message={errors.passportNumber.message} />
            )}
          </div>

          {/* Birthday Picker */}
          <CustomDatePicker
            value={parseLicenseDate()}
            onChange={handleBirthDateChange}
            placeholder="DD/MM/YY"
            label="Birthday"
            error={hasBirthDateError}
            errorMessage={
              firstErrorField === "birthDate" ? errors.birthDate?.message : ""
            }
          />

          <input
            type="hidden"
            {...register("birthDate", {
              required: "Birthday is required",
              validate: (value) => {
                if (!value) return "Birthday is required";
                console.log("VALUE", value);

                const birthDate = parse(value, "dd/MM/yy", new Date());
                console.log(birthDate);

                if (!isValid(birthDate)) return "Invalid date";

                const age = differenceInYears(new Date(), birthDate);

                if (age < 23 || age > 75) {
                  return "Age must be between 23 and 75 years";
                }
                return true;
              },
            })}
          />

          <div className={`col-span-2 lg:col-span-1`}>
            <ImageUpload
              label={"ID Card/Passport image"}
              files={idCardOrPass}
              setFiles={(files) => {
                setValue("idCardOrPass", files, { shouldValidate: true });
                if (files && files.length > 0) {
                  clearErrors("idCardOrPass");
                }
              }}
              error={errors.idCardOrPass ? errors.idCardOrPass.message : false}
            />
            <input
              type="hidden"
              {...register("idCardOrPass", {
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

// Custom comparison function(if Relevant Fields Change we Rerender)
const arePropsEqual = (prevProps, nextProps) => {
  const relevantErrorFields = [
    "firstName",
    "lastName",
    "passportNumber",
    "birthDate",
    "idCardOrPass",
  ];

  const errorsChanged = relevantErrorFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    (relevantErrorFields.includes(prevProps.firstErrorField) ||
      relevantErrorFields.includes(nextProps.firstErrorField));

  return !errorsChanged && !firstErrorChanged;
};

export default React.memo(DriverInformation, arePropsEqual);
