import React from "react";
import { useForm } from "react-hook-form";
import CardDetails from "./CardDetailFields";
import { Checkbox } from "@/components/ui/checkbox";

const PaymentForm = ({ submitFormRef }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      cardExpiry: "",
      cvc: "",

      discountCode: "",
      payInFull: true,
      payPartial: false,
      agreeTerms: false,
    },
  });

  const getFirstErrorField = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return null;

    // Order of fields
    const fieldOrder = ["cardNumber", "cardExpiry", "cvc", "agreeTerms"];

    return fieldOrder.find((field) => errors[field]) || null;
  };

  const onSubmit = (data) => {
    console.log(data);
  };
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
      className="space-y-6 w-full"
    >
      <CardDetails
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
        firstErrorField={getFirstErrorField()}
      />

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
            Terms & Conditions
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

export default PaymentForm;
