import React from "react";
import Image from "next/image";

const allBrands = [
  {
    img: "/partners/carro.svg",
    name: "CARRO",
  },
  {
    img: "/partners/allianz.svg",
    name: "Allianz",
  },
];

function Partners() {
  return (
    <section className="w-[90%] sm:w-[95%] max-w-[1400px] mx-auto mt-[30px] pb-[80px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Partners</h2>

      <div className="flex items-center justify-center gap-20 md:gap-28">
        {allBrands.map((brand, index) => (
          <div key={index}>
            <Image
              src={brand.img}
              alt={brand.name}
              className="max-w-full h-auto object-contain"
              width={120}
              height={31}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Partners;