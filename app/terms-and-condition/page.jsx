"use client";
import React from "react";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import TermsConditions from "./_components/TermsConditions";
import Nav from "@/components/custom/Nav";

export default function TermsConditionsPage() {
  const sidebarOpen = useAppSelector((state) => state.general.sidebarOpen);
  const openBg = useAppSelector((state) => state.general.openBg);
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
    dispatch(setOpenBg(!openBg));
  };

  const handleBackgroundClick = () => {
    if (openBg) {
      dispatch(setSidebarOpen(false));
      dispatch(setOpenBg(false));
    }
  };

  return (
    <div className="relative">
      <Nav isMain={false} value="Terms And Condition" />
      <SideBar />
      <TermsConditions />
      <BottomBar />
    </div>
  );
}
