"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import DriverLicenseInfo from "./DriverLicenseInfo";
import DriverInformation from "./DriverInformation";
import DriversContactInfo from "./DriversContactInfo";
import EmergencyContactInfo from "./EmergencyContactInfo";
import OtherInformation from "./OtherInformation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";

import { useMemo } from "react";
import { transformCustomerFormData } from "@/app/_lib/transformCustomerData";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUploadLicenseFileMutation,
} from "@/store/api/customerApiSlice";

const ProfileUpdateForm = ({ setSubmitLoader, submitFormRef }) => {
  const router = useRouter();
  const [updateCustomer, { isLoading: isUpdating }] =
    useUpdateCustomerMutation();
  const [uploadLicenseFile] = useUploadLicenseFileMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    mode: hasSubmitted ? "onBlur" : "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "MY",
      birthDate: "",

      phone: "",
      phoneCountryCode: "+60",
      email: "",

      emergencyPhone: "",
      emergencyPhoneCountryCode: "+60",
      emergencyRelationship: "",

      licenseFiles: [],
    },
  });

  const onSubmit = async (data) => {
    console.log("CLICK");
    console.log(data);

    setSubmitLoader(true);
    setHasSubmitted(true);

    try {
      const transformedData = transformCustomerFormData(data);
      let customerId;
      let response;

      // Create or Update Customer
      if (dataAvailable) {
        response = await updateCustomer({
          id: dataAvailable.id,
          data: transformedData,
        }).unwrap();
        customerId = dataAvailable.id;
      } else {
        response = await createCustomer(transformedData).unwrap();
        customerId = response?.customer?.contact?.id;
      }

      // Upload License Files
      if (data.licenseFiles && data.licenseFiles.length > 0) {
        const newLicenseFiles = data.licenseFiles.filter(
          (file) => file instanceof File
        );

        for (const file of newLicenseFiles) {
          await uploadLicenseFile({
            file,
            item_id: customerId,
            item_type: "contacts.3",
            field_id: 252,
          }).unwrap();
        }
      }

      // Show success message
      showSuccessToast(
        dataAvailable
          ? "Customer updated successfully!"
          : "Customer created successfully!"
      );

      // Redirect
      router.push(`/book/step-05?ssid=${currentUUID}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorToast(
        dataAvailable
          ? "Failed to update customer. Please try again."
          : "Failed to create customer. Please try again."
      );
    } finally {
      setSubmitLoader(false);
    }
  };

  const firstErrorField = useMemo(() => {
    const fieldOrder = [
      "firstName",
      "lastName",
      "country",
      "birthDate",
      "phone",
      "email",
      "emergencyPhone",
      "emergencyRelationship",
      "licenseFiles",
      "agreeTerms",
    ];

    for (const field of fieldOrder) {
      if (errors?.[field]) return field;
    }
    return null;
  }, [
    errors.firstName,
    errors.lastName,
    errors.country,
    errors.birthDate,
    errors.phone,
    errors.email,
    errors.emergencyPhone,
    errors.emergencyRelationship,
    errors.licenseFiles,
  ]);

  useEffect(() => {
    if (dataAvailable) {
      Object.entries(dataAvailable).forEach(([fieldName, value]) => {
        setValue(fieldName, value);
      });
    }
  }, [dataAvailable, setValue]);

  const driverInfoErrors = useMemo(
    () => ({
      firstName: errors.firstName,
      lastName: errors.lastName,
      country: errors.country,
      birthDate: errors.birthDate,
    }),
    [errors.firstName, errors.lastName, errors.country, errors.birthDate]
  );

  const driverContactErrors = useMemo(
    () => ({
      phone: errors.phone,
      email: errors.email,
    }),
    [errors.phone, errors.email]
  );

  const emergencyErrors = useMemo(
    () => ({
      emergencyPhone: errors.emergencyPhone,
      emergencyRelationship: errors.emergencyRelationship,
    }),
    [errors.emergencyPhone, errors.emergencyRelationship]
  );

  return (
    <form
      ref={(el) => {
        if (el) {
          submitFormRef.current = () => {
            el.requestSubmit();
          };
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <DriverInformation
        register={register}
        errors={driverInfoErrors}
        watch={watch}
        setValue={setValue}
        control={control}
        clearErrors={clearErrors}
        firstErrorField={firstErrorField}
      />

      <DriversContactInfo
        register={register}
        control={control}
        errors={driverContactErrors}
        setValue={setValue}
        firstErrorField={firstErrorField}
      />
      <DriverLicenseInfo
        register={register}
        setValue={setValue}
        control={control}
        errors={errors}
        clearErrors={clearErrors}
        firstErrorField={firstErrorField}
      />
      <EmergencyContactInfo
        register={register}
        errors={emergencyErrors}
        setValue={setValue}
        control={control}
        firstErrorField={firstErrorField}
      />

      <OtherInformation register={register} />
    </form>
  );
};

export default ProfileUpdateForm;
