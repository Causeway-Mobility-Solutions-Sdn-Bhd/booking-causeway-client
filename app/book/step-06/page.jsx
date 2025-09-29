"use client";
import React, { useEffect } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";

import { useAppSelector } from "@/store/hooks";
import PaymentIframe from "./_components/PaymentIframe";
import { useRouter } from "next/navigation";

function Page() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const finalPaymentLink = useAppSelector((state) => state.reservation.finalPaymentLink);
  const router = useRouter()


  useEffect(() => {
    if (!reservation?.customer_id) {
      router.push(`/`);
    }else{
      if(finalPaymentLink === ""){
        router.push(`/`);
      }
    }
  }, [reservation , finalPaymentLink]);


  return (
    <div>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Confirm Payment
          </h3>
        }
      />
      <div className="py-[20px] mt-[50px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            {
              finalPaymentLink && (<PaymentIframe />)
            }
          </div>
          <SideBar step={7} />
        </div>
      </div>

      {/* <PriceBottomBar step={7} fetchLoader={loader} /> */}
    </div>
  );
}

export default Page;
