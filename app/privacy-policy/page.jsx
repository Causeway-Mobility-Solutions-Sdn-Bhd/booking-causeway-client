"use client";
import React from "react";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";
import Nav from "@/components/custom/Nav";

export default function TermsConditionsPage() {

  return (
    <div className="relative">
      <Nav isMain={false} value="Privacy Policy" />
      <SideBar />
        {/* Privacy Policy Should Come here */}
      <BottomBar />
    </div>
  );
}
