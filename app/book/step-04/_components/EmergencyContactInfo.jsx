import DropdownInput from "@/components/custom/DropdownInput";
import PhoneInput from "@/components/custom/PhoneInput";
import { Input } from "@/components/ui/input";
import React from "react";
import ErrorMessage from "../../../../components/custom/ErrorMessage";

// Predefined relationship options
const relationships = [
  { value: "spouse", label: "Spouse" },
  { value: "family", label: "Family" },
  { value: "friend", label: "Friends" },
];

const EmergencyContactInfo = ({
  register,
  errors,
  setValue,
  control,
  getValues,
  firstErrorField,
}) => {
  // const hasEmergencyNameError = !!errors.emergencyName;
  const hasEmergencyRelationshipError = !!errors.emergencyRelationship;
  // const hasEmergencyEmailError = !!errors.emergencyEmail;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Emergency Contact Information
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          {/* <div>
            <Input
              {...register("emergencyName", {
                required: "Emergency contact name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets are allowed",
                },
              })}
              placeholder="Full Name"
              className={`placeholder:font-light placeholder:text-sm !h-11 border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasEmergencyNameError ? "border-red-500" : ""
              }`}
            />
            {hasEmergencyNameError && firstErrorField === "emergencyName" && (
              <ErrorMessage message={errors.emergencyName.message} />
            )}
          </div> */}

          {/* Relationship Dropdown */}
          <DropdownInput
            data={relationships}
            getValues={getValues}
            setValue={setValue}
            label="Relationship"
            name="emergencyRelationship"
            register={register}
            errors={errors}
            hasError={hasEmergencyRelationshipError}
            firstErrorField={firstErrorField}
            control={control}
          />

          {/* Mobile Number */}
          <PhoneInput
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            name="emergencyPhone"
            firstErrorField={firstErrorField}
          />

          {/* Email Address */}
          {/* <div>
            <Input
              {...register("emergencyEmail", {
                required: "Emergency contact email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
              className={`placeholder:font-light placeholder:text-sm !h-11 border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasEmergencyEmailError ? "border-red-500" : ""
              }`}
            />
            {hasEmergencyEmailError && firstErrorField === "emergencyEmail" && (
              <ErrorMessage message={errors.emergencyEmail.message} />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

// Custom comparison function(if Relevant Fields Change we Rerender)
const arePropsEqual = (prevProps, nextProps) => {
  const relevantErrorFields = ["emergencyRelationship", "emergencyPhone"];

  const errorsChanged = relevantErrorFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    (relevantErrorFields.includes(prevProps.firstErrorField) ||
      relevantErrorFields.includes(nextProps.firstErrorField));

  return !errorsChanged && !firstErrorChanged;
};

export default React.memo(EmergencyContactInfo, arePropsEqual);
