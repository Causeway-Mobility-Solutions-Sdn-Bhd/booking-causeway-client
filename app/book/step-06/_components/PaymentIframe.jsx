"use client";
import { useAppSelector } from "@/store/hooks";
import React, { useState, useEffect } from "react";
import PaymentOptionCard from "./PaymentOptionCard";
import {
  useConfirmReservationMutation,
  useProcessPaymentMutation,
} from "@/store/api/reservationApiSlice";
import { PaymentLoader } from "@/components/custom/Skeleton";
import { useDispatch } from "react-redux";
import { setFinalPayment } from "@/store/slices/reservationSlice";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";

function PaymentIframe() {
  const finalPayment = useAppSelector(
    (state) => state.reservation.finalPayment
  );

  const [loadingState, setLoadingState] = useState("loading");
  const [showIframe, setShowIframe] = useState(false);

  const [confirmReservation, { isLoading: isConfirming }] =
    useConfirmReservationMutation();
  const [processPayment, { isLoading: isPaying }] = useProcessPaymentMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!finalPayment?.link) {
      setLoadingState("error");
      return;
    }

    const testFrame = document.createElement("iframe");
    testFrame.style.display = "none";
    testFrame.src = finalPayment?.link;

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
  }, [finalPayment]);

  const handleConfirmReservation = async (data) => {
    try {
      console.log(data?.couponCode);
      const response = await confirmReservation({
        couponCode: data?.couponCode,
      }).unwrap();

      if (response?.status_code === 200) {
        const reservedReservationDetail = response.data;
        const reservationData = reservedReservationDetail?.reservation || {};
        const outstandingBalance =
          reservedReservationDetail?.total?.outstanding_balance?.amount ||
          "0.00";
        const reservationId = reservationData?.id || "N/A";
        const paymentDue =
          data?.paymentType === "full"
            ? parseFloat(outstandingBalance).toFixed(2)
            : parseFloat(outstandingBalance / 2).toFixed(2);
        const reservationUid = reservationData?.uuid;
        const domain = window.location.origin;
        console.log(reservedReservationDetail);
        console.log({
          amount: paymentDue,
          reservationId,
          reservationUid,
          domain,
        });

        const paymentRes = await processPayment({
          amount: paymentDue,
          reservationId,
          reservationUid,
          domain,
        }).unwrap();

        const paymentLink =
          paymentRes?.payment_gateways_transaction?.external_url;

        if (paymentLink) {
          if (data?.couponCode) {
            if (reservedReservationDetail?.applicable_discounts?.length === 0) {
              showErrorToast("Invalid Coupan Code");
            } else {
              showSuccessToast("Coupan Code Added Successfully");
            }
          }
          dispatch(
            setFinalPayment({ link: paymentLink, price: outstandingBalance })
          );
        }
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  return (
    <div>
      <PaymentOptionCard handleConfirmReservation={handleConfirmReservation} />

      {loadingState === "loading" || isPaying || isConfirming ? (
        <PaymentLoader />
      ) : (
        showIframe && (
          <div className="w-full h-[105vh] relative flex items-center justify-center mt-3">
            <iframe
              src={finalPayment?.link}
              className="w-full h-full border-0"
              allow="payment"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title="Payment Gateway"
            >
            </iframe>
          </div>
        )
      )}
    </div>
  );
}

export default PaymentIframe;
