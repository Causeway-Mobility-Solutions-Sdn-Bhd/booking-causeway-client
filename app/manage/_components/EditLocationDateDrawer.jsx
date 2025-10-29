"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";
import { MdModeEdit } from "react-icons/md";
import SearchFillter from "./SearchFillter";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";

function EditLocationDateDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  reservation,
  setTobBarFilter,
  isMid = false,
}) {
  const handleReset = () => {
    setTobBarFilter({
      sortBy: null,
      carType: null,
      priceRange: [100, 900],
      seats: null,
      fuelType: null,
      connectivity: null,
      transmission: 0,
    });
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="h-[80vh] bg-white z-[95] ">
        <DrawerHeader className=" flex items-center flex-row justify-between border-b relative w-full py-1 px-[10px] mx-auto">
          <DrawerTitle className="text-lg text-center py-[8px] w-full">
            Pickup & Return
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDrawerOpen(false)}
            className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
        </DrawerHeader>

        <div className={` bg-gray-100 flex-1`}>
          <SearchFillter
            setIsDrawerOpenSecondary={setIsDrawerOpen}
            type="secondadry"
            manage={true}
            reservation={reservation}
            handleReset={handleReset}
            isMid={isMid}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditLocationDateDrawer;
