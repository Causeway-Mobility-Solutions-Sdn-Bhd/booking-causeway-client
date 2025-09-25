"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TitleHead from "@/components/custom/TitleHead";
import Autoplay from "embla-carousel-autoplay";
import hqApi from "@/lib/hqApi";
import { CarCardSkeleton } from "@/components/custom/Skeleton";
import Car from "@/components/custom/Car";
import CarType from "./CarType";

function CarList() {
  const [activeType, setActiveType] = useState(2);
  const [vehicleClasses, setVehicleClasses] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const filterVehicle = async (categoryId) => {
    setActiveType(categoryId);
    try {
      setVehicleClasses([]);
      const resVehicles = await hqApi.get(`/fleets/vehicles/${categoryId}`);
      setVehicleClasses(resVehicles?.data);
    } catch (err) {
      console.log("err : ", err);
    } finally {
      console.log("vehicle classes fetched");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resVehicles, resVehcileType] = await Promise.all([
          hqApi.get(`/fleets/vehicles/${activeType}`),
          hqApi.get("/fleets/vehicle-types"),
        ]);
        setVehicleClasses(resVehicles?.data);
        setVehicleType(resVehcileType?.data);
      } catch (error) {
        console.error(
          "HQ API error:",
          error.response.data
        );
      } finally {
        console.log("vehicle classes fetched");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px]">
      {/* Header */}
      <TitleHead name={"Pick Your Ride"} />

      <CarType
        vehicleType={vehicleType}
        activeType={activeType}
        filterVehicle={filterVehicle}
      />

      {/* Car Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full py-1 sm:py-3"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {vehicleClasses?.length === 0
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
