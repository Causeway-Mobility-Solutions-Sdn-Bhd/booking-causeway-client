// components/WhyHost.jsx
import React from "react";

const WhyHost = () => {
  const features = [
    {
      text: "Comprehensive Commercial Insurance",
      image: "/whyCauseway/why-couseway-03.webp",
    },
    {
      text: "Hassle Free Service & Maintenance",
      image: "/whyCauseway/maintenance.svg",
    },
    {
      text: "24/7 Tracking Support",
      image: "/whyCauseway/tracking.svg",
    },
    {
      text: "Business Regulars",
      image: "/whyCauseway/businessregulars.svg",
    },
    {
      text: "Guaranteed Monthly Income",
      image: "/whyCauseway/guaranteedmonthlyincome.svg",
    },
    {
      text: "Personalized Ownership",
      image: "/whyCauseway/personalizedownership.svg",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-black mb-8">
        Why host with Causeway
      </h2>

      {/* Features Grid */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-full xsm:w-[calc(50%-2rem)] md:w-[calc(33.333%-3rem)] lg:w-[calc(16.666%-3rem)] min-w-[150px]"
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
