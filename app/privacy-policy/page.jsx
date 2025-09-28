"use client";
import React from "react";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";
import PrivacyPolicy from "./_components/PrivacyPolicy";
import Nav from "@/components/custom/Nav";

export default function PrivacyPolicyPage() {

  return (
    <div className="relative">
      <Nav isMain={false} value="Privacy Policy" />
      <SideBar />
      <PrivacyPolicy/>
      <BottomBar />
    </div>
  );
}
