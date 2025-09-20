"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MdModeEdit } from "react-icons/md";
import SearchFillter from "@/app/_components/SearchFillter";

function EditLocationDateDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  reservation,
  setTobBarFilter,
  isMid = false
}) {
  const handleReset = () => {
    setTobBarFilter({
      sortBy: null,
      carType: null,
      priceRange: [100, 900],
      seats: null,
      fuelType: null,
      connectivity : null,
      transmission: 0,
    });
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <MdModeEdit  color="#2DBDB6" size={isMid ? 22 : 15} />
      </DrawerTrigger>
      <DrawerContent className={`z-90 flex flex-col `}>
        <DrawerTitle className="sr-only">Edit Date and Location</DrawerTitle>
        <div className={`${isMid ? 'h-[550px]' : 'h-full'}`}>
          <SearchFillter
            setIsDrawerOpenSecondary={setIsDrawerOpen}
            type="secondadry"
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
