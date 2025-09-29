"use client";
import React, { useState } from "react";
import ShowPickDrop from "./ShowPickDrop";
import Filter from "./Filter";
import VehicleDetail from "./VehicleDetail";
import PriceSummary from "./PriceSummary";

function SideBar({ topBarFilter, setTobBarFilter, vehiTypes, step }) {
  const [loader, setLoader] = useState(false);
  const [reLoader, setReLoader] = useState(false);

  return (
    <div className="w-[30%] flex-shrink-0 hidden md:block">
      <div className="sticky top-0 h-fit">
        

        {step >= 3 && (
          <>
            <VehicleDetail />
            <PriceSummary />
          </>
        )}

        <ShowPickDrop />

        {step === 2 && (
          <Filter
            setTobBarFilter={setTobBarFilter}
            topBarFilter={topBarFilter}
            vehiTypes={vehiTypes}
            loader={loader}
            setReLoader={setReLoader}
            setLoader={setLoader}
            variant={"secondary"}
          />
        )}
      </div>
    </div>
  );
}

export default SideBar;
