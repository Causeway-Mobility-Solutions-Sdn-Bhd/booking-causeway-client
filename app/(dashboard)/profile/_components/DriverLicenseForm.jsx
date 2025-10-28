"use client";
import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import DriverLicenseInfo from "@/app/_components/CustomerFormComponents/DriverLicenseInfoSeparate";
import {
  useUpdateCustomerMutation,
  useUploadLicenseFileMutation,
} from "@/store/api/customerApiSlice";
import { transformCustomerFormData } from "@/app/_lib/transformCustomerData";

const DriverLicenseForm = ({
  submitFormRef,
  dataAvailable,
  setSubmitLoader,
  refetch,
  customerId,
}) => {
  const [formData, setFormData] = useState({
    driverLicense: "",
    licenseExpiry: "",
    licenseFiles: [],
  });

  const [errors, setErrors] = useState({});

  const [uploadLicenseFile] = useUploadLicenseFileMutation();
  const [updateCustomer, { isLoading: isUpdating }] =
    useUpdateCustomerMutation();

  useEffect(() => {
    if (dataAvailable) {
      setFormData({
        driverLicense: dataAvailable?.driverLicense || "",
        licenseExpiry: dataAvailable?.licenseExpiry || "",
        licenseFiles: dataAvailable?.licenseFiles || [],
      });
    }
  }, [dataAvailable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);

    try {
      const newErrors = {};

      if (!formData.driverLicense) {
        newErrors.driverLicense = "Driver license number is required";
      } else if (!/^[A-Z0-9]{5,20}$/i.test(formData.driverLicense)) {
        newErrors.driverLicense = "Please enter a valid license number";
      }

      if (!formData.licenseExpiry) {
        newErrors.licenseExpiry = "License expiry date is required";
      } else if (!/^\d{2}\/\d{2}\/\d{2}$/.test(formData.licenseExpiry)) {
        newErrors.licenseExpiry = "Please enter a valid expiry date (DD/MM/YY)";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showErrorToast("Please fix the highlighted fields.");
        setSubmitLoader(false);
        return;
      }

      const transformedData = transformCustomerFormData(formData);

      if (Object.values(transformedData).length === 0) {
        showErrorToast("All fields can't be empty.");
        setSubmitLoader(false);
        return;
      }

      await updateCustomer({
        id: dataAvailable.id,
        data: transformedData,
      }).unwrap();

      const newLicenseFiles = formData.licenseFiles?.filter(
        (file) => file instanceof File
      );

      if (newLicenseFiles?.length > 0) {
        await Promise.all(
          newLicenseFiles.map((file) =>
            uploadLicenseFile({
              file,
              item_id: dataAvailable.id,
              item_type: "contacts.3",
              field_id: 252,
            }).unwrap()
          )
        );
        if (refetch) await refetch();
      }

      showSuccessToast("License Information updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorToast("Failed to update License. Please try again.");
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <form
      ref={(el) => {
        if (el) {
          submitFormRef.current = () => {
            el.requestSubmit();
          };
        }
      }}
      onSubmit={handleSubmit}
      className="space-y-6 pb-28"
    >
      <DriverLicenseInfo
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        customerId={customerId}
      />
    </form>
  );
};

export default DriverLicenseForm;
