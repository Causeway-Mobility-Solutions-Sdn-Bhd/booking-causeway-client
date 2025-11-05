import React from "react";
import Tabs from "./Tabs";
import SubNavBar from "@/components/custom/SubNavBar";

function Header({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="font-bold">
        <SubNavBar name="Manage Bookings" />
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Header;
