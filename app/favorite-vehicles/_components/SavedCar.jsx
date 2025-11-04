"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SmartImage from "@/components/custom/SmartImage";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useDispatch } from "react-redux";
import {
  setAdditionalCharges,
  setReservation,
  setSelectedVehicle,
  setSelectedVehicleClasses,
} from "@/store/slices/reservationSlice";
import Spinner from "@/components/custom/Spinner";

function SavedCar({ car }) {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const bookNow = async () => {
    setLoader(true);
    try {
      const requestData = {
        pick_up_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        pick_up_time: "10:00",
        return_date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
        return_time: "10:00",
        pick_up_location: 1,
        return_location: 1,
        brand_id: 1,
        vehicle_class_id: car?.id,
        sort_by: "lowToHigh",
        isCreate: true,
        isEdit: false,
      };

      const response = await hqApi.post(
        "car-rental/reservations/dates",
        requestData
      );

      if (response?.status == 200) {
        if (response?.data?.VehicleClasses?.length > 0) {
          const reservation = response?.data?.reservation;
          const sessionIDNew = reservation?._id;

          dispatch(setSelectedVehicleClasses(response?.data?.VehicleClasses));

          const responseAdditionCharges = await hqApi.get(
            "car-rental/reservations/additional-charges",
            { params: requestData }
          );

          if (response?.status === 200) {
            dispatch(
              setReservation(responseAdditionCharges?.data?.reservation)
            );
            dispatch(
              setAdditionalCharges(
                responseAdditionCharges?.data?.additional_charges
              )
            );
            dispatch(
              setSelectedVehicle(
                responseAdditionCharges?.data?.selected_vehicle
              )
            );
            setLoader(false);
            router.push(`/book/step-03?ssid=${sessionIDNew}`);
          } else {
            setLoader(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <Card className="h-full relative py-3">
      <CardContent className="px-4">
        {car?.recommended && (
          <div className="absolute top-3 left-3 bg-[#2dbdb636] text-[12px] rounded-md px-2 py-1 text-cSecondary">
            Top choice
          </div>
        )}

        <div className="flex justify-center py-6">
          <SmartImage
            src={car?.image}
            width={230}
            height={100}
            alt={car?.name || "Vehicle"}
            fit="cover"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="font-semibold text-[18px] text-foreground">
            {car?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {car?.brand} {car?.type && `• ${car?.type}`}
          </p>
        </div>

        {car?.features?.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            {car.features.map((f) => (
              <div
                key={f?.id}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={f?.image}
                  alt={f?.label}
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="text-xs text-muted-foreground mt-1">
                  {f?.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-start gap-3.5">
          <div className="flex flex-col w-full items-end">
            <Button
              onClick={() => bookNow()}
              className="w-full h-10 sm:h-12 cursor-pointer bg-cPrimary  text-white font-semibold"
            >
              {loader ? (
                <Spinner size={20} color="#fff" thickness={3} />
              ) : (
                <>
                  <span className="-mt-1">Book</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SavedCar;
