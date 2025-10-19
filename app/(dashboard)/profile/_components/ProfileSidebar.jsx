"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FaUser } from "react-icons/fa6";
import { BiSolidIdCard } from "react-icons/bi";
import { HiMiniShieldExclamation } from "react-icons/hi2";
import { RiQuestionnaireFill } from "react-icons/ri";
const ProfileSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "personal", label: "Personal information", icon: FaUser },
    { id: "license", label: "License information", icon: BiSolidIdCard },
    { id: "security", label: "Security", icon: HiMiniShieldExclamation },
    { id: "support", label: "Support", icon: RiQuestionnaireFill },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full lg:w-[381px]">
      <nav className="space-y-0">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.id);
          return (
            <div key={item.id}>
              <button
                onClick={() => router.push(`/profile/${item.id}`)}
                className={`w-full cursor-pointer flex items-center text-black justify-between px-2 py-2 rounded-xl transition-all hover:font-semibold
                ${isActive ? "font-semibold" : "font-normal"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 text-black`} />
                  <span className={`text-sm `}>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-600" />
              </button>

              {/* Divider between items (except last one) */}
              {index < menuItems.length - 1 && (
                <div className="border-b border-gray-100 my-2"></div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
