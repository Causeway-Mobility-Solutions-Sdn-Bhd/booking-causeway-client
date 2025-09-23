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
import { Label } from "@/components/ui/label";
import hqApi from "@/lib/hqApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showErrorToast } from "@/app/_lib/toast";
import { format } from "date-fns";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setSelectedVehicleClasses, setVehicleLoader } from "@/store/slices/reservationSlice";

function SortDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  topBarFilter,
  setTopBarFilter,
}) {
  const [sortOption, setSortOption] = useState(topBarFilter?.sortBy);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const dispatch = useDispatch();

  useEffect(() => {
    setSortOption("lowToHigh");
  }, [reservation]);

  const handleSortChange = (val) => {
    setSortOption(val);
    setIsDrawerOpen(false);
    setTopBarFilter((prev) => ({
      ...prev,
      sortBy: val,
    }));
    fetchData(val);
  };

  const handleSortDrawer = async (open) => {
    setIsDrawerOpen(open);
  };

  const fetchData = async (val) => {
    dispatch(setVehicleLoader(true))
    dispatch(setSelectedVehicleClasses([]))
    if (!reservation) return;

    try {
      const carTypeIds = topBarFilter?.carType?.map((item) => item.id);

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
        sort_by: val,
        min_price: topBarFilter?.priceRange?.[0],
        max_price: topBarFilter?.priceRange?.[1],
        ...(carTypeIds ? { car_type: carTypeIds } : {}),
        ...(topBarFilter?.connectivity
          ? { connectivity: topBarFilter.connectivity }
          : {}),
        ...(topBarFilter?.seats ? { seats: topBarFilter?.seats?.ids } : {}),
        ...(topBarFilter?.fuelType ? { fuelType: topBarFilter.fuelType } : {}),
        ...(topBarFilter?.transmission !== null &&
        topBarFilter?.transmission !== 0
          ? { transmission: topBarFilter.transmission }
          : {}),
      };

      const response = await hqApi.post(
        "car-rental/reservations/dates",
        requestData
      );

      if (response?.status === 200) {
        const vehicles = response.data?.VehicleClasses || [];
        if (vehicles?.length > 0) {
          dispatch(setSelectedVehicleClasses(vehicles))
        } else {
          showErrorToast("Vehicle Not Found in Selected Filter");
        }
        setIsDrawerOpen(false);
      }
      dispatch(setVehicleLoader(false))
    } catch (error) {
      dispatch(setVehicleLoader(false))
      console.error("Error fetching vehicle classes:", error);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleSortDrawer}>
      <DrawerTrigger asChild>
        <div
          className={`inline-flex items-center gap-1 px-4 py-1 border-1 ${
            topBarFilter?.sortBy !== null
              ? "border-cSecondary text-cSecondary"
              : "border-cGray text-black "
          }   rounded-full font-medium cursor-pointer  transition duration-200`}
        >
          <span className="text-[14px] ">Sort</span>
          <MdKeyboardArrowDown size={18} />
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-90 flex flex-col">
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1">
          <DrawerTitle className="text-[1rem] text-center py-[8px] w-full">
            Sort Type
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortDrawer(false)}
            className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
        </DrawerHeader>

        <div className="w-full">
          <RadioGroup value={sortOption} onValueChange={handleSortChange}>
            <div className="p-[8px] border-b border-cGray w-full flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="lowToHigh" id="lowToHigh" />
              <Label
                htmlFor="lowToHigh"
                className="w-full cursor-pointer py-[10px]"
              >
                Low To High
              </Label>
            </div>

            <div className="p-[8px] border-b border-cGray w-full flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="highToLow" id="highToLow" />
              <Label
                htmlFor="highToLow"
                className="w-full cursor-pointer py-[10px]"
              >
                High To Low
              </Label>
            </div>

            <div className="p-[8px]  w-full flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="recommended" id="recommended" />
              <Label
                htmlFor="recommended"
                className="w-full cursor-pointer py-[10px]"
              >
                Recommend
              </Label>
            </div>
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SortDrawer;
