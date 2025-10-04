import React from "react";
import SideBar from "../_components/SideBar";
import Nav from "@/components/custom/Nav";
import BottomBar from "../_components/BottomBar";
import Banner from "./_components/Banner";
import WhyHost from "./_components/WhyHost";
import { CausewayEarningsChart } from "./_components/CausewayEarningChart";
import Partners from "./_components/Partners";
import SubmitVehicleInfoForm from "./_components/SubmitVehicleInfoForm";

function page() {
  return (
    <div className="relative">
      <Nav isMain={false} value="Partnership" />
      <SideBar />
      {/* Partnership Page: */}
      <Banner />
      <WhyHost />
      <CausewayEarningsChart />
      <Partners />
      <SubmitVehicleInfoForm />
      <BottomBar />
    </div>
  );
}

export default page;
