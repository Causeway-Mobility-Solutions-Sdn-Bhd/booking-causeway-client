import React  from "react";
import {CategoryBadgeLoader} from "@/components/custom/Skeleton";

function CarType({vehicleType , filterVehicle , activeType}) {
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
                      className={`rounded-full cursor-pointer py-2 px-4 font-semibold whitespace-nowrap flex-shrink-0 ${
                        activeType === category.id
                          ? "border-2 border-cSecondary text-cSecondary"
                          : "border border-ctextGray text-ctextGray"
                      }`}
                      onClick={() => filterVehicle(category?.id)}
                    >
                      <p className="text-center text-[12px]">{category.label}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
  )
}

export default CarType