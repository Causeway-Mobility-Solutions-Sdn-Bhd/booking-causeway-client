// components/custom/DropdownInput.jsx
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ErrorMessage from "@/components/custom/ErrorMessage";

const DropdownInput = ({
  data,
  label,
  name,
  register,
  errors,
  setValue,
  watch,
  hasError = false,
  firstErrorField,
  disabled = false,
}) => {
  const selectedValue = watch(name);
  const error = errors[name];

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (value) => {
    setValue(name, value, { shouldValidate: true });
  };

  const getDisplayLabel = () => {
    const item = data.find((i) => i.value === selectedValue);
    if (!item) return `Select ${label}`;

    const text = item.label;

    if (windowWidth >= 500 && windowWidth < 600 && text.length > 15) {
      return text.substring(0, 17) + "...";
    }
    if (windowWidth >= 600 && windowWidth < 700 && text.length > 18) {
      return text.substring(0, 21) + "...";
    }
    if (windowWidth < 500 && text.length > 10) {
      return text.substring(0, 10) + "...";
    }
    return text;
  };
  const getPlaceholderText = () => {
    const placeholderText = `Select ${label}`;
    if (windowWidth < 400 && placeholderText.length >= 19) {
      return placeholderText.substring(0, 11) + "...";
    }
    if (windowWidth < 450 && placeholderText.length >= 19) {
      return placeholderText.substring(0, 13) + "...";
    }
    if (windowWidth < 500 && placeholderText.length >= 19) {
      return placeholderText.substring(0, 16) + "...";
    }

    return placeholderText;
  };
  return (
    <div>
      <Select
        value={selectedValue || ""}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={`w-full !h-11 border rounded-md px-3 hover:border-teal-500 transition-colors focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
            hasError ? "border-red-500" : "border-gray-200"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="flex flex-col h-full items-start justify-center w-full">
            <span className="text-gray-500 text-xs leading-tight">{label}</span>
            <span className="text-sm leading-tight text-left">
              <span className="text-sm leading-tight text-left">
                {selectedValue ? getDisplayLabel() : getPlaceholderText()}
              </span>
            </span>
          </div>
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.flag ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={`/flagicons/${item.flag}.svg`}
                    alt={`${item.label} flag`}
                    width={20}
                    height={20}
                  />
                  <span>{item.label}</span>
                </div>
              ) : (
                <span>{item.label}</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && firstErrorField === name && (
        <ErrorMessage message={error?.message} />
      )}
      <input
        type="hidden"
        {...register(name, {
          required: `${label} is required`,
        })}
      />
    </div>
  );
};

export default DropdownInput;
