"use client";
import React from "react";
import FindBookingForm from "./_components/Find Booking";
import SideBar from "../_components/SideBar";
import Nav from "../_components/Nav";
import BottomBar from "../_components/BottomBar";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SubNavBar from "@/components/custom/SubNavBar";
import { useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";

export default function ManageBookingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOpenSidebar = () => {
    dispatch(setOpenBg(true));
    dispatch(setSidebarOpen(true));
  };

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <SubNavBar
        name="Find Booking"
        menuRequired={true}
        onOpenMenu={handleOpenSidebar}
      />

      <SideBar />

      {/* Main Content */}
      <div className="pt-[80px] pb-24 sm:pb-8">
        <FindBookingForm />
      </div>

      <BottomBar />
    </div>
  );
}
