"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TitleHead from "@/components/custom/TitleHead";
import Image from "next/image";


const allBrands = [
  {
    img: "/partners/brand-11.webp",
    name: "Toyota",
  },
  {
    img: "/partners/brand-12.webp",
    name: "Volkswagen",
  },
];

function Partners() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[80px]">
      <TitleHead name="Partners" />

      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {allBrands.map((brand, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/4 md:basis-1/8"
              >
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="w-20 h-16 sm:h-20 mb-0 sm:mb-3 flex items-center justify-center bg-gray-5 rounded-lg overflow-hidden">
                    <Image
                      src={brand.img}
                      alt={brand.name}
                      className="max-w-full w-[40px] sm:w-[200px] max-h-full object-contain filter transition-all duration-300"
                      width={200} 
                      height={100} 
                      loading="lazy" 
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center">
                    {brand.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Gradient overlays for seamless loop effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}

export default Partners;
