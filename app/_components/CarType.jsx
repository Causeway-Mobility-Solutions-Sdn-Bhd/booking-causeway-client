import React from "react";
import { CategoryBadgeLoader } from "@/components/custom/Skeleton";

function CarType({ vehicleType, filterVehicle, activeType }) {
  console.log(vehicleType);

  return (
    <div className="overflow-x-auto scrollbar-hide mb-2 sm:mb-4">
      {vehicleType?.length === 0 ? (
        <CategoryBadgeLoader />
      ) : (
        <div className="flex gap-3 min-w-max px-1">
          {vehicleType
            ?.filter((cf) => cf?.id !== 1)
            .map((category) => (
              <div
                key={category.id}
                className={`bg-white rounded-full flex items-center gap-2 cursor-pointer py-2 px-4 font-semibold whitespace-nowrap flex-shrink-0 ${
                  activeType === category.id
                    ? "border-1 border-cSecondary text-cSecondary"
                    : "border border-gray-300 text-black"
                }`}
                onClick={() => filterVehicle(category?.id)}
              >
                <img
                  style={{
                    width: "35px",
                    height: "100%",
                    filter:
                      activeType === category.id
                        ? "brightness(0) saturate(100%) invert(70%) sepia(31%) saturate(1026%) hue-rotate(128deg) brightness(91%) contrast(86%)"
                        : "brightness(0) saturate(100%)",
                  }}
                  src={`/vehicleicons/${category.label}.svg`}
                />
                <p className="text-center text-[12px]">{category.label}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CarType;
