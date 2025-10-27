"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSuitcase } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { IoChatbox } from "react-icons/io5";
import { useLoggedUser } from "@/store/hooks";

function BottomBar() {
  const pathname = usePathname();
  const user = useLoggedUser();
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FaHome size={20} />,
    },
    {
      name: "My Trips",
      href: "/manage",
      icon: <FaSuitcase size={20} />,
    },
    user
      ? {
          name: "Profile",
          href: "/profile",
          icon: <BsPersonFill size={20} />,
        }
      : {
          name: "Log in",
          href: "/login",
          icon: <BsPersonFill size={20} />,
        },
    {
      name: "Chat",
      href: "/support",
      icon: <IoChatbox size={20} />,
    },
  ];

  return (
    <div className="z-90 border-top fixed bottom-0 border-cGray right-0 left-0 py-3 bg-white block sm:hidden">
      <div className="max-w-[1400px] w-[90%] sm:w-[95%] mx-auto flex justify-between items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.onClick) {
            // Render as button for logout
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex justify-center items-center flex-col cursor-pointer gap-1 leading-[8px]"
              >
                <span className="text-cGray">{item.icon}</span>
                <p className="text-cGray font-semibold text-[13px]">
                  {item.name}
                </p>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex justify-center items-center flex-col cursor-pointer gap-1 leading-[8px]"
            >
              <span
                className={`${isActive ? "text-cSecondary" : "text-cGray"}`}
              >
                {item.icon}
              </span>
              <p
                className={`${
                  isActive ? "text-cSecondary" : "text-cGray"
                } font-semibold text-[13px]`}
              >
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomBar;