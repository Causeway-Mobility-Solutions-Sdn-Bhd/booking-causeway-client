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
    <section className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[7px] pb-[0px]">

      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-[15px]">
            {allAwards.map((award, index) => (
              <CarouselItem
                key={index}
                className="pl-[15px] basis-[260px]"
              >
                <Image
                  src={award.image}
                  alt="Award Badge"
                  className="w-auto h-auto object-contain"
                  width={240} 
                  height={112}
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default TopRanked;