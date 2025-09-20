import React from "react";
import PolicyBox from "./PolicyBox";

import { BsLightningCharge } from "react-icons/bs";
import { LuCalendarX2 } from "react-icons/lu";
import { TbRating18Plus } from "react-icons/tb";
import { BiIdCard } from "react-icons/bi";
import { FaCar } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineGift } from "react-icons/hi2";
const PolicyLeftContent = () => {
  return (
    <div className="flex-1 w-full">
      <div className="mb-2">
        <h1 className="text-[18px] mb-3 font-bold">Policies</h1>

        <PolicyBox
          heading="Booking Policies"
          items={[
            {
              icon: <BsLightningCharge size={18} />,
              description: "Instant confirmation",
            },
          ]}
        />
        <PolicyBox
          heading="Cancellation Policy"
          items={[
            {
              icon: <LuCalendarX2 size={18} />,
              description: "Free cancellation before pick up",
            },
          ]}
        />

        <h1 className="text-[18px] mt-5 mb-3 font-bold">Important Info</h1>

        <PolicyBox
          heading="Driver’s age requirements"
          items={[
            {
              icon: <TbRating18Plus size={18} />,
              description: "Policy on driver’s age",
            },
          ]}
        />
        <PolicyBox
          heading="Required documents for pick up"
          items={[
            {
              icon: <BiIdCard size={18} />,
              description: "Valid Passport/ID",
            },
            {
              icon: <FaCar size={18} />,
              description: "Driving license",
            },
            {
              icon: <RiMoneyDollarBoxLine size={18} />,
              description: "Deposit payment",
            },
            {
              icon: <HiOutlineGift size={18} />,
              description: "Vouchers (if any)",
            },
          ]}
        />

        <h1 className="text-[18px] mt-5 mb-3 font-bold">Tips for Drivers</h1>

        <PolicyBox
          variant="bullet"
          heading="Self-driving precautions"
          items={[
            { description: "Pick-up/return times" },
            { description: "Additional drivers" },
            { description: "About special fees" },
            { description: "Car pick-up procedure" },
          ]}
        />
      </div>
    </div>
  );
};

export default PolicyLeftContent;
