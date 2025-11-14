"use client";
import SubNavBar from "@/components/custom/SubNavBar";
import React from "react";
import SavedVehicle from "./_components/SavedVehicle";
import BottomBar from "../_components/BottomBar";
import SideBar from "@/app/_components/SideBar";
import { useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";

function page() {
  const dispatch = useAppDispatch();
  const handleOpenSidebar = () => {
    dispatch(setOpenBg(true));
    dispatch(setSidebarOpen(true));
  };
  return (
    <>
      <SideBar />
      <div>
        <SubNavBar
          onOpenMenu={handleOpenSidebar}
          name="Favourite Vehicles"
          menuRequired={true}
        />
        <SavedVehicle />
      </div>
      <BottomBar />
    </>
  );
}

export default page;
