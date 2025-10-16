import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import DriverLicenseInfo from "./DriverLicenseInfo";
import DriverInformation from "./DriverInformation";
import DriversContactInfo from "./DriversContactInfo";
import EmergencyContactInfo from "./EmergencyContactInfo";
import OtherInformation from "./OtherInformation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import { setReservation } from "@/store/slices/reservationSlice";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";

import { useMemo } from "react";
import { transformCustomerFormData } from "@/app/_lib/transformCustomerData";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUploadLicenseFileMutation,
} from "@/store/api/customerApiSlice";

const CustomerDetailsForm = ({
  submitFormRef,
  setSubmitLoader,
  dataAvailable,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);

  const [createCustomer, { isLoading: isCreating }] =
    useCreateCustomerMutation();
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

      otherInfo: "",

      agreeTerms: false,
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
    errors.agreeTerms,
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

          <input
            type="checkbox"
            {...register("agreeTerms", {
              required: "You must agree to the terms and conditions",
            })}
            className="hidden"
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
        {firstErrorField === "agreeTerms" && errors.agreeTerms && (
          <p className="text-red-500 text-sm mt-1 ml-7">
            {errors.agreeTerms.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default CustomerDetailsForm;
