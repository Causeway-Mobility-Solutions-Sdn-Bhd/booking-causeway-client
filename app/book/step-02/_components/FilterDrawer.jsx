"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoReloadOutline } from "react-icons/io5";
import Filter from "../../_components/Filter";

function FilterDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  setTobBarFilter,
  topBarFilter,
  vehiTypes,
}) {
  const [loader, setLoader] = useState(false);
  const [reLoader, setReLoader] = useState(false);

  const handleDrawer = (val) => {
    if (!loader && !reLoader) {
      setIsDrawerOpen(val);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawer}>
      <DrawerTrigger asChild>
        <div>
          <Image
            src="/icons/filter-icon.svg"
            alt={`filter icon`}
            className="h-full w-[20px] cursor-pointer object-contain"
            width={20}
            height={20}
            loading="lazy"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="z-90 flex flex-col h-[85vh]">
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1 flex-shrink-0">
          <DrawerTitle className="text-lg text-center py-[8px] w-full ">
            Filters
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDrawerOpen(false)}
            className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearch(true)}
            className="h-8 w-8 p-0 absolute cursor-pointer right-2 text-cSecondary"
          >
            <IoReloadOutline
              className={`text-cSecondary text-[30px] ${
                reLoader && "animate-rotate-slow"
              }`}
            />
          </Button>
        </DrawerHeader>

        <Filter
          setTobBarFilter={setTobBarFilter}
          topBarFilter={topBarFilter}
          vehiTypes={vehiTypes}
          loader={loader}
          setLoader={setLoader}
          setReLoader={setReLoader}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          variant={'primary'}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
