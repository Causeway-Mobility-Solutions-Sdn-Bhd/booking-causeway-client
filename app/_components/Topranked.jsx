"use client";
import React, { useEffect, useRef } from "react";

// Mock Image component for demo
const Image = ({ src, alt, width, height, className, priority, quality }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const allAwards = [
  {
    image: "/awards/Web Badges-01.webp",
  },
  {
    image: "/awards/Web Badges-02.webp",
  },
  {
    image: "/awards/Web Badges-03.webp",
  },
  {
    image: "/awards/Web Badges-04.webp",
  },
  {
    image: "/awards/Web Badges-05.webp",
  },
  {
    image: "/awards/Web Badges-06.webp",
  },
];

function TopRanked() {
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
    <section className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[7px] pb-[0px]">
      <div
        ref={scrollRef}
        className="relative flex overflow-x-scroll scrollbar-hide gap-0"
      >
        {[...allAwards, ...allAwards].map((award, index) => (
          <div
            key={index}
            className="shrink-0 flex items-center justify-center -mx-4"
          >
            <Image
              src={award.image}
              alt={`Award Badge ${index + 1}`}
              className="w-[240px] h-[110px] object-contain hover:scale-105 transition-transform duration-300"
              width={240}
              height={110}
              loading="lazy"
              quality={100}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopRanked;