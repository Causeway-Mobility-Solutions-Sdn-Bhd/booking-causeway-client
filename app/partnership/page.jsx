import React from "react";
import SideBar from "../_components/SideBar";
import Nav from "@/components/custom/Nav";
import BottomBar from "../_components/BottomBar";
import Banner from "./_components/Banner";
import WhyHost from "./_components/WhyHost";
import { CausewayEarningsChart } from "./_components/CausewayEarningChart";

function page() {
  return (
    <div className="relative">
      <Nav isMain={false} value="Partnership" />
      <SideBar />
      {/* Partnership Should Come here */}
      <Banner />
      <WhyHost />
      <CausewayEarningsChart />
      <BottomBar />
    </div>
  );
}

export default page;
