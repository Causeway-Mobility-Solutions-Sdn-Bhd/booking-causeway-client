"use client";
import React from "react";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";
import TermsConditions from "./_components/TermsConditions";
import Nav from "@/app/_components/Nav";

export default function TermsConditionsPage() {

  return (
    <div className="relative">
      <Nav isMain={false} value="Terms & Condition" />
      <SideBar />
      <TermsConditions />
      <BottomBar />
    </div>
  );
}
