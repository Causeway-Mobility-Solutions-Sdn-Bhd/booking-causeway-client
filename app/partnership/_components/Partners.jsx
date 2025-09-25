import React from "react";

const Partners = () => {
  const partners = [
    { id: 1, name: "Carro", logo: "/partners/carro.svg" },
    { id: 2, name: "Allianz", logo: "/partners/allianz.svg" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      <h2 className="text-2xl font-bold text-black mb-5">Partners</h2>

      <div className="grid grid-cols-2 gap-6 max-w-md">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow-lg px-2 p-6 flex items-center justify-center h-24"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-16 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
