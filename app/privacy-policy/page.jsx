"use client";
import React from "react";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";
import PrivacyPolicy from "./_components/PrivacyPolicy";
import Nav from "../_components/Nav";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
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
        <Nav isMain={false} value="Privacy Policy" />
      </div>

      <SideBar />
      
      {/**/}
      <div className="pt-[80px] pb-24 sm:pb-8">
        <PrivacyPolicy/>
      </div>
      
      <BottomBar />
    </div>
  );
}