"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const awards = [
  {
    icon: "🏆",
    title: "Trusted Brand",
    subtitle: "Award",
  },
  {
    icon: "🥇",
    title: "Best Website",
    subtitle: "Award 2025",
  },
  {
    icon: "🏆",
    title: "Winner",
    subtitle: "Growing businesses",
  },
  {
    icon: "🥇",
    title: "Excellence in",
    subtitle: "Service Award",
  },
  {
    icon: "🏆",
    title: "Best Car",
    subtitle: "Rental Platform",
  },
   {
    icon: "🥇",
    title: "Trusted",
    subtitle: "Brand Award",
  },
  {
    icon: "🏆", 
    title: "Fastest Growing",
    subtitle: "Award",
  },
  {
    icon: "🥇",
    title: "Customer Trust &",
    subtitle: "Safety Award",
  },
];

function TopRanked() {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    const autoSlide = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full mt-[30px] relative z-10">
      <div className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
           
          <div className="relative flex items-center justify-center sm:justify-start flex-shrink-0 w-full sm:w-auto">
             
            <div className="absolute left-1/2 sm:left-0 top-1/2 transform -translate-y-1/2 -translate-x-32 sm:-translate-x-6">
              <img
                src="/laurel/laurel-left.png"
                alt="Left Laurel"
                className="w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 object-contain"
              />
            </div>
            
             
            <div className="text-center sm:text-center flex flex-col justify-center px-36 sm:pl-12 sm:pr-8 md:pl-16 md:pr-12 lg:pl-20 lg:pr-16">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                Top-Ranked
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                Car Rental Platform
              </p>
            </div>
            
             
            <div className="absolute right-1/2 sm:right-0 top-1/2 transform -translate-y-1/2 translate-x-32 sm:translate-x-6">
              <img
                src="/laurel/laurel-left.png"
                alt="Right Laurel"
                className="w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 object-contain transform scale-x-[-1]"
              />
            </div>
          </div>

          
          <div className="flex-1 relative overflow-hidden h-24 sm:h-30 w-full">
            <Carousel
              setApi={setApi}
              className="w-full h-full"
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
            >
              <CarouselContent className="h-full -ml-2 sm:-ml-4">
                {awards.map((award, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-auto h-full flex items-center pl-2 sm:pl-4"
                  >
                    
                    <div className="bg-white rounded-md shadow-sm px-2 py-4 sm:px-3 sm:py-7 flex items-center gap-2 sm:gap-3 hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-gray-300 whitespace-nowrap">
                      <div className="text-sm sm:text-lg flex-shrink-0">
                        {award.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-900 leading-tight">
                          {award.title}
                        </p>
                        <p className="text-xs text-gray-600 leading-tight">
                          {award.subtitle}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopRanked;