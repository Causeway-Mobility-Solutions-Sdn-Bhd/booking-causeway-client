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

      if (
        formData.driverLicense &&
        !/^[A-Z0-9]{5,20}$/i.test(formData.driverLicense)
      ) {
        newErrors.driverLicense = "Please enter a valid license number";
      }

      if (
        formData.licenseExpiry &&
        !/^\d{2}\/\d{2}\/\d{2}$/.test(formData.licenseExpiry)
      ) {
        newErrors.licenseExpiry = "Please enter a valid expiry date (DD/MM/YY)";
      }

      // if (formData.licenseFiles && formData.licenseFiles.length > 0) {
      //   const invalidFiles = formData.licenseFiles.filter(
      //     (file) =>
      //       file instanceof File &&
      //       !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      //   );
      //   if (invalidFiles.length > 0) {
      //     newErrors.licenseFiles = "Only JPG and PNG files are allowed";
      //   }
      // }

      // If validation fails, stop submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showErrorToast("Please fix the highlighted fields.");
        setSubmitLoader(false);
        return;
      }

      console.log(formData);

      const transformedData = transformCustomerFormData(formData);
      let customerId;
      let response;

      response = await updateCustomer({
        id: dataAvailable.id,
        data: transformedData,
      }).unwrap();
      customerId = dataAvailable.id;

      if (formData.licenseFiles && formData.licenseFiles.length > 0) {
        const newLicenseFiles = formData.licenseFiles.filter(
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
      />
    </form>
  );
};

export default DriverLicenseForm;
