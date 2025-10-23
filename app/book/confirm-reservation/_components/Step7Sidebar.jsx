import React from "react";
import Image from "next/image";

const Step7Sidebar = () => {
  const steps = [
    {
      icon: "/next-steps/requireddocs.svg",
      title: "Bring required documents",
      description:
        "Please bring your valid driver’s license, ID/Passport and security deposit.",
    },
    {
      icon: "/next-steps/vehicleinspection.png",
      title: "Vehicle Inspection",
      description:
        "Together with our staff, inspect the vehicle before driving off.",
    },
    {
      icon: "/next-steps/route.png",
      title: "Enjoy your rental",
      description:
        "Have a safe and pleasant journey with your Causeway rental car.",
    },
  ];

  return (
    <div className="w-full lg:w-[350px]">
      <h2 className="text-[18px] font-bold mb-4">What's Next</h2>

      <div className="bg-white rounded-lg shadow-sm px-4 py-2">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-start gap-3 py-3">
              <div className="flex-shrink-0">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={33}
                  height={33}
                  className="w-auto h-auto"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-[12px]">{step.description}</p>
              </div>
            </div>

            {/* Divider - don't show after last item */}
            {index < steps.length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step7Sidebar;
