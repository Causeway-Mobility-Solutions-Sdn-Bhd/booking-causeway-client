import React from "react";
import { ReasonComponent } from "./_components/ReasonComponent";
import BookNavBar from "@/app/book/_components/BookNavBar";

const page = () => {
  return (
    <>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Cancel Booking
          </h3>
        }
        currencyDrawer={false}
        topBar={true}
      />
      <ReasonComponent />
    </>
  );
};

export default page;
