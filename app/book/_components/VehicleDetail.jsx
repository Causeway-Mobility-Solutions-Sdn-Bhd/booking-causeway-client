import SmartImage from "@/components/custom/SmartImage";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React from "react";

function VehicleDetail() {
  const selectedVehicle = useAppSelector(
    (state) => state.reservation.selectedVehicle
  );

  return (
    <div className="mt-0">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-bold">Vehicle details</h1>
      </div>

      <div className="bg-white flex justify-start items-center gap-2 shadow-lg rounded-lg overflow-hidden px-4 py-3">
        <div className="relative">
          {selectedVehicle?.image && (
            <SmartImage
              src={selectedVehicle.image}
              width={70}
              height={70}
              alt="Vehicle image"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] font-semibold">{selectedVehicle?.name}</h3>
          <div className="flex justify-start gap-2.5 mt-1">
            {selectedVehicle?.features?.map((f) => (
              <div
                key={f?.id}
                className="flex flex-row gap-1 items-center text-center"
              >
                <Image
                  src={f?.images[0]?.public_link}
                  alt={`${f?.id}`}
                  className="h-full w-[15px] object-contain"
                  width={15}
                  height={15}
                  priority
                />
                <span className="text-xs  text-muted-foreground">
                  {f?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
