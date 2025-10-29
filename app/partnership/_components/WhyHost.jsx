// components/WhyHost.jsx
import React from "react";

const WhyHost = () => {
  const features = [
    {
      text: "Comprehensive Commercial Insurance",
      image: "/whyCauseway/whyhost/insurance.webp",
    },
    {
      text: "Hassle Free Service & Maintenance",
      image: "/whyCauseway/whyhost/maintenance.webp",
    },
    {
      text: "24/7 Tracking Support",
      image: "/whyCauseway/whyhost/trackingsupport.webp",
    },
    {
      text: "Business Regulars",
      image: "/whyCauseway/whyhost/correct.webp",
    },
    {
      text: "Guaranteed Monthly Income",
      image: "/whyCauseway/whyhost/guaranteed.webp",
    },
    {
      text: "Personalized Ownership",
      image: "/whyCauseway/whyhost/ownership.webp",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      {/* Heading */}
      <h2 className="text-2xl text-center font-bold text-black mb-8">
        Why host with Causeway
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-full max-w-[250px] sm:max-w-[350px]"
          >
            {/* Image */}
            <div className="mb-4 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
              <img
                src={feature.image}
                alt={feature.text}
                className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] object-contain"
              />
            </div>

            {/* Text */}
            <p className="px-8 sm:px-0 text-md md:text-base font-medium text-black leading-tight">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyHost;