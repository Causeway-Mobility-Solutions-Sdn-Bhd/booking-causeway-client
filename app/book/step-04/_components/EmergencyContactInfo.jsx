import DropdownInput from "@/components/custom/DropdownInput";
import PhoneInput from "@/components/custom/PhoneInput";
import React from "react";

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
  firstErrorField,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Emergency Contact Information (Optional)
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneInput
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            name="emergencyPhone"
            firstErrorField={firstErrorField}
            required={false}
          />

          <DropdownInput
            data={relationships}
            setValue={setValue}
            label="Relationship"
            name="emergencyRelationship"
            register={register}
            errors={errors}
            hasError={!!errors.emergencyRelationship}
            firstErrorField={firstErrorField}
            control={control}
            required={false}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmergencyContactInfo, (prevProps, nextProps) => {
  const relevantFields = ["emergencyPhone", "emergencyRelationship"];

  const errorChanged = relevantFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    relevantFields.includes(nextProps.firstErrorField);
  console.log("MEMO", !errorChanged && !firstErrorChanged);

  return !errorChanged && !firstErrorChanged;
});
