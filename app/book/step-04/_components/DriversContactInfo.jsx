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
  // Use the dynamic country data hook
  const {
    countryCodes,
    countryStates,
    loading: dataLoading,
    error,
  } = useCountryData();

  // Watch the country field for changes
  const watchedCountry = useWatch({
    control,
    name: "country",
    defaultValue: "",
  });

  // Check if fields have errors
  const hasEmailError = !!errors.email;
  const hasAddressError = !!errors.address;
  const hasZipCodeError = !!errors.zipCode;
  const hasCityError = !!errors.city;
  const hasStateError = !!errors.state;
  const hasCountryError = !!errors.country;

  // Force re-render state for dropdowns
  const [, forceUpdate] = React.useState({});

  // Memoize formatted countries
  const formattedCountries = useMemo(() => {
    if (!countryCodes) return [];
    return Object.entries(countryCodes).map(([isoCode, data]) => ({
      value: isoCode,
      label: data.n,
      flag: isoCode.toLowerCase(),
    }));
  }, [countryCodes]);

  // Memoize getStatesForCountry function
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

  // Memoize current country states - now using watchedCountry
  const currentCountryStates = useMemo(() => {
    return getStatesForCountry(watchedCountry);
  }, [watchedCountry, getStatesForCountry]);

  // Memoize handler for country change
  const handleCountryChange = useCallback(
    (value) => {
      // Get states for the newly selected country FIRST
      const states = getStatesForCountry(value);

      // Set state value BEFORE setting country to prevent Shadcn from clearing it
      if (states.length > 0) {
        // Always set to first state when country changes
        setValue("state", states[0].value, { shouldValidate: false });
      } else {
        // Clear state if no states available for this country
        setValue("state", "", { shouldValidate: false });
      }

      // Now set the country value
      setValue("country", value, { shouldValidate: false });

      // Force re-render to update the UI
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

// Custom comparison function for React.memo
const arePropsEqual = (prevProps, nextProps) => {
  // Only re-render if errors for THIS component's fields change
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

  // Check if any relevant error changed
  const errorsChanged = relevantErrorFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  // Check if firstErrorField changed and it's relevant to this component
  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    (relevantErrorFields.includes(prevProps.firstErrorField) ||
      relevantErrorFields.includes(nextProps.firstErrorField));

  // Re-render if errors changed OR firstErrorField changed for this component
  return !errorsChanged && !firstErrorChanged;
};

export default React.memo(DriversContactInfo, arePropsEqual);
