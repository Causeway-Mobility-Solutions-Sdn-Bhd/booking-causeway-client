"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import React from "react";

function BlackBg() {
  const dispatch = useAppDispatch();
  const openBg = useAppSelector(
    (state) => state.general.openBg
  );

  const handleCloseBg = () => {
    dispatch(setOpenBg(false));
    dispatch(setSidebarOpen(false));
  };

  return (
    <div
      onClick={handleCloseBg}
      className={`blackBg custom-trans ${openBg && "blackBg-active"}`}
    ></div>
  );
}

export default BlackBg;
