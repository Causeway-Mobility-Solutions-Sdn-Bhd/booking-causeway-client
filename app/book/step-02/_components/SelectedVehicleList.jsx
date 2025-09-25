"use client";
import hqApi from "@/lib/hqApi";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Car from "./Car";
import { BookCarCardSkeleton } from "@/components/custom/Skeleton";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setSelectedVehicleClasses , setVehicleLoader } from "@/store/slices/reservationSlice";

function SelectedVehicleList() {
  const searchParams = useSearchParams();
  const ssid = searchParams.get("ssid");

  const reservation = useAppSelector((state) => state.reservation.reservation);
  const vehicleLoader = useAppSelector((state) => state.reservation.vehicleLoader);
  const selectedVehicleClasses = useAppSelector((state) => state.reservation.selectedVehicleClasses);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setVehicleLoader(true))

      try {
        if (reservation && selectedVehicleClasses?.length === 0) {
          const requestData = {
            pick_up_date: reservation?.pick_up_date
              ? format(reservation?.pick_up_date, "yyyy-MM-dd")
              : null,
            pick_up_time: reservation?.pick_up_time || null,
            return_date: reservation?.return_date
              ? format(reservation?.return_date, "yyyy-MM-dd")
              : null,
            return_time: reservation?.return_time || null,
            pick_up_location: reservation?.pick_up_location?.id || null,
            return_location: reservation?.return_location?.id || null,
            brand_id: reservation?.brand_id ?? null,
            isCreate : false,
            sort_by: "lowToHigh",
          };

          const response = await hqApi.post(
            "car-rental/reservations/dates",
            requestData
          );

          if (response?.status == 200) {
            if (response?.data?.VehicleClasses?.length > 0) {
              dispatch(setSelectedVehicleClasses(response?.data?.VehicleClasses))
              
            }
            dispatch(setVehicleLoader(false))
          }
        } else {
           dispatch(setVehicleLoader(false))
        }
      } catch (error) {
        console.log("Failed to parse JSON from localStorage:", error);
      }
    };
    fetchData();
  }, [ssid]);

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {vehicleLoader ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <BookCarCardSkeleton key={index} />
          ))}
        </>
      ) : selectedVehicleClasses?.length === 0 ? (
        <div>
          <h1>Not Found</h1>
        </div>
      ) : (
        selectedVehicleClasses?.map((car) => <Car key={car?.id} car={car} />)
      )}
    </div>
  );
}

export default SelectedVehicleList;
