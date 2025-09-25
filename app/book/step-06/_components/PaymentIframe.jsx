"use client";
import { useAppSelector } from "@/store/hooks";
import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle } from 'lucide-react';

function PaymentIframe() {
  const finalPaymentLink = useAppSelector(
    (state) => state.reservation.finalPaymentLink
  );

  const [loadingState, setLoadingState] = useState("loading");
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (!finalPaymentLink) {
      setLoadingState("error");
      return;
    }

    const testFrame = document.createElement("iframe");
    testFrame.style.display = "none";
    testFrame.src = finalPaymentLink;

    const handleLoad = () => {
      setLoadingState("success");
      setShowIframe(true);
      document.body.removeChild(testFrame);
    };

    const handleError = () => {
      setLoadingState("error");
      document.body.removeChild(testFrame);
    };

    testFrame.onload = handleLoad;
    testFrame.onerror = handleError;

    const timeout = setTimeout(() => {
      setLoadingState("success");
      setShowIframe(true);
      if (document.body.contains(testFrame)) {
        document.body.removeChild(testFrame);
      }
    }, 5000);

    document.body.appendChild(testFrame);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(testFrame)) {
        document.body.removeChild(testFrame);
      }
    };
  }, [finalPaymentLink]);

  const handleRetry = () => {
    setLoadingState("loading");
    setShowIframe(false);
  };

  if (loadingState === "loading") {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
        </div>

        {/* Card Number Field */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="relative">
            <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>

        {/* Expiry and Security Code Row */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>

        {/* Country Field */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Terms Text Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/5" />
        </div>

        {/* Payment Button Skeleton */}
        <div className="space-y-1">
          <div className="w-full h-12 bg-gradient-to-r from-teal-200 via-teal-100 to-teal-200 rounded-md animate-shimmer bg-[length:200%_100%]" />
          <div className="w-full h-12 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-md animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-teal-500" />
          <span className="text-sm text-gray-600 font-medium">
            Preparing secure payment...
          </span>
        </div>

       
      </div>
    );
  }

  if (loadingState === "error") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <p className="text-red-600">Failed to load payment gateway</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-cSecondary text-white rounded hover:opacity-80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      {showIframe && (
        <iframe
          src={finalPaymentLink}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="payment"
          title="Payment Gateway"
        />
      )}
    </div>
  );
}

export default PaymentIframe;
