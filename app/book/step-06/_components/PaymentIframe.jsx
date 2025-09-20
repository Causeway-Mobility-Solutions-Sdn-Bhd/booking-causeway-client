"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";

function PaymentIframe() {
  const finalPaymentLink = useAppSelector((state) => state.reservation.finalPaymentLink);  
  return (
    <div className="w-full h-screen">
      <iframe
        src={finalPaymentLink}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allow="payment"
      ></iframe>
    </div>
  );
}

export default PaymentIframe
