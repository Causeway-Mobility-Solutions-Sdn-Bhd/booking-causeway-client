import React from "react";
import { ImageUpload } from "@/components/custom/UploadDocumentInput";
import hqApi from "@/lib/hqApi";
import { showErrorToast } from "@/app/_lib/toast";
import { useWatch } from "react-hook-form";

const DriverLicenseInfo = ({
  register,
  setValue,
  errors,
  clearErrors,
  firstErrorField,
  control,
}) => {
  const licenseFiles = useWatch({ name: "licenseFiles", control }) || [];

  const handleDeleteFile = async (fileId) => {
    try {
      await hqApi.delete(`file/${fileId}`);
    } catch (error) {
      showErrorToast("Error Deleting File.");
    }
  };

  console.log("LICENSE RERENDERED");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver's License Information
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 gap-4">
          <ImageUpload
            onDeleteExisting={handleDeleteFile}
            label={"Driver License image"}
            files={licenseFiles}
            setFiles={(files) => {
              setValue("licenseFiles", files, { shouldValidate: true });
              if (files && files.length > 0) {
                clearErrors("licenseFiles");
              }
            }}
            error={errors.licenseFiles ? errors.licenseFiles.message : false}
          />

          <input
            type="hidden"
            {...register("licenseFiles", {
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
  );
};

export default React.memo(DriverLicenseInfo, (prevProps, nextProps) => {
  const relevantFields = ["licenseFiles"];

  const errorChanged = relevantFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    relevantFields.includes(nextProps.firstErrorField);

  return !errorChanged && !firstErrorChanged;
});
