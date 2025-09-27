"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { useFormatPrice } from "@/app/_lib/formatPrice";
import { ChevronUp, ShoppingCart } from "lucide-react";
import ShowPickDrop from "./ShowPickDrop";
import VehicleDetail from "./VehicleDetail";
import PriceSummary from "./PriceSummary";

function PriceSummaryDrawer({ selectedVehicle, currency }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const formatPrice = useFormatPrice();

  const handlePSDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handlePSDrawer}>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-between gap-2 rounded-lg px-4 basis-[70%] py-2 border border-gray-200">
          <div className="flex items-center justify-start gap-2">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-[16px] leading-[18px] font-bold text-gray-900">
                {formatPrice(
                  selectedVehicle?.total_price_with_mandatory_charges_and_taxes
                )}
              </span>
            </div>
          </div>
          <ChevronUp className="w-5 h-5 text-cSecondary " />
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-90 flex flex-col ">
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1">
          <DrawerTitle className="text-[1rem] text-center py-[8px] w-full">
            Booking Details
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePSDrawer(false)}
            className="h-8 w-8 p-0 absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
        </DrawerHeader>
        <div className="bg-cWhite h-[500px] overflow-y-auto">
          <div className="py-[15px] w-[95%] mx-auto">
            <ShowPickDrop />
            <VehicleDetail />
            <PriceSummary />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PriceSummaryDrawer;
