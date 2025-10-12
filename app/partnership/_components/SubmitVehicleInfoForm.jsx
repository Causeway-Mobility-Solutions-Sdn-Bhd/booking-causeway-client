"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import VehicleInfo from "./VehicleInfo";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import hqApi from "@/lib/hqApi";

const SubmitVehicleInfoForm = () => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    control,
    formState: { errors },
    reset,
    getValues,
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
    setSubmitLoader(true);

    try {
      // Prepare the partner email data
      const partnerEmailData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        phoneCountryCode: data.phoneCountryCode,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        vehicleYear: data.vehicleYear,
        vehicleMilage: data.vehicleMilage,
      };

      // Send partner notification email
      const emailResponse = await hqApi.post(
        "email/partner-email",
        partnerEmailData
      );

      console.log("Partner email sent:", emailResponse.data);
      showSuccessToast("Form submitted! We'll contact you within 1 day.");
      reset();
    } catch (error) {
      console.log("Error submitting form:", error);

      // More specific error handling
      if (error.response?.status === 400) {
        showErrorToast("Invalid form data. Please check all fields.");
      } else if (error.response?.status === 500) {
        showErrorToast("Server error. Please try again later.");
      } else {
        showErrorToast("Failed to submit form. Please try again.");
      }
    } finally {
      setSubmitLoader(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center md:px-40  pb-12 sm:pb-0 max-w-[1400px] mx-auto w-[90%] sm:w-[90%] mt-[30px]">
      <div className="xsm:text-center">
        <h2 className="text-2xl font-bold text-black mb-2">
          Earn your extra income now
        </h2>
        <p className="text-sm font-normal text-black mb-5">
          Share your contact information and the vehicle you wish to subscribe
          out so we can better serve you.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 space-y-6 pb-10"
      >
        <VehicleInfo
          submitLoader={submitLoader}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          control={control}
          firstErrorField={getFirstErrorField()}
        />

        {/* <button onClick={fillFormData}>Test</button> */}
      </form>
    </div>
  );
};

export default SubmitVehicleInfoForm;
