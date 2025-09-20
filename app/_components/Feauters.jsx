"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const logos = [
  "/media-logos/media-logos-01.webp",
  "/media-logos/media-logos-02.webp",
  "/media-logos/media-logos-03.webp",
  "/media-logos/media-logos-04.webp",
  "/media-logos/media-logos-05.webp",
  "/media-logos/media-logos-06.webp",
  "/media-logos/media-logos-07.webp",
  "/media-logos/media-logos-08.webp",
  "/media-logos/media-logos-09.webp",
];

function Features() {
  const isDifferentReturnLocation = useAppSelector(
    (state) => state.reservation.isDifferentReturnLocation
  );

  return (
    <div
      className={`w-[90%] sm:w-[95%] max-w-[1400px] mx-auto ${
        isDifferentReturnLocation ? "mt-[140px]" : "mt-[80px]"
      }  lg:mt-[100px]`}
    >
      <div className="relative">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .scroll-animation {
            animation: scroll 20s linear infinite;
          }

          .scroll-animation:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex scroll-animation">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 px-4 w-[30%] sm:w-[25%] md:w-[12.5%] lg:w-[10%] flex items-center justify-center"
            >
              <div className="relative aspect-[7/3] sm:aspect-[7/3]  w-full max-w-[200px]">
                <Image
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  loading="lazy"
                  fill
                  className="object-contain transition-opacity duration-300 h-0 sm:h-[300px]"
                />
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 px-4 w-[50%] sm:w-[25%] md:w-[12.5%] flex items-center justify-center"
            >
              <div className="relative aspect-[3/1] w-full max-w-[200px]">
                <Image
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                  className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
