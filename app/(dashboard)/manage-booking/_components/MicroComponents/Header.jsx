import React from "react";
import Tabs from "./Tabs";
import SubNavBar from "@/components/custom/SubNavBar";
import { useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import SideBar from "@/app/_components/SideBar";

function Header({ activeTab, setActiveTab }) {
  const dispatch = useAppDispatch();
  const handleOpenSidebar = () => {
    dispatch(setOpenBg(true));
    dispatch(setSidebarOpen(true));
  };
  return (
    <>
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="font-bold">
          <SubNavBar
            onOpenMenu={handleOpenSidebar}
            menuRequired={true}
            name="Manage Bookings"
          />
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <SideBar />
    </>
  );
}

export default Header;
