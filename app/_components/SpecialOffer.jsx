"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";


const slides = [
  { id: 1, img: "/special-offers/special-banner-01.webp" },
  { id: 2, img: "/special-offers/special-banner-02.webp" },
  { id: 3, img: "/special-offers/special-banner-03.webp" },
  { id: 4, img: "/special-offers/special-banner-01.webp" },
  { id: 5, img: "/special-offers/special-banner-02.webp" },
  { id: 6, img: "/special-offers/special-banner-03.webp" },
];

function SpecialOffer() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollToSlide = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[20px] lg:mt-[50px]">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="pl-1 basis-[67%] md:basis-1/3"
            >
              <div className="p-1">
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
                  <Image
                    src={slide.img}
                    alt={`Special Offer ${slide.id}`}
                    fill
                    sizes="(max-width: 768px) 85vw, (min-width: 768px) 33vw"
                    className="object-fill rounded-lg"
                    priority={slide.id === 1}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center mt-2 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-[8px] h-[8px] rounded-full transition-colors cursor-pointer ${
              current === index ? "bg-cSecondary" : "bg-ctextGray"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SpecialOffer;
