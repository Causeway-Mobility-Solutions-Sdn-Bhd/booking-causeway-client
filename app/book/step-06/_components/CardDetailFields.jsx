import React, { useState } from "react";
import { CreditCard } from "lucide-react";

import { Input } from "@/components/ui/input";
import { format, parse } from "date-fns";

import CustomDatePicker from "@/components/custom/CustomDatePicker";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const CardDetails = ({
  register,
  setValue,
  errors,
  clearErrors,
  firstErrorField,
  watch,
}) => {
  // Check if fields have errors
  const hasCardNumberError = !!errors.cardNumber;
  const hasCardExpiryError = !!errors.cardExpiry;
  const hasCvcError = !!errors.cvc;
  const handleCardDateChange = (date) => {
    setValue("cardExpiry", date ? format(date, "dd/MM/yy") : "", {
      shouldValidate: true,
    });
  };

  const parseCardDate = () => {
    const dateString = watch("cardExpiry");
    if (!dateString) return null;

    try {
      // Parse the dd/MM/yy format back to Date object
      return parse(dateString, "dd/MM/yy", new Date());
    } catch (e) {
      console.log("Error parsing license date:", e);
      return null;
    }
  };
  return (
    <div className="w-full space-y-6">
      <div className="w-full lg:w-[55%] xl:w-[45%] bg-white py-3 pr-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-center gap-6">
          <div className="flex justify-center items-center space-x-3">
            <Checkbox
              id="payInFull"
              checked={watch("payInFull")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setValue("payInFull", true, { shouldValidate: true });
                  setValue("payPartial", false, { shouldValidate: true });
                } else {
                  setValue("payInFull", false, { shouldValidate: true });
                }
              }}
              className="w-4 h-4 mt-1 rounded-full border-teal-500 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
            <div className="flex flex-col">
              <label
                htmlFor="payInFull"
                className="text-black font-bold text-sm cursor-pointer"
              >
                Pay in Full Now
              </label>
              <span className="text-gray-500 text-xs">
                Faster Vehicle collection
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* Option 2 - Partial Payment */}
          <div className="flex justify-center items-center space-x-3">
            <Checkbox
              id="payPartial"
              checked={watch("payPartial")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setValue("payPartial", true, { shouldValidate: true });
                  setValue("payInFull", false, { shouldValidate: true });
                } else {
                  setValue("payPartial", false, { shouldValidate: true });
                }
              }}
              className="w-4 h-4 mt-1 rounded-full border-teal-500 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
            <div className="flex flex-col">
              <label
                htmlFor="payPartial"
                className="text-black font-bold text-sm cursor-pointer"
              >
                Pay RMXX.XX now
              </label>
              <span className="text-gray-500 text-xs">
                Pay the rest at pickup
              </span>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Credit/Debit Card
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 items-start`}>
          {/* First Name Input */}
          <div className="col-span-2 md:col-span-1">
            <Input
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^[0-9\s]+$/,
                  message: "Only numbers and spaces are allowed",
                },
                validate: {
                  validLength: (value) => {
                    const cleanValue = value.replace(/\s/g, "");
                    return (
                      (cleanValue.length >= 13 && cleanValue.length <= 16) ||
                      "Card number must be 13-16 digits"
                    );
                  },
                },
              })}
              placeholder="Card Number"
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                errors.cardNumber ? "border-red-500" : ""
              }`}
            />
            {hasCardNumberError && firstErrorField === "cardNumber" && (
              <ErrorMessage message={errors.firstName.message} />
            )}
          </div>

          {/* Expiry Date Picker */}
          <CustomDatePicker
            value={parseCardDate()}
            onChange={handleCardDateChange}
            placeholder="DD/MM/YY"
            label="Exp Date"
            error={hasCardExpiryError}
            errorMessage={
              firstErrorField === "cardExpiry" ? errors.cardExpiry.message : ""
            }
            disabledDateCondition={(date) => date < new Date()}
          />
          <input
            type="hidden"
            {...register("cardExpiry", {
              required: "Expiry Date is Required",
              validate: (value) => {
                if (!value) return "Expiry Date is Required";
                return true;
              },
            })}
          />

          <div className="relative">
            <Input
              {...register("cvc", {
                required: "CVC is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
                validate: {
                  validLength: (value) => {
                    return (
                      (value.length >= 3 && value.length <= 4) ||
                      "CVC must be 3-4 digits"
                    );
                  },
                },
              })}
              placeholder="CVC"
              maxLength={4}
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors pr-10 ${
                errors.cvc ? "border-red-500" : ""
              }`}
            />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {hasCvcError && firstErrorField === "cvc" && (
              <ErrorMessage message={errors.cvc.message} />
            )}
          </div>
        </div>
        <p className="font-light text-sm text-gray-500 mt-4">
          By providing your card information, you allow Causeway to charge your
          card for future payments in accordance to with their terms.
        </p>
      </div>

      <h2 className="text-lg font-bold mb-4 text-gray-800">Discount/Voucher</h2>

      <div className="w-[45%] bg-white  p-6 pb-4 rounded-lg shadow-lg ">
        {/* First Name Input */}
        <div className="w-full  flex items-center justify-center gap-3">
          <Input
            {...register("discountCode")}
            placeholder="Discount/Voucher Code"
            className={`h-11 w-[80%] placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
              errors.cardNumber ? "border-red-500" : ""
            }`}
          />

          <Button
            className={`items-center h-11 px-8  bg-cPrimary basis-[50%] sm:basis-[10%]  text-white `}
          >
            Apply
          </Button>
          {/* {hasCardNumberError && firstErrorField === "cardNumber" && (
            <ErrorMessage message={errors.firstName.message} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
