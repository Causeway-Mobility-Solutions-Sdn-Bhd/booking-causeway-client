// components/WhyHost.jsx
import React from "react";

const WhyHost = () => {
  const features = [
    {
      text: "Comprehensive Commercial Insurance",
      image: "/whyCauseway/whyhost/insurance.svg",
    },
    {
      text: "Hassle Free Service & Maintenance",
      image: "/whyCauseway/whyhost/maintenance.svg",
    },
    {
      text: "24/7 Tracking Support",
      image: "/whyCauseway/whyhost/trackingsupport.svg",
    },
    {
      text: "Business Regulars",
      image: "/whyCauseway/whyhost/correct.svg",
    },
    {
      text: "Guaranteed Monthly Income",
      image: "/whyCauseway/whyhost/guaranteed.svg",
    },
    {
      text: "Personalized Ownership",
      image: "/whyCauseway/whyhost/ownership.svg",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      {/* Heading */}
      <h2 className="text-2xl xsm:text-center font-bold text-black mb-8">
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
            <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img
                src={feature.image}
                alt={feature.text}
                className="w-[48px] h-[48px] object-contain"
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
