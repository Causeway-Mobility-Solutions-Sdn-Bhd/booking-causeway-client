"use client";
import React from "react";
import { useForm } from "react-hook-form";
import VehicleInfo from "./VehicleInfo";

const SubmitVehicleInfoForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",

      phone: "",
      phoneCountryCode: "+60",
      email: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleMilage: "",
    },
  });
  const getFirstErrorField = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return null;

    // Order of fields
    const fieldOrder = [
      "name",

      "phone",
      "phoneCountryCode",
      "email",
      "vehicleMake",
      "vehicleModel",
      "vehicleYear",
      "vehicleMilage",
    ];

    return fieldOrder.find((field) => errors[field]) || null;
  };
  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
  };
  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      <h2 className="text-2xl font-bold text-black mb-2">
        Earn extra income now
      </h2>
      <p className="text-md font-normal text-black mb-5">
        Share your contact information and the vehicle you wish to subscribe out
        so we can better serve you.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 space-y-6 pb-10"
      >
        {/* Driver's License Information Component */}

        <VehicleInfo
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          firstErrorField={getFirstErrorField()}
        />

        {/* <button onClick={fillFormData}>Test</button> */}
      </form>
    </div>
  );
};

export default SubmitVehicleInfoForm;
