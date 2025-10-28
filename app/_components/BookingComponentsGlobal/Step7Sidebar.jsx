"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TicketPlus, X } from "lucide-react";
import { MdEditCalendar } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const Step7Sidebar = ({ manage = false }) => {
  const router = useRouter();
  const steps = [
    {
      icon: "/next-steps/requireddocs.webp",
      title: "Bring required documents",
      description:
        "Please bring your valid driver’s license, ID/Passport and security deposit.",
    },
    {
      icon: "/next-steps/vehicleinspection.webp",
      title: "Vehicle Inspection",
      description:
        "Together with our staff, inspect the vehicle before driving off.",
    },
    {
      icon: "/next-steps/route.webp",
      title: "Enjoy your rental",
      description:
        "Have a safe and pleasant journey with your Causeway rental car.",
    },
  ];
  const manageOptions = [
    {
      icon: <TicketPlus size={20} className="text-cSecondary" />,
      title: "Add-On Services",
      route: "add-ons",
    },
    {
      icon: <MdEditCalendar size={20} className="text-cSecondary" />,
      title: "Edit Pickup & Return Details",
      route: "edit-pickup",
    },
    {
      icon: <FaUserEdit size={20} className="text-cSecondary" />,
      title: "Edit Customer Details",
      route: "edit-customer",
    },
    {
      icon: <X size={20} className="text-cSecondary" />,
      title: "Cancel Booking",
      route: "cancel",
    },
  ];
  return (
    <div className="w-full lg:w-[350px]">
      {manage && (
        <>
          <h2 className="text-[18px] font-bold mb-4">Manage Booking</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 mb-6">
            {manageOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => router.push(`/manage/${option.route}`)}
                className="bg-white gap-3 rounded-md shadow-sm flex items-center px-3 h-[50px] hover:shadow-md transition border border-gray-100"
              >
                <div className="flex justify-center items-center">
                  {option.icon}
                </div>
                <h3 className="text-black text-left font-normal text-[12px] leading-tight">
                  {option.title}
                </h3>
              </button>
            ))}
          </div>
        </>
      )}
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
