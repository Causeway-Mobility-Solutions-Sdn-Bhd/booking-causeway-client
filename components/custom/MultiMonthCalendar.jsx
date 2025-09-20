"use client";
import { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isWeekend, isWithinInterval, isBefore, isAfter } from "date-fns";
import { cn } from "../../lib/utils";


function MultiMonthCalendar({ 
  selectedDate, 
  onDateSelect, 
  monthsToShow = 6,
  minDate,
  pickupDate,
  returnDate
}) {
  
  const [currentDate] = useState(new Date());

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const renderMonth = (monthOffset) => {
    const monthDate = addMonths(currentDate, monthOffset);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const firstDayOfMonth = monthStart.getDay();
    const mondayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    return (
      <div key={monthOffset} className="mb-3">
        <h3 className="text-lg font-semibold text-calendar-header mb-2 text-center">
          {format(monthDate, 'MMMM yyyy')}
        </h3>
        
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div
              key={day + index}
              className={cn(
                "h-4 w-full text-left flex items-center justify-center text-xs font-medium",
                index >= 5 ? "text-cPrimary" : "text-muted-foreground"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          
          {days.map((day) => {
            const isSelected = selectedDate && 
              day.toDateString() === selectedDate.toDateString();
            const isPickupDate = pickupDate && 
              day.toDateString() === pickupDate.toDateString();
            const isReturnDate = returnDate && 
              day.toDateString() === returnDate.toDateString();
            const isInRange = pickupDate && returnDate && 
              isWithinInterval(day, { start: pickupDate, end: returnDate }) &&
              !isPickupDate && !isReturnDate;
            const isCurrentMonth = isSameMonth(day, monthDate);
            const isWeekendDay = isWeekend(day);
            const isTodayDate = isToday(day);
            const isDisabled = minDate && day < minDate;
            const isSameDate = new Date(returnDate).toDateString() ===new Date(pickupDate).toDateString();
           return (
              <button
                key={day.toISOString()}
                onClick={() => !isDisabled && onDateSelect?.(day)}
                disabled={isDisabled}
                className={cn(
                  "mt-2 py-3 w-full z-20  text-sm font-medium transition-colors relative",
                  "hover:bg-calendar-day-hover",
                  isCurrentMonth
                    ? "text-calendar-day-foreground"
                    : "text-muted-foreground",
                  // Pickup date styling
                  isPickupDate && `bg-cSecondary relative ${(pickupDate && returnDate && !isSameDate ) && 'pickupDate'} text-calendar-day-selected-foreground rounded-md`,
                  // Return date styling  
                  isReturnDate && `bg-cSecondary relative ${(pickupDate && returnDate && !isSameDate ) && 'returnDate'} text-calendar-day-selected-foreground rounded-md`,
                  // Range styling
                  isInRange && "bg-[#2dbdb653] text-calendar-day-foreground rounded-none",
                  // Regular selected styling (for single date selection)
                  isSelected && !isPickupDate && !isReturnDate && "bg-calendar-day-selected text-calendar-day-selected-foreground rounded-md",
                  // Default styling
                  !isSelected && !isPickupDate && !isReturnDate && !isInRange && "bg-calendar-day rounded-md",
                  isTodayDate && !isSelected && !isPickupDate && !isReturnDate && "rounded-md border-cSecondary",
                  isWeekendDay && isCurrentMonth && !isPickupDate && !isReturnDate && "text-calendar-weekend",
                  isDisabled && "opacity-30 cursor-not-allowed hover:bg-calendar-day"
                )}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto  mt-2 pb-4">
      {Array.from({ length: monthsToShow }, (_, i) => renderMonth(i))}
      {
        pickupDate !== null && (
          <div className="h-[170px]" ></div>
        )
      }
    </div>
  );
}

export default MultiMonthCalendar