"use client";
import React, { useEffect, useState } from "react";
import SelectedVehicleList from "./_components/SelectedVehicleList";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import TopBarFillter from "./_components/TopBarFillter";
import EditLocationDateDrawer from "../_components/EditLocationDateDrawer";
import hqApi from "@/lib/hqApi";
import { useAppSelector } from "@/store/hooks";

function page() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const vehicleLoader = useAppSelector(
    (state) => state.reservation.vehicleLoader
  );
  const selectedVehicleClasses = useAppSelector(
    (state) => state.reservation.selectedVehicleClasses
  );

  const [topBarFilter, setTobBarFilter] = useState({
    sortBy: "lowToHigh",
    carType: null,
    priceRange: [100, 900],
    seats: null,
    fuelType: null,
    connectivity: null,
    transmission: 0,
  });
  const [vehicleType, setVehicleType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVehcileType = await hqApi.get("/fleets/vehicle-types");
        setVehicleType(resVehcileType?.data);
      } catch (error) {
        console.log("Failed to fetch vehicle types:", error);
      }
    };

    fetchData(); // ✅ No `await` here
  }, []);

  useEffect(() => {
    setTobBarFilter({
      sortBy: "lowToHigh",
      carType: null,
      priceRange: [100, 900],
      seats: null,
      fuelType: null,
      connectivity: null,
      transmission: 0,
    });
  }, [reservation]);

  return (
    <div>
      <BookNavBar
        topBar={
          <TopBarFillter
            topBarFilter={topBarFilter}
            vehiTypes={vehicleType}
            setTobBarFilter={setTobBarFilter}
          />
        }
        child={
          <NavCenter
            reservation={reservation}
            setTobBarFilter={setTobBarFilter}
          />
        }
      />
      <div className="py-[20px] mt-[110px] sm:mt-[70px] sm:py-[30px] max-w-[1400px] mx-auto w-[90%] xxxsm:w-[87%] xsm:w-[90%] sm:w-[95%] ">
        {selectedVehicleClasses?.length > 0 && !vehicleLoader && (
          <h3 className="text-[17px] font-semibold">
            {selectedVehicleClasses?.length} vehicles available
          </h3>
        )}
        <div className="mt-[10px] flex justify-start items-start gap-5">
          <SelectedVehicleList />
          <SideBar
            topBarFilter={topBarFilter}
            setTobBarFilter={setTobBarFilter}
            vehiTypes={vehicleType}
            step={2}
          />
        </div>
      </div>
    </div>
  );
}

const NavCenter = ({ reservation, setTobBarFilter }) => {
  const [editLocDateOpen, setEditLocDateOpen] = useState();
  if (!reservation) return null;

  const cleanString = (str) =>
    str
      ?.replace(/\s{2,}/g, " ") // Remove extra spaces
      ?.replace(/ ,/g, ",") // Remove space before commas
      ?.replace(/Hotel/, "Hotel,") // Add comma after "Hotel"
      ?.trim()
      ?.split(/[^a-zA-Z0-9\s]/)[0] // ✅ Stop at first special character
      ?.slice(0, 14); // Limit to 14 characters

  const pickup = cleanString(reservation.pick_up_location?.name);
  const dropoff = cleanString(reservation.return_location?.name);

  const cleanLocation = [pickup, dropoff].filter(Boolean).join(" - ");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const pickupDateTime = `${formatDate(reservation.pick_up_date)}, ${formatTime(
    reservation.pick_up_time
  )}`;
  const returnDateTime = `${formatDate(reservation.return_date)}, ${formatTime(
    reservation.return_time
  )}`;

  return (
    <div className="text-sm w-full sm:text-base text-center leading-tight">
      <h3 className="font-semibold text-[15px] text-center">{cleanLocation}</h3>
      <p className="text-gray-500 text-[11px] flex justify-center items-center gap-1 text-center">
        <span>
          {pickupDateTime} – {returnDateTime}
        </span>
        <EditLocationDateDrawer
          reservation={reservation}
          isDrawerOpen={editLocDateOpen}
          setIsDrawerOpen={setEditLocDateOpen}
          setTobBarFilter={setTobBarFilter}
          isMid={false}
        />
      </p>
    </div>
  );
};

export default page;
