import Image from "next/image";
import React from "react";

const Banner = ({
  imageSrc = "/banner/banner.webp",
  altText = "Banner",
  height = "h-80 md:h-[500px] lg:h-[270px]",
}) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#f0f0f0] via-transparent to-transparent opacity-100"
        style={{
          background: "linear-gradient(to top, #f0f0f0 0%, transparent 40%)",
        }}
      />
    </div>
  );
};

export default Banner;
