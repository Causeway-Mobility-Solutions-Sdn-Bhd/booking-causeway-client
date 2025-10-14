import React from "react";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/custom/PhoneInput";
import ErrorMessage from "../../../../components/custom/ErrorMessage";
import { InfoIcon } from "lucide-react";
import { Tooltip } from "@/components/custom/InputInfoTooltip";

const DriversContactInfo = ({
  register,
  setValue,
  control,
  firstErrorField,
  errors,
}) => {
  console.log("CONTACT RERENDERED");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver's Contact Information
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneInput
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            name="phone"
            firstErrorField={firstErrorField}
            instructions={true}
          />

          <div className="relative">
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
              className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-10 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            <div className="absolute right-3 top-6 -translate-y-1/2">
              <Tooltip
                message="Enter a valid email to receive updates. Your information stays private."
                title="Instructions"
              />
            </div>
            {firstErrorField === "email" && errors.email && (
              <ErrorMessage message={errors.email.message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DriversContactInfo, (prevProps, nextProps) => {
  // Only rerender if relevant errors or firstErrorField for this section changes
  const relevantFields = ["phone", "email"];
  const errorChanged = relevantFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    relevantFields.includes(nextProps.firstErrorField);

  return !errorChanged && !firstErrorChanged;
});
