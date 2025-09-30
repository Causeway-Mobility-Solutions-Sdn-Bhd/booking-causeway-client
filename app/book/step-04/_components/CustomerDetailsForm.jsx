import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import DriverLicenseInfo from "./DriverLicenseInfo";
import DriverInformation from "./DriverInformation";
import DriversContactInfo from "./DriversContactInfo";
import EmergencyContactInfo from "./EmergencyContactInfo";
import OtherInformation from "./OtherInformation";
import { transformCustomerFormData } from "@/app/_lib/transformCustomerData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import { setReservation } from "@/store/slices/reservationSlice";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";

const CustomerDetailsForm = ({
  submitFormRef,
  setSubmitLoader,
  dataAvailable,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      driverLicense: "",
      licenseExpiry: "",
      licenseFiles: [],

      firstName: "",
      passportNumber: "",
      birthDate: "",
      idCardOrPass: [],

      phone: "",
      phoneCountryCode: "+60",
      email: "",
      address: "",
      address2: "",
      zipCode: "",
      city: "",
      state: "Johor",
      country: "MY",

      // Emergency Contact Information
      // emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
      emergencyPhoneCountryCode: "+60", // Default for emergency phone
      // emergencyEmail: "",

      otherInfo: "",

      agreeTerms: false,
    },
  });
  // Watch form values if needed
  const formData = watch();
  console.log(dataAvailable);
  const onSubmit = async (data) => {
    setSubmitLoader(true);

    try {
      const transformedData = transformCustomerFormData(data);

      let customerId;
      let response;

      if (dataAvailable) {
        // UPDATE MODE - PUT request
        response = await hqApi.put(
          `customers/update-customer/${dataAvailable.id}`,
          transformedData
        );

        console.log("API response (update):", response.data);
        customerId = dataAvailable.id;
      } else {
        // CREATE MODE - POST request
        response = await hqApi.post("customers/create-customers", null, {
          params: transformedData,
        });
        console.log("API response (create):", response.data);
        customerId = response.data?.customer?.contact.id;
      }

      // Upload NEW license files (only File objects, not existing ones with id/public_link)
      if (data.licenseFiles && data.licenseFiles.length > 0) {
        const newLicenseFiles = data.licenseFiles.filter(
          (file) => file instanceof File
        );

        for (const file of newLicenseFiles) {
          await uploadFileToHQ({
            file,
            item_id: customerId,
            item_type: "contacts.3",
            field_id: 252,
          });
        }
      }

      // Upload NEW ID/Passport files (only File objects, not existing ones with id/public_link)
      if (data.idCardOrPass && data.idCardOrPass.length > 0) {
        const newIdCardFiles = data.idCardOrPass.filter(
          (file) => file instanceof File
        );

        for (const file of newIdCardFiles) {
          await uploadFileToHQ({
            file,
            item_id: customerId,
            item_type: "contacts.3",
            field_id: 274,
          });
        }
      }

      if (!dataAvailable) {
        dispatch(setReservation(response.data?.reservation));
      }
      showSuccessToast(
        dataAvailable
          ? "Customer updated successfully!"
          : "Customer created successfully!"
      );
      router.push(`/book/step-05?ssid=${currentUUID}`);
    } catch (error) {
      console.log("Error submitting form:", error);
      showErrorToast(
        dataAvailable
          ? "Failed to update customer. Please try again."
          : "Failed to create customer. Please try again."
      );
    } finally {
      setSubmitLoader(false);
    }
  };

  // Helper function to upload files
  const uploadFileToHQ = async ({ file, item_id, item_type, field_id }) => {
    try {
      const formData = new FormData();
      formData.append("item_id", item_id);
      formData.append("item_type", item_type);
      formData.append("filename", file.name);
      formData.append("field_id", field_id);
      formData.append("file", file);

      const response = await hqApi.post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(`File uploaded successfully:`, response.data);
      return response.data;
    } catch (error) {
      console.log("Error uploading file:", error);
      throw error;
    }
  };

  const getFirstErrorField = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return null;

    // Order of fields
    const fieldOrder = [
      "driverLicense",
      "licenseExpiry",
      "licenseFiles",
      "firstName",
      "lastName",
      "passportNumber",
      "birthDate",
      "idCardOrPass",
      "phone",
      "email",
      "address",
      "zipCode",
      "city",
      "state",
      "country",
      // "emergencyName",
      "emergencyRelationship",
      "emergencyPhone",
      // "emergencyEmail",
      "agreeTerms",
    ];

    return fieldOrder.find((field) => errors[field]) || null;
  };
  const fillFormData = (data) => {
    // Sample data for form fields
    const sampleData = {
      // Driver License Info
      driverLicense: "D12345678",
      licenseExpiry: "31/12/25",

      // Driver Information
      firstName: "JohnTest",
      lastName: "Test",
      passportNumber: "A12345678",
      birthDate: "31/12/86",

      // Contact Information
      phone: "123456789",
      phoneCountryCode: "+60",
      email: "john.smith@example.com",
      address: "123 Main Street",
      address2: "Apt 4B",
      zipCode: "50000",
      city: "Kuala Lumpur",

      // Emergency Contact Information
      // emergencyName: "Jane Smith",
      emergencyRelationship: "Spouse",
      emergencyPhone: "987654321",
      emergencyPhoneCountryCode: "+60",
      // emergencyEmail: "jane.smith@example.com",

      // Other Information
      otherInfo: "Sample customer data for testing purposes",

      // Terms Agreement
      agreeTerms: true,
    };

    // Set all form values
    Object.entries(data).forEach(([fieldName, value]) => {
      setValue(fieldName, value);
    });
  };
  useEffect(() => {
    if (dataAvailable) {
      fillFormData(dataAvailable);
    }
  }, [dataAvailable]);
  return (
    <form
      ref={(el) => {
        // Store the submit function in the ref
        if (el) {
          submitFormRef.current = () => {
            el.requestSubmit();
          };
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Driver's License Information Component */}
      <button onClick={fillFormData}>Test</button>
      <DriverLicenseInfo
        register={register}
        setValue={setValue}
        errors={errors}
        watch={watch}
        clearErrors={clearErrors}
        firstErrorField={getFirstErrorField()}
      />

      <DriverInformation
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
        firstErrorField={getFirstErrorField()}
      />
      {/* Driver's Contact Information */}
      <DriversContactInfo
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        firstErrorField={getFirstErrorField()}
      />

      <EmergencyContactInfo
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        firstErrorField={getFirstErrorField()}
      />

      <OtherInformation register={register} watch={watch} />
      {/* Terms and Conditions */}
      <div className="">
        <div className="flex gap-3">
          <Checkbox
            id="agreeTerms"
            checked={watch("agreeTerms")}
            onCheckedChange={(checked) => {
              setValue("agreeTerms", checked, { shouldValidate: true });
            }}
            className="mt-1.5"
          />
          {/* Hidden input for react-hook-form validation */}
          <input
            type="checkbox"
            {...register("agreeTerms", {
              required: "You must agree to the terms and conditions",
            })}
            className="hidden"
            checked={watch("agreeTerms")}
            onChange={(e) => setValue("agreeTerms", e.target.checked)}
          />
          <label
            htmlFor="agreeTerms"
            className="text-md flex-1 leading-relaxed"
          >
            By proceed, I confirm that all the information provided is true and
            complete to the best of my knowledge. Providing false information
            may potentially result in Causeway rejecting my booking.
          </label>
        </div>
        {getFirstErrorField() === "agreeTerms" && errors.agreeTerms && (
          <p className="text-red-500 text-sm mt-1 ml-7">
            {errors.agreeTerms.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default CustomerDetailsForm;
