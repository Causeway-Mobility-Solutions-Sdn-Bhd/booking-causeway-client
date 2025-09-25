import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { IoChatbox } from "react-icons/io5";
import { ClientPageRoot } from 'next/dist/client/components/client-page';

function BottomBar({ page = 'other' }) {
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FaHome size={20} />,
    },
    {
      name: "Book",
      href: "/book",
      icon: <IoIosSearch size={25} />,
    },
    {
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
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex justify-center items-center flex-col cursor-pointer gap-1 leading-[8px]"
          >
            {/* Icon */}
            <span
              className={`${
                page === item.name ? "text-cSecondary" : "text-cGray"
              }`}
            >
              {item.icon}
            </span>

            {/* Label */}
            <p
              className={`${
                page === item.name ? "text-cSecondary" : "text-cGray"
              } font-semibold text-[13px]`}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BottomBar;
