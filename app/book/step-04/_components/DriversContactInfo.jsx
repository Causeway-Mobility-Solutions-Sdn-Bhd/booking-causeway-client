import React, { useEffect, useMemo, useCallback } from "react";
import { useFormState, useWatch } from "react-hook-form"; // Add useWatch
import { Input } from "@/components/ui/input";
import DropdownInput from "@/components/custom/DropdownInput";
import PhoneInput from "@/components/custom/PhoneInput";
import { useCountryData } from "@/hooks/useCountryData";
import ErrorMessage from "../../../../components/custom/ErrorMessage";

const DriversContactInfo = ({
  register,
  setValue,
  control,
  getValues,
  firstErrorField,
  errors,
}) => {
  const {
    countryCodes,
    countryStates,
    loading: dataLoading,
    error,
  } = useCountryData();

  const watchedCountry = useWatch({
    control,
    name: "country",
    defaultValue: "",
  });

  const hasEmailError = !!errors.email;
  const hasAddressError = !!errors.address;
  const hasZipCodeError = !!errors.zipCode;
  const hasCityError = !!errors.city;
  const hasStateError = !!errors.state;
  const hasCountryError = !!errors.country;

  const [, forceUpdate] = React.useState({});

  const formattedCountries = useMemo(() => {
    if (!countryCodes) return [];
    return Object.entries(countryCodes).map(([isoCode, data]) => ({
      value: isoCode,
      label: data.n,
      flag: isoCode.toLowerCase(),
    }));
  }, [countryCodes]);

  const getStatesForCountry = useCallback(
    (countryCode) => {
      if (!countryCode || !countryStates) return [];

      const states = countryStates[countryCode] || [];

      if (Array.isArray(states) && states.length > 0) {
        if (
          typeof states[0] === "string" &&
          states[0].toLowerCase().includes("no states")
        ) {
          return [
            {
              value: "No states",
              label: "No States",
            },
          ];
        }

        if (
          typeof states[0] === "object" &&
          states[0] !== null &&
          "name" in states[0]
        ) {
          return states.map((state) => ({
            value: state.name,
            label: state.name,
          }));
        }
      }

      return [];
    },
    [countryStates]
  );

  const currentCountryStates = useMemo(() => {
    return getStatesForCountry(watchedCountry);
  }, [watchedCountry, getStatesForCountry]);

  const handleCountryChange = useCallback(
    (value) => {
      const states = getStatesForCountry(value);

      if (states.length > 0) {
        setValue("state", states[0].value, { shouldValidate: false });
      } else {
        setValue("state", "", { shouldValidate: false });
      }

      setValue("country", value, { shouldValidate: false });

      forceUpdate({});
    },
    [getStatesForCountry, setValue]
  );

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver's Contact Information
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile Number */}
          <PhoneInput
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            getValues={getValues}
            name="phone"
            firstErrorField={firstErrorField}
          />

          {/* Email Address */}
          <div>
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
              className={`border-gray-200 !h-11 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasEmailError ? "border-red-500" : ""
              }`}
            />
            {hasEmailError && firstErrorField === "email" && (
              <ErrorMessage message={errors.email.message} />
            )}
          </div>

          {/* Street */}
          <div>
            <Input
              {...register("address", {
                required: "Street address is required",
              })}
              placeholder="Street"
              className={`h-11 border-gray-200 placeholder:font-light placeholder:text-sm placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasAddressError ? "border-red-500" : ""
              }`}
            />
            {hasAddressError && firstErrorField === "address" && (
              <ErrorMessage message={errors.address.message} />
            )}
          </div>

          {/* Street 2 (Optional) */}
          <div className="h-11">
            <Input
              {...register("address2")}
              placeholder="Street 2 (Optional)"
              className="placeholder:font-light placeholder:text-sm h-11 border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Zip Code */}
          <div>
            <Input
              {...register("zipCode", {
                required: "Zip code is required",
                pattern: {
                  value: /^[A-Z0-9\s-]{3,10}$/,
                  message: "Please enter a valid zip code",
                },
              })}
              placeholder="Zip Code"
              className={`placeholder:font-light placeholder:text-sm h-11 border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasZipCodeError ? "border-red-500" : ""
              }`}
            />
            {hasZipCodeError && firstErrorField === "zipCode" && (
              <ErrorMessage message={errors.zipCode.message} />
            )}
          </div>

          {/* City */}
          <div>
            <Input
              {...register("city", {
                required: "City is required",
              })}
              placeholder="City"
              className={`placeholder:font-light placeholder:text-sm h-11 border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                hasCityError ? "border-red-500" : ""
              }`}
            />
            {hasCityError && firstErrorField === "city" && (
              <ErrorMessage message={errors.city.message} />
            )}
          </div>

          {/* State Dropdown */}
          <DropdownInput
            data={currentCountryStates}
            setValue={setValue}
            getValues={getValues}
            control={control}
            label="State"
            name="state"
            register={register}
            errors={errors}
            hasError={hasStateError}
            firstErrorField={firstErrorField}
            disabled={
              dataLoading ||
              !!error ||
              !watchedCountry ||
              currentCountryStates.length === 0
            }
          />

          {/* Country Dropdown */}
          <DropdownInput
            data={formattedCountries}
            label="Country"
            name="country"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            control={control}
            hasError={hasCountryError}
            disabled={dataLoading || !!error}
            firstErrorField={firstErrorField}
            onCustomChange={handleCountryChange}
          />
        </div>
      </div>
    </div>
  );
};

// Custom comparison function(if Relevant Fields Change we Rerender)
const arePropsEqual = (prevProps, nextProps) => {
  const relevantErrorFields = [
    "phone",
    "phoneCountryCode",
    "email",
    "address",
    "zipCode",
    "city",
    "state",
    "country",
  ];

  const errorsChanged = relevantErrorFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    (relevantErrorFields.includes(prevProps.firstErrorField) ||
      relevantErrorFields.includes(nextProps.firstErrorField));

  return !errorsChanged && !firstErrorChanged;
};

export default React.memo(DriversContactInfo, arePropsEqual);
