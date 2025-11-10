"use client";
import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import SmartImage from "./SmartImage";
import { addDays, format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useDispatch } from "react-redux";
import {
  setAdditionalCharges,
  setFavorites,
  setReservation,
  setSelectedVehicle,
  setSelectedVehicleClasses,
} from "@/store/slices/reservationSlice";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { useAppSelector } from "@/store/hooks";
import { showSuccessToast } from "@/app/_lib/toast";

function Car({ car }) {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const favorites = useAppSelector((state) => state.reservation.favorites);

  const toggleFavorite = (vc) => {
    const prev = Array.isArray(favorites) ? favorites : [];

    const updated = prev.includes(vc?.id)
      ? prev.filter((id) => id !== vc?.id)
      : [...prev, vc?.id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    dispatch(setFavorites(updated));
    showSuccessToast(
      `${vc?.name} has been ${
        updated.includes(vc?.id) ? "added to" : "removed from"
      } favorites.`
    );
  };

  const fetchData = async (car) => {
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
        vehicle_class_id: car?.vehicle_class?.id,
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

          localStorage.setItem("ssid", sessionIDNew);
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
    <Card className="h-full relative">
      <CardContent className="px-4">
        <div className="absolute top-4 right-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(car?.vehicle_class)}
            className="h-7 w-7 border border-cGray rounded-md"
            aria-label={
              favorites.includes(car.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-pressed={favorites.includes(car?.vehicle_class?.i)}
          >
            <Bookmark
              className={`h-6 w-6 ${
                favorites.includes(car?.vehicle_class?.id)
                  ? "fill-cSecondary text-cSecondary"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Car Image */}
        <div className="flex justify-center py-7">
          <SmartImage
            src={car?.vehicle_class?.public_image}
            width={230}
            height={100}
            alt={`${car?.name} ${car?.model}`}
          />
        </div>

        <div className="flex justify-between items-center">
          {/* Car Info */}
          <div className="text-left mb-4">
            <h3 className="font-semibold text-lg text-foreground">
              {car?.vehicle_brand?.name.length > 7
                ? car.vehicle_brand?.name.slice(0, 7) + "..."
                : car?.vehicle_brand?.name}
            </h3>
            <p className="text-xs sm:text-sm text-left text-muted-foreground">
              {car?.vehicle_class?.name?.length > 10
                ? car.vehicle_class.name.slice(0, 10) + "..."
                : car?.vehicle_class?.name}
            </p>
          </div>

          {/* Price */}
          <div className="text-right mb-4">
            <p className="text-[17px] lg:text-2xl font-bold text-foreground">
              RM{" "}
              {car?.price?.amount
                ? parseFloat(car.price.amount).toFixed(0)
                : "0"}
            </p>
            <p className="text-xs sm:text-sm text-right text-muted-foreground ml-1">
              / Day
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {car?.features?.map((f) => (
            <div key={f?.id} className="flex flex-col items-center text-center">
              <Image
                src={f?.images[0]?.public_link}
                alt={`${f?.id}`}
                className="h-full w-[20px] object-contain"
                width={200}
                height={70}
                loading="lazy"
              />
              <span className="text-xs text-muted-foreground">
                {[1, 2].includes(f?.id) ? f?.label?.split(" ")[0] : f?.label}
              </span>
            </div>
          ))}
        </div>

        {/* Book Button */}
        <Button
          onClick={() => fetchData(car)}
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
      </CardContent>
    </Card>
  );
}

export default Car;
