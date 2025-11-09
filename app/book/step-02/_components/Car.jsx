"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import SecondaryButton from "@/components/custom/SecondaryButton";
import { format, set } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/custom/SmartImage";
import { useFormatPrice } from "@/app/_lib/formatPrice";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import {
  setAdditionalCharges,
  setFavorites,
  setReservation,
  setSelectedVehicle,
} from "@/store/slices/reservationSlice";
import { showSuccessToast } from "@/app/_lib/toast";

function Car({ car }) {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [booked, setBooked] = useState(false);
  const router = useRouter();
  const formatPrice = useFormatPrice();
  const favorites = useAppSelector((state) => state.reservation.favorites);

  useEffect(() => {
    if(Number(reservation?.vehicle_class_id) === car?.id){
      setBooked(true);
    }
  },[reservation])

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

  // Booking handler
  const handleBooking = async () => {
    setLoader(true);
    setBooked(false); // reset previous success state

    try {
      const requestData = {
        pick_up_date: reservation?.pick_up_date
          ? format(reservation.pick_up_date, "yyyy-MM-dd")
          : null,
        pick_up_time: reservation?.pick_up_time || null,
        return_date: reservation?.return_date
          ? format(reservation.return_date, "yyyy-MM-dd")
          : null,
        return_time: reservation?.return_time || null,
        pick_up_location: reservation?.pick_up_location?.id || null,
        return_location: reservation?.return_location?.id || null,
        brand_id: reservation?.brand_id ?? null,
        vehicle_class_id: car?.id,
      };

      const response = await hqApi.get(
        "car-rental/reservations/additional-charges",
        { params: requestData }
      );

      if (response?.status === 200) {
        dispatch(setReservation(response?.data?.reservation));
        dispatch(setAdditionalCharges(response?.data?.additional_charges));
        dispatch(setSelectedVehicle(response?.data?.selected_vehicle));
        setBooked(true);
        router.push(`/book/step-03?ssid=${currentUUID}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Card className="h-full relative py-3">
      <CardContent className="px-4">
        {/* Favorite button */}
        <div className="absolute top-4 right-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(car)}
            className="h-7 w-7 border border-cGray rounded-md"
            aria-label={
              favorites.includes(car.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-pressed={favorites.includes(car?.id)}
          >
            <Bookmark
              className={`h-6 w-6 ${
                favorites.includes(car?.id)
                  ? "fill-cSecondary text-cSecondary"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Recommended badge */}
        {car?.recommended && (
          <div className="absolute top-3 bg-[#2dbdb636] text-[12px] left-3 mb-2 rounded-md px-2 py-1 text-cSecondary">
            Top choice
          </div>
        )}

        {/* Car Image */}
        <div className="flex justify-center py-7">
          <SmartImage
            src={car?.image}
            width={230}
            height={100}
            alt={`${car?.id}`}
            fit="cover"
          />
        </div>

        {/* Car name */}
        <div className="flex justify-between items-center">
          <div className="text-left mb-4">
            <h3 className="font-semibold text-[18px] text-foreground">
              {car?.name}
            </h3>
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
                unoptimized
                priority
              />
              <span className="text-xs text-muted-foreground">{f?.label}</span>
            </div>
          ))}
        </div>

        {/* Price + Book button */}
        <div className="mt-2 flex justify-between items-start gap-3.5">
          {/* Price */}
          <div className="mb-4 w-full">
            <p className="text-[18px] lg:text-[22px] font-bold text-foreground">
              {formatPrice(car?.price?.daily_price)}
            </p>
            <p className="text-xs sm:text-[12px] text-muted-foreground">
              / Day
            </p>
          </div>

          {/* Booking Button */}
          <div className="flex flex-col w-full items-end">
            <SecondaryButton
              style={`h-12 lg:h-[47px] w-full hidden md:block ${
                loader
                  ? "opacity-70 cursor-wait"
                  : booked
                  ? "bg-cSecondary text-white"
                  : "bg-cPrimary"
              }`}
              content={loader ? "Booking..." : "Book Now"}
              onClick={!loader ? handleBooking : undefined}
            />
            <Button
              onClick={!loader ? handleBooking : undefined}
              className={`py-6 w-[160px] flex justify-center items-center md:hidden ${
                loader
                  ? "bg-cSecondary opacity-80 cursor-wait"
                  : booked
                  ? "bg-cSecondary"
                  : "bg-cPrimary"
              }`}
            >
              <span className="-mt-1">
                {loader ? "Booking..." : "Book Now"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Car;
