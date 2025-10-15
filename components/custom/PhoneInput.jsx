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
import { Tooltip } from "./InputInfoTooltip";
import { useWatch } from "react-hook-form";

const PhoneInput = ({
  register,
  errors,
  name = "phone",
  setValue,
  firstErrorField,
  control,
  className = "",
  required = true,
  instructions = false,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+60");
  const [selectedCountryIso, setSelectedCountryIso] = useState("MY");

  const { countryCodes, loading: dataLoading, error } = useCountryData();

  const hasPhoneError = !!errors[name];
  const hasCountryCodeError = !!errors[`${name}CountryCode`];

  const countryPhoneCodes = countryCodes
    ? Object.entries(countryCodes).map(([iso2, data]) => ({
        code: data.c,
        country: data.n,
        iso2: iso2.toLowerCase(),
      }))
    : [];
  const currentCountryCode = useWatch({
    control,
    name: `${name}CountryCode`,
  });

  useEffect(() => {
    if (!dataLoading && countryCodes) {
      if (currentCountryCode) {
        if (currentCountryCode !== selectedCountryCode) {
          setSelectedCountryCode(currentCountryCode);
          const country = countryPhoneCodes.find(
            (c) => c.code === currentCountryCode
          );
          if (country) {
            setSelectedCountryIso(country.iso2);
          }
        }
      } else {
        setValue(`${name}CountryCode`, selectedCountryCode, {
          shouldValidate: false,
        });
      }
    }
  }, [dataLoading, countryCodes, currentCountryCode, countryPhoneCodes]);

  const handleCountryCodeChange = (value) => {
    const [code, iso] = value.split("|");
    setSelectedCountryCode(code);
    setSelectedCountryIso(iso);
    setValue(`${name}CountryCode`, code, { shouldValidate: false });
  };

  const validationRules = required
    ? {
        required: "Phone number is required",
        pattern: {
          value: /^[\d]{7,15}$/,
          message: "Please enter a valid phone number",
        },
      }
    : {
        pattern: {
          value: /^[\d]{7,15}$/,
          message: "Please enter a valid phone number",
        },
      };

  return (
    <div className={`${className} relative`}>
      <div
        className={`!h-11 flex items-center w-full border rounded-md hover:border-teal-500 transition-colors focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent overflow-hidden ${
          hasPhoneError || hasCountryCodeError
            ? "border-red-500"
            : "border-gray-200"
        } ${className}`}
      >
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

        <input
          {...register(name, {
            ...validationRules,
            onChange: (e) => {
              e.target.value = e.target.value.replace(/[^\d]/g, "");
            },
          })}
          type="tel"
          placeholder="Mobile Number"
          className={`flex-1 h-10 border-0 px-3 placeholder-gray-500 placeholder:font-light placeholder:text-sm focus:outline-none focus:ring-0 bg-transparent ${
            dataLoading ? "opacity-50" : ""
          }`}
          disabled={dataLoading || !!error}
        />
      </div>
      {instructions && (
        <div className="z-5 absolute right-3 top-6 -translate-y-1/2">
          <Tooltip
            message="Provide your active phone number in the correct format, including country code."
            title="Instructions"
          />
        </div>
      )}
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
        {...register(
          `${name}CountryCode`,
          required
            ? {
                required: "Country code is required",
              }
            : {}
        )}
      />
    </div>
  );
};

export default PhoneInput;
