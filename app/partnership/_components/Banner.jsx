import Image from "next/image";
import React from "react";

const Banner = ({
  imageSrc = "/banner/banner.webp",
  altText = "Banner",
  height = "h-84 md:h-[430px] lg:h-[430px]",
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
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#f0f0f0] via-transparent to-transparent opacity-100"
        style={{
          background: "linear-gradient(to top, #f0f0f0 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto mt-6 w-[90%] sm:w-[95%] h-full flex items-start xsm:justify-center pb-8">
        <h1 className="text-3xl  xsm:text-center font-bold text-black">
          Earn an extra{" "}
          <span className="xsm:hidden">
            <br />
          </span>
          income
        </h1>
      </div>
    </div>
  );
};

export default Banner;
