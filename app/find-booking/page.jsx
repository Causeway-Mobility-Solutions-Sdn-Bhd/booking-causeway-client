"use client";
import React from "react";
import FindBookingForm from "./_components/Find Booking";
import SideBar from "../_components/SideBar";
import Nav from "../_components/Nav";
import BottomBar from "../_components/BottomBar";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ManageBookingPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <div className="fixed top-7 left-4 z-[110] sm:hidden">
        <FaChevronLeft
          color="#2DBDB6"
          size={20}
          className="cursor-pointer"
          onClick={handleBack}
        />
      </div>

      {/* Nav Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Nav isMain={false} value="Find Bookings" />
      </div>

      <SideBar />
      
      {/* Main Content */}
      <div className="pt-[80px] pb-24 sm:pb-8">
        <FindBookingForm />
      </div>
      
      <BottomBar />
    </div>
  );
}