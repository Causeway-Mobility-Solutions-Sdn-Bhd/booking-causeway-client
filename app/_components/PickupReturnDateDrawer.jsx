"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { format, subDays, parse } from "date-fns";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { FaRegCalendar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { showErrorToast } from "../_lib/toast";
import TimePickerDrawer from "@/components/custom/TimePickerDrawer";
import MultiMonthCalendar from "@/components/custom/MultiMonthCalendar";

function PickupReturnDateDrawer({ booking, setBooking }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("pickupDate");
  const [activeField, setActiveField] = useState("pickup");
  const [tempBooking, setTempBooking] = useState(booking);

  const handleConfirm = (pickupTime, returnTime) => {
    setIsTimeDialogOpen(false);
    setTempBooking((prev) => ({
      ...prev,
      pickupTime: pickupTime,
      returnTime: returnTime,
    }));
  };

  const handleTimeDialogOpen = (type) => {
    setIsTimeDialogOpen(true);
    setActiveField(type);
  };

  const handleTimeDialogCancel = () => {
    setIsTimeDialogOpen(false);
  };

  useEffect(() => {
    setTempBooking(booking);
    if (tempBooking?.pickupDate) {
      setCurrentStep("returnDate");
    }
  }, []);

  const handlePickupDateSelect = (date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    let updatedTime = tempBooking?.pickupTime;
    let updatedDate = date;

    if (isToday) {
      let nextHour;
      if (now.getHours() >= 0 && now.getHours() <= 7) {
        nextHour = 8;
      } else {
        nextHour = now.getHours() + 1;
      }

      if (nextHour >= 24) {
        showErrorToast("You can't select today's date, day has ended!");
        return;
      } else {
        updatedTime = `${nextHour.toString().padStart(2, "0")}:00`;
      }
    }

    setTempBooking((prev) => ({
      ...prev,
      pickupDate: updatedDate,
      pickupTime: updatedTime || prev.pickupTime, // fallback if not today
    }));

    setCurrentStep("returnDate");
  };

  const handleReturnDateSelect = (date) => {
    if (tempBooking?.returnDate) {
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      let updatedTime = tempBooking?.pickupTime;

      if (isToday) {
        let nextHour;
        if (now.getHours() >= 0 && now.getHours() <= 7) {
          nextHour = 8;
        } else {
          nextHour = now.getHours() + 1;
        }

        if (nextHour >= 24) {
          showErrorToast("You can't select today's date, day has ended!");
          return;
        } else {
          updatedTime = `${nextHour.toString().padStart(2, "0")}:00`;
          setTempBooking((prev) => ({
            ...prev,
            pickupDate: date,
            returnDate: null,
            pickupTime: updatedTime,
          }));
        }
      } else {
        setTempBooking((prev) => ({
          ...prev,
          pickupDate: date,
          returnDate: null,
        }));
      }

      setCurrentStep("pickupDate");
    } else {
      if (tempBooking.pickupDate && date <= tempBooking.pickupDate) {
        setTempBooking((prev) => ({
          ...prev,
          pickupDate: date,
          returnDate: tempBooking?.pickupDate,
        }));
      } else {
        setTempBooking((prev) => ({
          ...prev,
          returnDate: date,
        }));
      }
    }
  };

  const handleConfirmBooking = () => {
    if (getTotalBoookingTime() !== 0) {
      if (!tempBooking?.returnDate) {
        showErrorToast("Please Select Return Date and Time");
      } else {
        setIsDrawerOpen(false);
        setBooking(tempBooking);
        setTimeout(() => setCurrentStep("pickupDate"), 300);
      }
    } else {
      showErrorToast("Please Select Valid Pickup Date and Time");
    }
  };

  const combineDateAndTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  };

  const getButtonText = () => {
    const { pickupDate, pickupTime, returnDate, returnTime } = booking;
    const pickupDateTime = combineDateAndTime(pickupDate, pickupTime);
    const returnDateTime = combineDateAndTime(returnDate, returnTime);

    const pickupString = format(pickupDateTime, "dd MMM, h:mmaaa");
    const returnString = format(returnDateTime, "dd MMM, h:mmaaa");

    if (!pickupDate) {
      return "Select Pickup Date";
    }

    if (!returnDate) {
      return `${pickupString} - Select Return Date`;
    }

    return `${pickupString} - ${returnString}`;
  };

  const getDrawerTitle = () => {
    if (tempBooking?.pickupDate === null) {
      return "Select Pickup Date";
    } else {
      return "Select Return Date";
    }
  };

  const handleDrawerOpenChange = (open) => {
    setIsDrawerOpen(open);
    if (!open) {
      setIsTimeDialogOpen(false);
    } else {
      setTempBooking((prev) => ({
        ...prev,
        pickupDate: booking?.pickupDate,
        returnDate: booking?.returnDate,
      }));
    }
    if (!open) {
      setTimeout(() => setCurrentStep("pickupDate"), 300);
    }
  };

  function getTotalBoookingTime() {
    const pickupDateStr = tempBooking?.pickupDate;
    const returnDateStr = tempBooking?.returnDate;
    const pickupTimeStr = tempBooking?.pickupTime;
    const returnTimeStr = tempBooking?.returnTime;

    if (!pickupDateStr || !returnDateStr || !pickupTimeStr || !returnTimeStr) {
      return 0;
    }

    // Build full pickup datetime
    const [pickupHour, pickupMin] = pickupTimeStr.split(":").map(Number);
    const pickupDateTime = new Date(pickupDateStr);
    pickupDateTime.setHours(pickupHour, pickupMin, 0, 0);

    // Build full return datetime
    const [returnHour, returnMin] = returnTimeStr.split(":").map(Number);
    const returnDateTime = new Date(returnDateStr);
    returnDateTime.setHours(returnHour, returnMin, 0, 0);

    let diffMs = returnDateTime - pickupDateTime;

    if (diffMs <= 0) return 0;

    if (pickupDateStr === returnDateStr) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours.toString().padStart(2, "0")}:${diffMinutes
        .toString()
        .padStart(2, "0")} Hours`;
    }

    // Otherwise calculate total days (round up if leftover hours/minutes)
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const totalDays = Math.ceil(diffDays);

    return totalDays;
  }

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
        <div>
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-_R_9h5fdb_"
              className="flex text-left cursor-pointer justify-between items-center w-full border-1 border-cGrayLight rounded-lg py-2 px-3"
            >
              <div className="text-left">
                <p className="text-cGray text-[12px]">Pickup & Return Date</p>
                <h3 className="text-[14px] xsm:text-[16px]">
                  {getButtonText()}
                </h3>
              </div>
              <FaRegCalendar className="text-cSecondary text-[20px] sm:text-[25px]" />
            </button>
          </DrawerTrigger>
        </div>

        <DrawerContent className="h-[80vh] z-95">
          <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full py-1 px-[10px] mx-auto">
            <DrawerTitle className="text-lg text-center py-[8px] w-full">
              {getDrawerTitle()}
            </DrawerTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(false)}
              className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
            >
              <RxCross2 className="text-cSecondary text-[25px]" />
            </Button>
          </DrawerHeader>

          <div className="flex-1 overflow-hidden bg-cWhite">
            <MultiMonthCalendar
              selectedDate={
                currentStep === "pickupDate"
                  ? tempBooking?.pickupDate
                  : tempBooking?.returnDate
              }
              onDateSelect={
                !tempBooking?.pickupDate
                  ? handlePickupDateSelect
                  : handleReturnDateSelect
              }
              monthsToShow={8}
              minDate={
                subDays(new Date(), 1)
                // tempBooking?.pickupDate
                //   ? tempBooking?.pickupDate
                //   : subDays(new Date(), 1)
              }
              pickupDate={tempBooking?.pickupDate}
              returnDate={tempBooking?.returnDate}
            />
          </div>

          {tempBooking?.pickupDate && (
            <div className="px-4 py-2 border-b bg-muted/30">
              <div className="flex items-center justify-between text-sm">
                {tempBooking?.pickupDate && (
                  <div className={`text-left cursor-pointer`}>
                    <p>Pickup</p>
                    <h3 className="text-[16px] font-semibold mt-1">
                      {format(new Date(tempBooking?.pickupDate), "eee, d LLL")}
                    </h3>
                    <p
                      onClick={() => handleTimeDialogOpen("pickup")}
                      className="flex justify-start items-center gap-1"
                    >
                      <span>
                        {tempBooking?.returnTime &&
                          format(
                            parse(tempBooking.pickupTime, "HH:mm", new Date()),
                            "hh:mm a"
                          )}
                      </span>
                      <MdKeyboardArrowDown className="text-cSecondary text-[20px] sm:text-[30px]" />
                    </p>
                  </div>
                )}
                {tempBooking?.pickupDate && tempBooking?.returnDate && (
                  <div className="flex items-center gap-1 my-4">
                    <div className="flex-grow h-[2px] w-10 bg-slate-100"></div>
                    <div className="bg-slate-100 rounded-full px-3 py-2 text-sm font-medium">
                      {getTotalBoookingTime() <= 1
                        ? `${getTotalBoookingTime()} Days`
                        : `${getTotalBoookingTime()} Days`}
                    </div>
                    <div className="flex-grow h-[2px] w-10 bg-slate-100"></div>
                  </div>
                )}

                {tempBooking?.returnDate && (
                  <div className="text-right cursor-pointer">
                    <p>Return</p>
                    <h3 className="text-[16px] font-semibold mt-1">
                      {format(new Date(tempBooking?.returnDate), "eee, d LLL")}
                    </h3>
                    <p
                      onClick={() => handleTimeDialogOpen("return")}
                      className="flex justify-end items-center gap-1 cursor-pointer"
                    >
                      <MdKeyboardArrowDown className="text-cSecondary text-[20px] sm:text-[30px]" />
                      <span>
                        {tempBooking?.returnTime &&
                          format(
                            parse(tempBooking.returnTime, "HH:mm", new Date()),
                            "hh:mm a"
                          )}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={handleConfirmBooking}
                className="w-full h-12 mt-2 text-white bg-cPrimary font-semibold"
              >
                Confirm Date
              </Button>
            </div>
          )}

          <TimePickerDrawer
            pickupDate={tempBooking?.pickupDate}
            pickupTime={tempBooking?.pickupTime}
            returnTime={tempBooking?.returnTime}
            onConfirm={handleConfirm}
            onCancel={handleTimeDialogCancel}
            isOpen={isTimeDialogOpen}
            activeField={activeField}
            setActiveField={setActiveField}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PickupReturnDateDrawer;
