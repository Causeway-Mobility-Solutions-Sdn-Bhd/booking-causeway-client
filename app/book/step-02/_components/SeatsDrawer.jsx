"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import Spinner from "@/components/custom/Spinner";
import { IoIosSearch } from "react-icons/io";
import { showErrorToast } from "@/app/_lib/toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setSelectedVehicleClasses, setVehicleLoader } from "@/store/slices/reservationSlice";

const seats = [
  {
    id: 1,
    name: "1 - 5 Seats",
    ids: [18, 19, 20, 21, 8],
  },
  {
    id: 2,
    name: "6 - 7 Seats",
    ids: [22, 12],
  },
  {
    id: 3,
    name: "8 - 10 Seats",
    ids: [23, 24, 13],
  },
];

function SeatsDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  topBarFilter,
  setTopBarFilter,
}) {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [tempTopBarFilter, setTempTopBarFilter] = useState(topBarFilter);

  useEffect(() => {
    setTempTopBarFilter(topBarFilter);
  }, [topBarFilter]);

  useEffect(() => {
    setTempTopBarFilter({
      sortBy: null,
      carType: null,
      priceRange: [100, 900],
      seats: null,
      fuelType: null,
      connectivity: null,
      transmission: 0,
    });
  }, [reservation]);

  const handleSelectVehicleType = (s) => {
    setTempTopBarFilter((prev) => {
      return {
        ...prev,
        seats: {
          id: 1,
          ids: s?.ids,
        },
      };
    });
  };

  const handleSearch = async () => {
    await fetchData(false);
  };

  const handleReset = () => {
    setTopBarFilter((prev) => ({
      ...prev,
      seats: null,
    }));
    setTempTopBarFilter((prev) => ({
      ...prev,
      seats: null,
    }));
    setIsDrawerOpen(false);
    fetchData(true);
  };

  const fetchData = async (isReset) => {
    if (!reservation) return;

    if (!isReset) {
      setLoader(true);
    } else {
      dispatch(setVehicleLoader(true))
      dispatch(setSelectedVehicleClasses([]));
    }

    try {
      const carTypeIds = tempTopBarFilter?.carType?.map((item) => item.id);
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
        isCreate : false,
        min_price: tempTopBarFilter?.priceRange?.[0],
        max_price: tempTopBarFilter?.priceRange?.[1],
        ...(carTypeIds ? { car_type: carTypeIds } : {}),
        ...(tempTopBarFilter?.sortBy
          ? { sort_by: tempTopBarFilter.sortBy?.ids }
          : {}),
        ...(tempTopBarFilter?.seats?.ids?.length > 0 && !isReset
          ? { seats: tempTopBarFilter?.seats?.ids }
          : {}),
        ...(tempTopBarFilter?.connectivity
          ? { connectivity: topBarFilter.connectivity }
          : {}),
        ...(tempTopBarFilter?.fuelType
          ? { fuelType: tempTopBarFilter.fuelType }
          : {}),
        ...(tempTopBarFilter?.transmission !== null &&
        tempTopBarFilter?.transmission !== 0
          ? { transmission: tempTopBarFilter.transmission }
          : {}),
      };

      const response = await hqApi.post(
        "car-rental/reservations/dates",
        requestData
      );

      if (response?.status === 200) {
        const vehicles = response.data?.VehicleClasses || [];
        if (vehicles?.length > 0) {
          dispatch(setSelectedVehicleClasses(vehicles));
          setTopBarFilter((prev) => ({
            ...prev,
            seats: isReset ? null : tempTopBarFilter?.seats,
          }));
        } else {
          showErrorToast("Vehicle Not Found in Selected Filter");
          setTopBarFilter((prev) => ({
            ...prev,
            seats: null,
          }));
          setTempTopBarFilter((prev) => ({
            ...prev,
            seats: null,
          }));
        }
        setIsDrawerOpen(false);
        setLoader(false);
        dispatch(setVehicleLoader(false))
      }
    } catch (error) {
      console.log("Error fetching vehicle classes:", error);
      setLoader(false);
      dispatch(setVehicleLoader(false))
    }
  };

  const handleSeatsDrawer = (open) => {
    if (!loader) {
      setIsDrawerOpen(open);
    }
    if (!open) {
      setTempTopBarFilter(topBarFilter);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleSeatsDrawer}>
      <DrawerTrigger asChild>
        <div
          className={`inline-flex items-center gap-1 px-4 py-1 border-1 ${
            topBarFilter?.seats?.ids?.length > 0
              ? "border-cSecondary text-cSecondary"
              : "border-cGray text-black"
          } rounded-full font-medium cursor-pointer transition duration-200`}
        >
          <span className="text-[14px]">Seats</span>
          <MdKeyboardArrowDown size={18} />
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-90 flex flex-col">
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1">
          <DrawerTitle className="text-[1rem] text-center py-[8px] w-full">
            Seats
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSeatsDrawer(false)}
            className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
        </DrawerHeader>

        <div>
          <div className="w-[90%] mx-auto my-[30px]">
            <h3 className="font-semibold text-[20px]">Seats</h3>
            {seats && (
              <div className="mt-[20px]">
                {seats.map((s) => (
                  <div
                    key={s?.id}
                    className="flex justify-start gap-2 items-center mt-5"
                  >
                    <Checkbox
                      id={`seats-${s?.id}`}
                      checked={tempTopBarFilter?.seats?.ids === s?.ids}
                      onCheckedChange={() => handleSelectVehicleType(s)}
                    />
                    <Label
                      htmlFor={`seats-${s?.id}`}
                      className="leading-[15px] font-normal"
                    >
                      {s?.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-cGray">
            <div className="flex justify-between items-center w-[90%] mx-auto py-[20px]">
              <p
                onClick={handleReset}
                className="text-cGray text-[16px] underline cursor-pointer"
              >
                Reset
              </p>
              <Button
                onClick={handleSearch}
                className="h-10 flex justify-center items-center bg-cPrimary w-[150px] px-3"
              >
                {loader ? (
                  <Spinner size={20} color="#fff" thickness={3} />
                ) : (
                  <>
                    <span>Search</span>
                    <IoIosSearch size={30} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SeatsDrawer;
