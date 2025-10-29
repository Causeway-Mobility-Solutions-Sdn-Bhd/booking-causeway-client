"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { Button } from "@/components/ui/button";
import hqApi from "@/lib/hqApi";
import Spinner from "@/components/custom/Spinner";
import { addDays, format } from "date-fns";
import AnimatedTransparentGuarantee from "@/components/custom/AnimatedTransparentGuarantee";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setReservation,
  setSelectedVehicleClasses,
} from "@/store/slices/reservationSlice";
import PickupReturnLocationDrawer from "@/app/_components/PickupReturnLocationDrawer";
import PickupReturnDateDrawer from "@/app/_components/PickupReturnDateDrawer";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import SaveBottomBar from "@/app/_components/SaveBottomBar";

function SearchFillter({
  setIsDrawerOpenSecondary = () => {},
  type = "",
  reservation = null,
  handleReset = () => {},
  isMid = false,
  manage = false,
}) {
  const [bookingDates, setBookingDates] = useState({
    pickupDate: reservation?.pick_up_date
      ? new Date(reservation?.pick_up_date)
      : addDays(new Date(), 1),
    returnDate: reservation?.return_date
      ? new Date(reservation?.return_date)
      : addDays(new Date(), 2),
    returnTime: reservation?.return_time
      ? reservation?.return_time
      : format(new Date(0, 0, 0, 10, 0), "HH:mm"),
    pickupTime: reservation?.pick_up_time
      ? reservation?.pick_up_time
      : format(new Date(0, 0, 0, 10, 0), "HH:mm"),
  });

  const [bookingLocation, setBookingLocation] = useState({
    pickupLocation: reservation?.pick_up_location
      ? reservation?.pick_up_location?.id
      : 1,
    returnLocation: reservation?.return_location
      ? reservation?.return_location?.id
      : 1,
    pickupLocationName: reservation?.pick_up_location
      ? reservation?.pick_up_location?.name
      : "Causeway Hub - Johor Bahru",
    returnLocationName: reservation?.return_location
      ? reservation?.return_location?.name
      : "Causeway Hub - Johor Bahru",
    brandId: reservation?.brand_id ? reservation?.brand_id : 1,
  });

  const dispatch = useAppDispatch();
  const [isDifferentReturnLocation, setIsDifferentReturnLocation] =
    useState(false);

  const loggedUser = useAppSelector((state) => state.auth.loggedUser);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log(reservation);

  const handleBookingSearch = async () => {
    console.log("CLICK");

    try {
      setLoader(true);

      const reservationSSID = pathname.split("/").pop();
      const requestData = {
        pick_up_date: bookingDates.pickupDate
          ? format(bookingDates.pickupDate, "yyyy-MM-dd")
          : null,
        pick_up_time: bookingDates.pickupTime || null,
        return_date: bookingDates.returnDate
          ? format(bookingDates.returnDate, "yyyy-MM-dd")
          : null,
        return_time: bookingDates.returnTime || null,
        pick_up_location: bookingLocation.pickupLocation || null,
        return_location: bookingLocation.returnLocation || null,
        brand_id: bookingLocation?.brandId ?? null,
        sort_by: "lowToHigh",
        reservation_ssid: reservationSSID,
        reservation_id: reservation.id,
        isCreate: !isMid,
        isEdit: isMid,
        ...(loggedUser?.HqId && { customer_id: loggedUser.HqId }),
      };

      const response = await hqApi.post(
        "car-rental/update-reservation-pickup",
        requestData
      );

      if (response?.status == 200) {
        if (response?.data?.success) {
          showSuccessToast(response.data.message);
          setIsDrawerOpenSecondary(false);
          router.push(`${pathname}?pickupreturnupdated=true`);
        } else {
          setIsDrawerOpenSecondary(false);

          showErrorToast("Vehicle Not Found in Selected Range");
        }
      }
    } catch (err) {
      console.log(err);

      if (err?.response) {
        showErrorToast(err?.response?.data?.message);
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (reservation) {
      setIsDifferentReturnLocation(
        reservation?.pick_up_location?.id !== reservation?.return_location?.id
      );
    }
  }, []);

  const handleDifferentLocation = (checked) => {
    setIsDifferentReturnLocation(checked === true);
    console.log("checked", checked, reservation);
    if (!checked) {
      setBookingLocation((prev) => ({
        ...prev,
        returnLocation: prev.pickupLocation,
        returnLocationName: prev.pickupLocationName,
      }));
    } else {
      setBookingLocation((prev) => ({
        ...prev,
        pickupLocation: reservation?.pick_up_location
          ? reservation?.pick_up_location?.id
          : null,
        returnLocation: reservation?.return_location
          ? reservation?.return_location?.id
          : null,
        pickupLocationName: reservation?.pick_up_location
          ? reservation?.pick_up_location?.name
          : null,
        returnLocationName: reservation?.return_location
          ? reservation?.return_location?.name
          : null,
        brandId: reservation?.brand_id ? reservation?.brand_id : null,
      }));
    }
  };

  return (
    <>
      <div
        className={`${
          type !== "secondadry"
            ? "absolute top-[50px] left-[50%] shadow-lg translate-x-[-50%] w-[90%] sm:w-[95%]"
            : "relative pb-[25px] pt-[10px] w-[95%]"
        } translate-y-[0%] sm:translate-y-[-50%] sm:top-[100%]  ${
          isDifferentReturnLocation ? "max-w-[1400px]" : "max-w-[1200px]"
        } mx-auto h-full`}
      >
        <div
          className={`flex justify-between items-start gap-2 lg:gap-4 flex-col  lg:flex-row ${
            manage ? "mt-10 px-4 py-6 bg-white rounded-[8px] " : ""
          }`}
        >
          <div
            className={`basis-[100%] ${
              isDifferentReturnLocation ? "lg:basis-[50%]" : "lg:basis-[40%]"
            } w-full`}
          >
            {isDifferentReturnLocation ? (
              <div className="flex justify-between items-start gap-2 lg:gap-4 w-full lg:flex-row flex-col">
                <div className="basis-[100%] lg:basis-[50%] w-full">
                  <PickupReturnLocationDrawer
                    name={"Pickup Point"}
                    bookingLocation={bookingLocation}
                    setBookingLocation={setBookingLocation}
                  />
                </div>
                <div className="basis-[100%] lg:basis-[50%] w-full">
                  <PickupReturnLocationDrawer
                    name={"Return Point"}
                    bookingLocation={bookingLocation}
                    setBookingLocation={setBookingLocation}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`basis-[100%] ${
                  isDifferentReturnLocation
                    ? "lg:basis-[25%]"
                    : "lg:basis-[37.5%]"
                } w-full`}
              >
                <PickupReturnLocationDrawer
                  name={"Pickup & Return Point"}
                  bookingLocation={bookingLocation}
                  setBookingLocation={setBookingLocation}
                />
              </div>
            )}
          </div>
          <div
            className={`basis-[100%] ${
              isDifferentReturnLocation ? "lg:basis-[25%]" : "lg:basis-[37.5%]"
            } w-full`}
          >
            <PickupReturnDateDrawer
              booking={bookingDates}
              setBooking={setBookingDates}
            />
          </div>
          <label
            className={`mb-4 lg:mb-4 flex lg:hidden justify-start gap-3 items-center ${
              type === "secondadry" && "ml-2"
            }`}
          >
            <Checkbox
              id="terms"
              checked={isDifferentReturnLocation}
              onCheckedChange={(checked) => handleDifferentLocation(checked)}
            />
            <h3 className="m-0 text-[15px] lg:text-[18px]">
              {isDifferentReturnLocation
                ? "Return at same location"
                : "Return at different location"}
            </h3>
          </label>
          {!manage && (
            <div
              className={`basis-[100%] ${
                isDifferentReturnLocation ? "lg:basis-[25%]" : "lg:basis-[25%]"
              } w-full`}
            >
              <Button
                onClick={handleBookingSearch}
                className={`w-full flex justify-center gap-1 items-center bg-cPrimary py-6 text-white ${
                  type !== "secondadry" && "h-10 md:h-[58px]"
                }`}
              >
                {loader ? (
                  <Spinner size={20} color="#fff" thickness={3} />
                ) : (
                  <>
                    <span className="-mt-1">Search vehicles</span>
                    <IoIosSearch size={30} />
                  </>
                )}
              </Button>
              {type !== "secondadry" && <AnimatedTransparentGuarantee />}
            </div>
          )}
        </div>
      </div>
      {manage && (
        <SaveBottomBar
          onSubmit={handleBookingSearch}
          title="Confirm changes"
          load={loader}
        />
      )}
    </>
  );
}

export default SearchFillter;
