"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";


const allAwards = [
  {
    image: "/awards/Web Badges-01.png",
  },
  {
    image: "/awards/Web Badges-02.png",
  },
  {
    image: "/awards/Web Badges-03.png",
  },
  {
    image: "/awards/Web Badges-04.png",
  },
  {
    image: "/awards/Web Badges-05.png",
  },
  {
    image: "/awards/Web Badges-06.png",
  },
];

function TopRanked() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[5px]">

      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-[10px]">
            {allAwards.map((award, index) => (
              <CarouselItem
                key={index}
                className="pl-[10px] basis-auto"
              >
                <div
                  className="flex items-center justify-center w-[160px] h-[75px] bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
                >
                  <Image
                    src={award.image}
                    alt="Award Badge"
                    className="w-full h-full object-cover opacity-100 transition-all duration-300"
                    width={320} 
                    height={150}
                    quality={100}
                    unoptimized={false}
                    loading="lazy" 
                  />
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

export default TopRanked;