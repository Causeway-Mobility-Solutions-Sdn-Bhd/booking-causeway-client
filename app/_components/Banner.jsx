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
          className="object-cover block sm:hidden"
          style={{ objectPosition: "center 2%" }}
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
    
      </div>
      <SearchFillter />
    </div>
  );
}

export default Banner;