"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TitleHead from "@/components/custom/TitleHead";
import Autoplay from "embla-carousel-autoplay";
import { CarCardSkeleton } from "@/components/custom/Skeleton";
import Car from "@/components/custom/Car";
import CarType from "./CarType";
import {
  useGetVehicleTypesQuery,
  useGetVehiclesByCategoryQuery,
} from "@/store/api/fleetApiSlice";

function CarList() {
  const [activeType, setActiveType] = useState(2);

  const { data: vehicleType = [], isLoading: loadingTypes } =
    useGetVehicleTypesQuery();

  const {
    data: vehicleClasses = [],
    isLoading: loadingVehicles,
    isFetching,
  } = useGetVehiclesByCategoryQuery(activeType);

  const filterVehicle = (categoryId) => {
    setActiveType(categoryId);
  };

  return (
    <div className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px]">
      <TitleHead name={"Pick Your Ride"} />

      <CarType
        vehicleType={vehicleType}
        activeType={activeType}
        filterVehicle={filterVehicle}
      />

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full py-1 sm:py-3"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {loadingVehicles || isFetching || vehicleClasses?.length === 0
            ? Array(7)
                .fill()
                .map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-[67%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <CarCardSkeleton />
                  </CarouselItem>
                ))
            : vehicleClasses?.map((car) => (
                <CarouselItem
                  key={car?.id}
                  className="pl-2 md:pl-4 basis-[67%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Car car={car} />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CarList;
