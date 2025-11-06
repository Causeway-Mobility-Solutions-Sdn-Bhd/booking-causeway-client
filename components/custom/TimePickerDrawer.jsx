import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "../ui/button";
import SecondaryButton from "./SecondaryButton";
import { showErrorToast } from "@/app/_lib/toast";

const TimePickerDrawer = ({
  pickupDate,
  pickupTime = "10:00",
  returnTime = "10:00",
  onConfirm = () => {},
  onCancel = () => {},
  isOpen = true,
  activeField = "pickup",
  setActiveField = () => {},
}) => {
  const [selectedPickupTime, setSelectedPickupTime] = useState(pickupTime);
  const [selectedReturnTime, setSelectedReturnTime] = useState(returnTime);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [tempHour, setTempHour] = useState(parseInt(pickupTime.split(":")[0]));
  const [tempMinute, setTempMinute] = useState(
    parseInt(pickupTime.split(":")[1])
  );
  const [isScrolling, setIsScrolling] = useState({
    hour: false,
    minute: false,
  });

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const hourScrollTimeout = useRef(null);
  const minuteScrollTimeout = useRef(null);

   const hours = Array.from({ length: 16 }, (_, i) => i + 8);

  const minutes = [0, 30];
  const itemHeight = 48;
  const paddingTop = 96; // py-24 padding

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 100);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 100);
    }
  }, [isOpen]);

  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const scrollToCenter = (container, index, itemHeight, smooth = true) => {
    if (container) {
      const containerHeight = container.clientHeight;
      const scrollTop =
        index * itemHeight + paddingTop - containerHeight / 2 + itemHeight / 2;
      container.scrollTo({
        top: scrollTop,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const snapToCenter = useCallback(
    (type) => {
      const container =
        type === "hour" ? hourScrollRef.current : minuteScrollRef.current;
      if (!container) return;

      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Calculate which item should be at the center
      const adjustedScrollTop =
        scrollTop + containerHeight / 2 - paddingTop - itemHeight / 2;
      const centerIndex = Math.round(adjustedScrollTop / itemHeight);

      // figure out min allowed hour
      const now = new Date();
      const isToday = pickupDate.toDateString() === now.toDateString();
      const minAllowedHour =
        isToday && activeField === "pickup"
          ? Math.max(8, now.getHours() + 1)
          : 8;

      if (type === "hour") {
        const minIndex = hours.indexOf(minAllowedHour);
        const boundedIndex = Math.max(
          minIndex >= 0 ? minIndex : 0,
          Math.min(hours.length - 1, centerIndex)
        );

        const newHour = hours[boundedIndex];

        if (newHour !== tempHour) {
          setTempHour(newHour);
          // If hour is 11, force minute to be 0
          if (newHour === 23 && tempMinute === 30) {
            setTempMinute(0);
            scrollToCenter(minuteScrollRef.current, 0, itemHeight, true);
          }
        }
        scrollToCenter(container, boundedIndex, itemHeight, true);
      } else {
        const boundedIndex = Math.max(
          0,
          Math.min(minutes.length - 1, centerIndex)
        );
        const newMinute = minutes[boundedIndex];
        
        // Prevent selecting 11:30
        if (tempHour === 23 && newMinute === 30) {
          setTempMinute(0);
          scrollToCenter(minuteScrollRef.current, 0, itemHeight, true);
        } else if (newMinute !== tempMinute) {
          setTempMinute(newMinute);
        }
        scrollToCenter(container, boundedIndex, itemHeight, true);
      }

      setTimeout(() => {
        setIsScrolling((prev) => ({ ...prev, [type]: false }));
      }, 300);
    },
    [hours, minutes, tempHour, tempMinute, activeField, pickupDate]
  );

  // Handle scroll with smoother debouncing
  const handleScroll = (type) => {
    const timeoutRef =
      type === "hour" ? hourScrollTimeout : minuteScrollTimeout;

    // Set scrolling state for visual feedback
    setIsScrolling((prev) => ({ ...prev, [type]: true }));

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reduced timeout for quicker, smoother response
    timeoutRef.current = setTimeout(() => {
      snapToCenter(type);
    }, 50);
  };

  // Initial setup and field switching - Fixed to ensure proper centering
  useEffect(() => {
    if (!isVisible) return;

    setTimeout(() => {
      if (activeField === "pickup") {
        const [hour, minute] = pickupTime.split(":").map(Number);
        setTempHour(hour);
        setTempMinute(minute);
        const hourIndex = hours.indexOf(hour);
        scrollToCenter(
          hourScrollRef.current,
          hourIndex >= 0 ? hourIndex : 0,
          itemHeight,
          false
        );
        const minuteIndex = minutes.indexOf(minute);
        scrollToCenter(
          minuteScrollRef.current,
          minuteIndex >= 0 ? minuteIndex : 0,
          itemHeight,
          false
        );
      } else {
        const [hour, minute] = pickupTime.split(":").map(Number);
        setTempHour(hour);
        setTempMinute(minute);
        const hourIndex = hours.indexOf(hour);
        scrollToCenter(
          hourScrollRef.current,
          hourIndex >= 0 ? hourIndex : 0,
          itemHeight,
          false
        );
        const minuteIndex = minutes.indexOf(minute);
        scrollToCenter(
          minuteScrollRef.current,
          minuteIndex >= 0 ? minuteIndex : 0,
          itemHeight,
          false
        );
      }
    }, 150); // Slightly longer delay to ensure DOM is ready
  }, [activeField, pickupTime, returnTime, isVisible]);

  const handleFieldSwitch = (field) => {
    const currentTime = formatTime(tempHour, tempMinute);
    if (activeField === "pickup") {
      setSelectedPickupTime(currentTime);
    } else {
      setSelectedReturnTime(currentTime);
    }
    setActiveField(field);
  };

  const handleItemClick = (type, value) => {
    if (type === "hour") {
      setTempHour(value);
      const hourIndex = hours.indexOf(value);
      scrollToCenter(
        hourScrollRef.current,
        hourIndex >= 0 ? hourIndex : 0,
        itemHeight,
        true
      );

      if (value === 23 && tempMinute === 30) {
        setTempMinute(0);
        scrollToCenter(minuteScrollRef.current, 0, itemHeight, true);
      }
    } else {
      // Prevent selecting 30 minutes when hour is 11
      if (tempHour === 23 && value === 30) {
        showErrorToast("23:30 is not available. Maximum time is 23:00.");
        return;
      }
      setTempMinute(value);
      const minuteIndex = minutes.indexOf(value);
      scrollToCenter(minuteScrollRef.current, minuteIndex, itemHeight, true);
    }
  };

  // Calculate proximity to center for smooth scaling effect
  const getItemStyle = (type, value, currentValue) => {
    const isSelected = value === currentValue;
    const isScrollingType = isScrolling[type];

    if (isSelected) {
      return {
        transform: isScrollingType ? "scale(1.05)" : "scale(1.1)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }

    return {
      transform: "scale(1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const handleConfirm = () => {
    const currentTime = formatTime(tempHour, tempMinute);
    if (activeField === "pickup") {
      setSelectedPickupTime(currentTime);
      onConfirm?.(currentTime, selectedReturnTime);
    } else {
      setSelectedReturnTime(currentTime);
      onConfirm?.(selectedPickupTime, currentTime);
    }
  };

  const handleClose = () => {
    onCancel?.();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isOpen && !isAnimating ? "bg-black/50" : "bg-black/0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transform transition-transform duration-300 ease-out ${
          isOpen && !isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex w-full justify-between items-start">
            {/* Pickup Time */}
            <div className="flex flex-col text-left">
              <span className="text-sm text-gray-500 mb-1">Pick-up time</span>
              <button
                onClick={() => handleFieldSwitch("pickup")}
                className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 ease-out hover:scale-105 ${
                  activeField === "pickup" ? "text-black" : "text-gray-400"
                }`}
              >
                {activeField === "pickup"
                  ? formatTime(tempHour, tempMinute)
                  : selectedPickupTime}
                <ChevronUp
                  className={`w-4 h-4 text-cSecondary transition-transform duration-200 ${
                    activeField === "pickup" ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>

            {/* Drop-off Time */}
            <div className="flex flex-col text-right justify-end">
              <span className="text-sm text-gray-500 mb-1 text-right">
                Drop-off time
              </span>
              <button
                onClick={() => handleFieldSwitch("return")}
                className={`flex items-center justify-end gap-2 text-right text-lg font-medium transition-all duration-300 ease-out hover:scale-105 ${
                  activeField === "return" ? "text-black" : "text-gray-400"
                }`}
              >
                {activeField === "return"
                  ? formatTime(tempHour, tempMinute)
                  : selectedReturnTime}
                <ChevronDown
                  className={`w-4 h-4 text-cSecondary transition-transform duration-200 ${
                    activeField === "return" ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Time Picker Wheels */}
        <div className="flex justify-center items-center gap-8 mb-6">
          {/* Hours */}
          <div className="relative">
            <div
              ref={hourScrollRef}
              className="h-56 w-16 overflow-y-auto overflow-x-hidden scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbarWidth: "none",
              }}
              onScroll={() => handleScroll("hour")}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="py-24">
                {hours.map((hour) => {
                  const now = new Date();
                  const isToday =
                    pickupDate.toDateString() === now.toDateString();
                  const minAllowedHour =
                    isToday && activeField === "pickup"
                      ? Math.max(8, now.getHours() + 1)
                      : 8;

                  const isPastHour = hour < minAllowedHour;

                  return (
                    <div
                      key={hour}
                      className={`h-12 flex items-center justify-center text-xl transition-all duration-300 ease-out
        ${
          isPastHour
            ? "text-red-300 cursor-not-allowed"
            : tempHour === hour
            ? "text-black font-semibold cursor-pointer"
            : "text-gray-300 hover:text-gray-500 cursor-pointer"
        }`}
                      style={getItemStyle("hour", hour, tempHour)}
                      onClick={() => {
                        if (isPastHour) {
                          showErrorToast(
                            `You cannot select ${hour}:00 as it is in the past.`
                          );
                          return;
                        }
                        handleItemClick("hour", hour);
                      }}
                    >
                      {hour.toString().padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Center selection indicator with smooth transitions */}
            <div className="absolute top-1/2 left-0 right-0 h-12 pointer-events-none transform -translate-y-1/2">
              <div
                className={`w-full h-full border-t border-b transition-all duration-200 ${
                  isScrolling.hour
                    ? "border-cSecondary/40 bg-[#2dbdb60e]"
                    : "border-gray-200 bg-gray-50/30"
                }`}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="text-3xl font-light text-cSecondary animate-pulse">
            :
          </div>

          {/* Minutes */}
          <div className="relative">
            <div
              ref={minuteScrollRef}
              className="h-56 w-16 overflow-y-auto overflow-x-hidden scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbarWidth: "none",
              }}
              onScroll={() => handleScroll("minute")}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="py-24">
                {minutes.map((minute) => {
                  // Disable 30 minutes when hour is 11
                  const isDisabled = tempHour === 23 && minute === 30;
                  
                  return (
                    <div
                      key={minute}
                      className={`h-12 flex items-center justify-center text-xl transition-all duration-300 ease-out ${
                        isDisabled
                          ? "text-red-300 cursor-not-allowed"
                          : tempMinute === minute
                          ? "text-black font-semibold cursor-pointer"
                          : "text-gray-300 hover:text-gray-500 cursor-pointer"
                      }`}
                      style={getItemStyle("minute", minute, tempMinute)}
                      onClick={() => handleItemClick("minute", minute)}
                    >
                      {minute.toString().padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Center selection indicator with smooth transitions */}
            <div className="absolute top-1/2 left-0 right-0 h-12 pointer-events-none transform -translate-y-1/2">
              <div
                className={`w-full h-full border-t border-b transition-all duration-200 ${
                  isScrolling.minute
                    ? "border-cSecondary/40 bg-[#2dbdb60e]"
                    : "border-gray-200 bg-gray-50/30"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mb-6">
          <div className="text-xs text-gray-500 flex items-start justify-center gap-1">
            <Info size={14} className="text-gray-400" />
            <span>
              All times are in the destination's local time. Period of less than
              24 hours is counted as 1 day
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between items-center">
          <SecondaryButton
            content={"Cancel"}
            style={"basis-1/2 h-12"}
            onClick={handleClose}
          />
          <Button
            className="w-full h-12 basis-1/2 text-white bg-cPrimary font-semibold "
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerDrawer;