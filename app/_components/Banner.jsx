import React from "react";
import Image from "next/image";
import SearchFillter from "./SearchFillter";

function Banner() {
  return (
    <div className="relative h-[270px]">
      <div className="relative w-full h-full">
        <Image
          src="/banner/banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#f0f0f0] via-transparent to-transparent opacity-100"
          style={{
            background: "linear-gradient(to top, #f0f0f0 0%, transparent 40%)",
          }}
        />
      </div>
      <SearchFillter />
    </div>
  );
}

export default Banner;
