import React from "react";
import Image from "next/image";
import SearchFillter from "./SearchFillter";

function Banner() {
  return (
    <div className="relative h-[270px] sm:h-[240px] md:h-[260px] lg:h-[280px]">
      <div className="relative w-full h-full">
        {/* Mobile Image */}
        <Image
          src="/banner/IMAGE MOBILE.webp"
          alt="Banner"
          fill
          className="object-cover object-center block sm:hidden"
          priority
        />
        
        {/* Desktop Image */}
        <Image
          src="/banner/IMAGE LAP.webp"
          alt="Banner"
          fill
          className="object-cover object-top hidden sm:block"
          priority
        />
      
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#f0f0f0] via-transparent to-transparent opacity-100"
          style={{
            background: "linear-gradient(to top, #f0f0f0 0%, transparent 50%)",
          }}
        />
      </div>
      <SearchFillter />
    </div>
  );
}

export default Banner;