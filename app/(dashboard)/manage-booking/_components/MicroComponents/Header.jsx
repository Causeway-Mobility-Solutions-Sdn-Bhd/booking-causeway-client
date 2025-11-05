"use client";
import React from "react";
import Tabs from "./Tabs";
import { IoMdMenu } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import { useRouter } from "next/navigation";

function Header({ activeTab, setActiveTab }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpenSidebar = () => {
    dispatch(setOpenBg(true));
    dispatch(setSidebarOpen(true));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      {/* Top Navigation Bar */}
      <div className="w-full py-4 border-b border-gray-200">
        <div className="flex justify-between items-center w-[95%] max-w-[1400px] mx-auto relative">
          {/* Back Button - Mobile Only */}
          <FaChevronLeft
            color="#2DBDB6"
            size={20}
            className="block sm:hidden cursor-pointer"
            onClick={handleBack}
          />

          {/* Title - Centered on Mobile */}
          <h3 className="font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 sm:relative sm:left-0 sm:translate-x-0">
            Manage Bookings
          </h3>

          {/* Hamburger Menu - Mobile Only */}
          <IoMdMenu
            onClick={handleOpenSidebar}
            color="#2DBDB6"
            size={35}
            className="block sm:hidden cursor-pointer"
          />

          {/* Desktop Menu Placeholder */}
          <div className="hidden sm:block">
            {/* Add desktop navigation items here if needed */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Header;