import React from "react";
import { Input } from "@/components/ui/input";
import { differenceInYears, format, isValid, parse } from "date-fns";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import ErrorMessage from "../../../../components/custom/ErrorMessage";
import { useWatch } from "react-hook-form";
import DropdownInput from "@/components/custom/DropdownInput";
import { useCountryData } from "@/hooks/useCountryData";

const DriverInformation = ({
  register,
  setValue,
  errors,

  firstErrorField,

  control,
}) => {
  const { countryCodes, loading: dataLoading, error } = useCountryData();

  const formattedCountries = React.useMemo(() => {
    if (!countryCodes) return [];
    return Object.entries(countryCodes).map(([isoCode, data]) => ({
      value: isoCode,
      label: data.n,
      flag: isoCode.toLowerCase(),
    }));
  }, [countryCodes]);

  const handleBirthDateChange = (date) => {
    setValue("birthDate", date ? format(date, "dd/MM/yy") : "", {
      shouldValidate: true,
    });
  };
  console.log(errors);
  console.log(firstErrorField);

  const dateString = useWatch({ name: "birthDate", control });

  const parseBirthDate = () => {
    if (!dateString) return null;
    try {
      return parse(dateString, "dd/MM/yy", new Date());
    } catch (e) {
      return null;
    }
  };

  console.log("RERENDERED");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Driver Information
      </h2>

      <div className="bg-white p-6 pb-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          <div>
            <Input
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets are allowed",
                },
              })}
              placeholder="First Name"
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {firstErrorField === "firstName" && errors.firstName && (
              <ErrorMessage message={errors.firstName.message} />
            )}
          </div>

          <div>
            <Input
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets are allowed",
                },
              })}
              placeholder="Last Name"
              className={`h-11 placeholder:font-light placeholder:text-sm border-gray-200 placeholder-gray-500 focus-visible:ring-teal-500 focus-visible:ring-2 hover:border-teal-500 transition-colors ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {firstErrorField === "lastName" && errors.lastName && (
              <ErrorMessage message={errors.lastName.message} />
            )}
          </div>

          <DropdownInput
            data={formattedCountries}
            label="Country of Origin"
            name="country"
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            hasError={!!errors.country}
            disabled={dataLoading || !!error}
            firstErrorField={firstErrorField}
          />

          <div>
            <CustomDatePicker
              value={parseBirthDate()}
              onChange={handleBirthDateChange}
              placeholder="DD/MM/YY"
              label="Birthday"
              error={!!errors.birthDate}
              errorMessage={
                firstErrorField === "birthDate" ? errors.birthDate?.message : ""
              }
            />
            <input
              type="hidden"
              {...register("birthDate", {
                required: "Birthday is required",
                validate: (value) => {
                  if (!value) return "Birthday is required";

                  const birthDate = parse(value, "dd/MM/yy", new Date());

                  if (!isValid(birthDate)) return "Invalid date";

                  const age = differenceInYears(new Date(), birthDate);

                  if (age < 23 || age > 75) {
                    return "Age must be between 23 and 75 years";
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DriverInformation, (prevProps, nextProps) => {
  const relevantFields = ["firstName", "lastName", "country", "birthDate"];

  const errorChanged = relevantFields.some(
    (field) => prevProps.errors[field] !== nextProps.errors[field]
  );

  const firstErrorChanged =
    prevProps.firstErrorField !== nextProps.firstErrorField &&
    relevantFields.includes(nextProps.firstErrorField);

  return !errorChanged && !firstErrorChanged;
});
