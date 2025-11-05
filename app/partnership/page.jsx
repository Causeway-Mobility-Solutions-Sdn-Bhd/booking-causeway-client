"use client";
import React from "react";
import SideBar from "../_components/SideBar";
import Nav from "@/app/_components/Nav";
import BottomBar from "../_components/BottomBar";
import Banner from "./_components/Banner";
import WhyHost from "./_components/WhyHost";
import { CausewayEarningsChart } from "./_components/CausewayEarningChart";
import Partners from "./_components/Partners";
import SubmitVehicleInfoForm from "./_components/SubmitVehicleInfoForm";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

function PartnershipPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative min-h-screen">
      {/* Back Button - Positioned on top of Nav */}
      <div className="fixed top-7 left-4 z-[110] sm:hidden">
        <FaChevronLeft
          color="#2DBDB6"
          size={20}
          className="cursor-pointer"
          onClick={handleBack}
        />
      </div>

      {/* Fixed Nav Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Nav isMain={false} value="Partnership" />
      </div>

      <SideBar />
      
      {/* Main Content with padding for fixed navbar and bottom bar */}
      <div className="pt-[80px] pb-24 sm:pb-8">
        {/* Partnership Page: */}
        <Banner />
        <WhyHost />
        <CausewayEarningsChart />
        <Partners />
        <SubmitVehicleInfoForm />
      </div>
      
      <BottomBar />
    </div>
  );
}

export default PartnershipPage;