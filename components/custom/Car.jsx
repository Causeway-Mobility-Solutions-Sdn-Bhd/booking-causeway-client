"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import SmartImage from "./SmartImage";

function Car({ car }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (carId) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  return (
    <Card className="h-full relative">
      <CardContent className="px-4">
        {/* Favorite Button */}
        <div className="absolute top-4 right-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(car?.id)}
            className="h-7 w-7 border border-cGray rounded-md"
            aria-label={
              favorites.includes(car.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-pressed={favorites.includes(car?.id)}
          >
            <Bookmark
              className={`h-6 w-6 ${
                favorites.includes(car?.id)
                  ? "fill-cSecondary text-cSecondary"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Car Image */}
        <div className="flex justify-center py-7">
          <SmartImage
            src={car?.vehicle_class?.public_image}
            width={230}
            height={100}
            alt={`${car?.name} ${car?.model}`}
          />
        </div>

        <div className="flex justify-between items-center">
          {/* Car Info */}
          <div className="text-left mb-4">
            <h3 className="font-semibold text-lg text-foreground">
              {car?.vehicle_brand?.name}
            </h3>
            <p className="text-xs sm:text-sm text-left text-muted-foreground">
              {car?.vehicle_class?.name}
            </p>
          </div>

          {/* Price */}
          <div className="text-right mb-4">
            <p className="text-[17px] lg:text-2xl font-bold text-foreground">
              RM{" "}
              {car?.price?.amount
                ? parseFloat(car.price.amount).toFixed(0)
                : "0"}
            </p>
            <p className="text-xs sm:text-sm text-right text-muted-foreground ml-1">
              / Day
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {car?.features?.map((f) => (
            <div key={f?.id} className="flex flex-col items-center text-center">
              <Image
                src={f?.images[0]?.public_link}
                alt={`${f?.id}`}
                className="h-full w-[20px] object-contain"
                width={200}
                height={70}
                priority
              />
              <span className="text-xs text-muted-foreground">
                {[1, 2].includes(f?.id) ? f?.label?.split(" ")[0] : f?.label}
              </span>
            </div>
          ))}
        </div>

        {/* Book Button */}
        <Button className="w-full h-10 sm:h-12 cursor-pointer bg-cPrimary  text-white font-semibold">
          Book now
        </Button>
      </CardContent>
    </Card>
  );
}

export default Car;
