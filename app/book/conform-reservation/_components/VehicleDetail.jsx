import SmartImage from "@/components/custom/SmartImage";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React from "react";

function VehicleDetail({ selectedVehicle }) {
  return (
    <div className="bg-white w-full sm:w-[450px] flex justify-start items-center gap-2 shadow-sm rounded-lg overflow-hidden px-4 py-2.5 mb-5">
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
        <h3 className="text-[18px] font-semibold">{selectedVehicle?.label}</h3>
        <div className="flex flex-wrap justify-start  gap-2.5 mt-1">
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
              <span className="text-xs  text-muted-foreground">{f?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
