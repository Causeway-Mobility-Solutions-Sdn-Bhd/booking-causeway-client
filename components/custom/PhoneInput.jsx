import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useCountryData } from "@/hooks/useCountryData";
import ErrorMessage from "@/components/custom/ErrorMessage";

const PhoneInput = ({
  register,
  errors,
  name = "phone",
  setValue,
  watch,
  firstErrorField,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+60"); // Default Malaysia
  const [selectedCountryIso, setSelectedCountryIso] = useState("MY"); // Default Malaysia ISO

  // Use the dynamic country data hook
  const { countryCodes, loading: dataLoading, error } = useCountryData();

  // Get current phone value from form
  const phoneValue = watch(name);
  const countryCodeValue = watch(`${name}CountryCode`);

  // Check if fields have errors
  const hasPhoneError = !!errors[name];
  const hasCountryCodeError = !!errors[`${name}CountryCode`];

  // Process country codes from the structure: { AD: {c: '+376', n: 'Andorra'}, ... }
  const countryPhoneCodes = countryCodes
    ? Object.entries(countryCodes).map(([iso2, data]) => ({
        code: data.c,
        country: data.n,
        iso2: iso2.toLowerCase(),
      }))
    : [];

  // Initialize country code in form on component mount
  useEffect(() => {
    if (!countryCodeValue && !dataLoading) {
      setValue(`${name}CountryCode`, selectedCountryCode, {
        shouldValidate: false,
      });
    }
  }, [dataLoading, countryCodeValue, name, selectedCountryCode, setValue]);

  const handleCountryCodeChange = (value) => {
    // Extract the country code and ISO from the combined value
    const [code, iso] = value.split("|");
    setSelectedCountryCode(code);
    setSelectedCountryIso(iso);

    setValue(`${name}CountryCode`, code, { shouldValidate: true });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <div>
      <div
        className={`!h-11 flex items-center w-full border rounded-md hover:border-teal-500 transition-colors focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent overflow-hidden ${
          hasPhoneError || hasCountryCodeError
            ? "border-red-500"
            : "border-gray-200"
        }`}
      >
        {/* Country Code Dropdown */}
        <Select
          value={`${selectedCountryCode}|${selectedCountryIso}`}
          onValueChange={handleCountryCodeChange}
          disabled={dataLoading || !!error}
        >
          <SelectTrigger
            className={`w-[80px] border-0 rounded-none bg-transparent focus:ring-0 focus:ring-offset-0 h-10 px-3 ${
              hasCountryCodeError ? "text-red-500" : ""
            } ${dataLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span>{selectedCountryCode}</span>
          </SelectTrigger>

          <SelectContent className="w-[250px]">
            {countryPhoneCodes.map((country) => (
              <SelectItem
                key={`${country.iso2}-${country.code}`}
                value={`${country.code}|${country.iso2}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/flagicons/${country.iso2}.svg`}
                    alt={`${country.country} flag`}
                    width={20}
                    height={20}
                  />
                  <span>{country.code}</span>
                  <span className="text-gray-500 text-sm">
                    {country.country}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Mobile Number Input */}
        <input
          {...register(name, {
            required: "Phone number is required",
            pattern: {
              value: /^[\d]{7,15}$/,
              message: "Please enter a valid phone number",
            },
          })}
          type="tel"
          value={phoneValue || ""}
          onChange={handlePhoneChange}
          placeholder="Mobile Number"
          className={`flex-1 h-10 border-0 px-3 placeholder-gray-500 placeholder:font-light placeholder:text-sm focus:outline-none focus:ring-0 bg-transparent ${
            dataLoading ? "opacity-50" : ""
          }`}
          disabled={dataLoading || !!error}
        />
      </div>

      {(hasPhoneError || hasCountryCodeError) && firstErrorField === name && (
        <ErrorMessage
          message={
            hasPhoneError
              ? errors[name].message
              : errors[`${name}CountryCode`].message
          }
        />
      )}

      <input
        type="hidden"
        {...register(`${name}CountryCode`, {
          required: "Country code is required",
        })}
      />
    </div>
  );
};

export default PhoneInput;
