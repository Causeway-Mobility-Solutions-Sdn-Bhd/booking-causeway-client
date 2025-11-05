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
    <div className="relative">
      {/* Back Button - Positioned on top of Nav */}
      <div className="fixed top-7 left-4 z-[110] sm:hidden">
        <FaChevronLeft
          color="#2DBDB6"
          size={20}
          className="cursor-pointer"
          onClick={handleBack}
        />
      </div>

      <Nav isMain={false} value="Privacy Policy" />
      <SideBar />
      <PrivacyPolicy/>
      <BottomBar />
    </div>
  );
}