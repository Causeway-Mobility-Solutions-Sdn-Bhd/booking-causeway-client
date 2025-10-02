"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const logos = [
  "/media-logos/media-logos-02.webp",
  "/media-logos/media-logos-03.webp",
  "/media-logos/media-logos-01.webp",
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

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1; 
    let animationFrame;

    const scrollStep = () => {
      scrollContainer.scrollLeft += scrollSpeed;

      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth / 2
      ) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scrollStep);
    };

    animationFrame = requestAnimationFrame(scrollStep);

    const stop = () => cancelAnimationFrame(animationFrame);
    const start = () => {
      animationFrame = requestAnimationFrame(scrollStep);
    };

    scrollContainer.addEventListener("mouseenter", stop);
    scrollContainer.addEventListener("mouseleave", start);

    return () => {
      cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener("mouseenter", stop);
      scrollContainer.removeEventListener("mouseleave", start);
    };
  }, []);

  return (
    <div
      className={`${
        isDifferentReturnLocation ? "mt-[140px]" : "mt-[80px]"
      }  lg:mt-[100px]`}
    >
      <div
        ref={scrollRef}
        className="relative flex overflow-x-scroll scrollbar-hide"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="shrink-0 px-4 w-[30%] sm:w-[25%] md:w-[12.5%] lg:w-[10%] flex items-center justify-center"
          >
            <div className="relative aspect-[8/6] sm:aspect-[7/3] w-full max-w-[270px]">
              <Image
                src={logo}
                alt={`Brand ${index + 1}`}
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
