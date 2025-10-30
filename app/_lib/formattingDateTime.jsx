import { setMinutes, setSeconds, addHours, format, parse } from "date-fns";

export function roundTimeToCustomInterval(date) {
  const minutes = date.getMinutes();

  let roundedDate;

  if (minutes < 15) {
    roundedDate = setMinutes(date, 0);
  } else if (minutes < 45) {
    roundedDate = setMinutes(date, 30);
  } else {
    roundedDate = setMinutes(addHours(date, 1), 0);
  }

  return setSeconds(roundedDate, 0);
}

export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "EEE d MMM");
  } catch (error) {
    console.log("Date formatting error:", error);
    return dateString;
  }
};

// Format time function using date-fns
export const formatTime = (timeString) => {
  if (!timeString) return "";
  try {
    const time = parse(timeString, "HH:mm", new Date());
    return format(time, "haaa");
  } catch (error) {
    console.log("Time formatting error:", error);
    return timeString;
  }
};

export const formatTimeFromDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "HH:mm"); // 24-hour format, e.g. "14:30"
  } catch (error) {
    console.log("Time formatting error:", error);
    return "";
  }
};

export const formatTimeWithAmPm = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "hh:mm a");
  } catch (error) {
    console.log("Time formatting error:", error);
    return "";
  }
};
