import React from "react";
import PolicyBox from "./PolicyBox";

import { BsLightningCharge } from "react-icons/bs";
import { LuCalendarX2 } from "react-icons/lu";
import { TbRating18Plus } from "react-icons/tb";
import { BiIdCard } from "react-icons/bi";
import { FaCar } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineGift } from "react-icons/hi2";
import SubHead from "@/components/custom/SubHead";
const PolicyLeftContent = () => {
  return (
    <div className="flex-1 w-full">
      <div className="mb-2">
        <div className="mt-4" >
          <SubHead text="Policies" />

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
        </div>

        <div className="mt-4">
          <SubHead text="Important Info" />

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
        </div>

        <div className="mt-4">
          <SubHead text="Tips for Drivers" />

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
    </div>
  );
};

export default PolicyLeftContent;
