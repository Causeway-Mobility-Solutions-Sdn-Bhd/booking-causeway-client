import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import ErrorMessage from "@/components/custom/ErrorMessage";

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  label = "Date",
  error = false,
  disabledDateCondition = (date) => date > new Date(), // Default: disable future dates
  className = "",
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const handleDateSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  // Generate years from 90 years ago to 10 years ahead
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    // 90 years back to 10 years ahead
    for (let i = 90; i >= -10; i--) {
      years.push(currentYear - i);
    }

    return years;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full !h-11 flex items-center justify-between px-3 hover:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              error ? "border-red-500" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-light text-gray-500">{label}</span>
              <span className="text-sm">
                {value ? (
                  format(value, "dd/MM/yy")
                ) : (
                  <span className="text-gray-500">{placeholder}</span>
                )}
              </span>
            </div>
            <CalendarIcon className="h-4 w-4" style={{ color: "#2dbdb6" }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b flex gap-2">
            <Select
              value={calendarMonth.toString()}
              onValueChange={(value) => setCalendarMonth(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={calendarYear.toString()}
              onValueChange={(value) => setCalendarYear(parseInt(value))}
            >
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {generateYears().map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={disabledDateCondition}
            month={new Date(calendarYear, calendarMonth)}
            onMonthChange={(date) => {
              setCalendarMonth(date.getMonth());
              setCalendarYear(date.getFullYear());
            }}
            className="rounded-md border-0"
          />
        </PopoverContent>
      </Popover>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomDatePicker;
