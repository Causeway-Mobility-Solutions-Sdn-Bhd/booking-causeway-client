import React from "react";
import { Input } from "@/components/ui/input";
import DropdownInput from "@/components/custom/DropdownInput";
import PhoneInput from "@/components/custom/PhoneInput";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/custom/Spinner";

const VehicleInfo = ({
  register,
  errors,
  setValue,
  watch,
  firstErrorField,
  onSubmit,
  submitLoader,
}) => {
  // Check if fields have errors
  const hasNameError = !!errors.name;
  const hasPhoneError = !!errors.phone;
  const hasEmailError = !!errors.email;
  const hasVehicleMakeError = !!errors.vehicleMake;
  const hasVehicleModelError = !!errors.vehicleModel;
  const hasVehicleYearError = !!errors.vehicleYear;
  const hasVehicleMilageError = !!errors.vehicleMilage;

  // Generate year options (from 1990 to current year + 1)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear + 1; year >= 1990; year--) {
    yearOptions.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  // Sample vehicle makes and models (you can replace with actual API data)
  const vehicleMakes = [
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "ford", label: "Ford" },
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes-Benz" },
    { value: "audi", label: "Audi" },
    { value: "hyundai", label: "Hyundai" },
    { value: "nissan", label: "Nissan" },
  ];

  const vehicleModels = [
    { value: "camry", label: "Camry" },
    { value: "civic", label: "Civic" },
    { value: "corolla", label: "Corolla" },
    { value: "accord", label: "Accord" },
    { value: "mustang", label: "Mustang" },
    { value: "3-series", label: "3 Series" },
    { value: "c-class", label: "C-Class" },
    { value: "a4", label: "A4" },
  ];

  return (
    <div className="col-span-4 lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
      {/* Personal Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <Input
            {...register("name", {
              required: "Full name is required",
            })}
            type="text"
            placeholder="Full Name"
            className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
              hasNameError ? "border-red-500" : ""
            }`}
          />
          {hasNameError && firstErrorField === "name" && (
            <ErrorMessage message={errors.name.message} />
          )}
        </div>

        {/* Mobile Number */}
        <PhoneInput
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          name="phone"
          firstErrorField={firstErrorField}
        />

        {/* Email Address */}
        <div className="md:col-span-2">
          <Input
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="Email Address"
            className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
              hasEmailError ? "border-red-500" : ""
            }`}
          />
          {hasEmailError && firstErrorField === "email" && (
            <ErrorMessage message={errors.email.message} />
          )}
        </div>
      </div>

      {/* Vehicle Information Section */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Vehicle Make */}
        <DropdownInput
          data={vehicleMakes}
          label="Vehicle Make"
          name="vehicleMake"
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          hasError={hasVehicleMakeError}
          firstErrorField={firstErrorField}
          placeholder="Select Make"
          validation={{ required: "Vehicle make is required" }}
        />

        {/* Vehicle Model */}
        <DropdownInput
          data={vehicleModels}
          label="Vehicle Model"
          name="vehicleModel"
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          hasError={hasVehicleModelError}
          firstErrorField={firstErrorField}
          placeholder="Select Model"
          validation={{ required: "Vehicle model is required" }}
        />

        {/* Vehicle Year */}
        <DropdownInput
          data={yearOptions}
          label="Vehicle Year"
          name="vehicleYear"
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          hasError={hasVehicleYearError}
          firstErrorField={firstErrorField}
          placeholder="Select Year"
          validation={{ required: "Vehicle year is required" }}
        />

        {/* Vehicle Mileage */}
        <div>
          <Input
            {...register("vehicleMilage", {
              required: "Vehicle mileage is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid mileage number",
              },
              min: {
                value: 0,
                message: "Mileage cannot be negative",
              },
              max: {
                value: 1000000,
                message: "Please enter a realistic mileage",
              },
            })}
            type="number"
            placeholder="Vehicle Mileage"
            className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
              hasVehicleMilageError ? "border-red-500" : ""
            }`}
            min="0"
            max="1000000"
          />
          {hasVehicleMilageError && firstErrorField === "vehicleMilage" && (
            <ErrorMessage message={errors.vehicleMilage.message} />
          )}
        </div>
      </div>

      <div className="mt-5">
        <Button
          disabled={submitLoader}
          onClick={onSubmit}
          className={`w-full md:w-[20%] flex justify-center gap-1 items-center bg-cPrimary py-6 text-white 
    ${submitLoader ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {submitLoader ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VehicleInfo;
