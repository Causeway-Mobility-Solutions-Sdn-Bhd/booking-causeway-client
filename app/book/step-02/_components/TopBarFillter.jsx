"use client";
import React, { useState } from "react";
import FilterDrawer from "./FilterDrawer";
import CarTypeDrawer from "./CarTypeDrawer";
import SortDrawer from "./SortDrawer";
import SeatsDrawer from "./SeatsDrawer";

function TopBarFillter({topBarFilter , vehiTypes , setTobBarFilter}) {
  const [filterOpen, SetFilterOpen] = useState();
  const [isCartTypeDrawerOpen, setCartTypeIsDrawerOpen] = useState()
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState()
  const [isSeatsDrawerOpen, setIsSeatsDrawerOpen] = useState()

  return (
    <div className="w-[95%] mx-auto py-3 block sm:hidden">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex justify-start gap-2 items-center">
          <SortDrawer isDrawerOpen={isSortDrawerOpen} setIsDrawerOpen={setIsSortDrawerOpen} topBarFilter={topBarFilter} setTopBarFilter={setTobBarFilter}  />
          <CarTypeDrawer isDrawerOpen={isCartTypeDrawerOpen} setIsDrawerOpen={setCartTypeIsDrawerOpen} topBarFilter={topBarFilter} setTopBarFilter={setTobBarFilter} vehiTypes={vehiTypes}  />
          <SeatsDrawer  isDrawerOpen={isSeatsDrawerOpen} setIsDrawerOpen={setIsSeatsDrawerOpen} topBarFilter={topBarFilter} setTopBarFilter={setTobBarFilter}   />
        </div>
        <FilterDrawer
          isDrawerOpen={filterOpen}
          setIsDrawerOpen={SetFilterOpen}
          setTobBarFilter={setTobBarFilter}
          topBarFilter={topBarFilter }
          vehiTypes={vehiTypes}
        />
      </div>
    </div>
  );
}

export default TopBarFillter;


