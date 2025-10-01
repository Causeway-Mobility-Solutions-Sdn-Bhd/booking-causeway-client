"use client";
import React, { useEffect, useState } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import PriceBottomBar from "../_components/PriceBottomBar";
import PolicyLeftContent from "./_components/PolicyLeftContent";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import {
  setFinalPayment,
  setReservation,
  setSelectedAdditionalCharges,
  setSelectedVehicle,
} from "@/store/slices/reservationSlice";

import {
  useConfirmReservationMutation,
  useProcessPaymentMutation,
} from "@/store/api/reservationApiSlice";
import hqApi from "@/lib/hqApi";

function Page() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const [confirmReservation, { isLoading: isConfirming }] =
    useConfirmReservationMutation();
  const [processPayment, { isLoading: isPaying }] = useProcessPaymentMutation();

  useEffect(() => {
    if (!reservation?.customer_id) {
      router.push(`/`);
    }
  }, [reservation]);

  const fetchData = async () => {
    try {
      if (reservation?.vehicle_class_id && currentUUID) {
        setLoader(true);
        const requestData = {
          pick_up_date: reservation?.pick_up_date
            ? format(reservation.pick_up_date, "yyyy-MM-dd")
            : null,
          pick_up_time: reservation?.pick_up_time || null,
          return_date: reservation?.return_date
            ? format(reservation.return_date, "yyyy-MM-dd")
            : null,
          return_time: reservation?.return_time || null,
          pick_up_location: reservation?.pick_up_location?.id || null,
          return_location: reservation?.return_location?.id || null,
          brand_id: reservation?.brand_id ?? null,
          vehicle_class_id: reservation?.vehicle_class_id,
        };

        const params = new URLSearchParams();
        for (const key in requestData) {
          if (requestData[key] !== null && requestData[key] !== undefined) {
            params.append(key, requestData[key]);
          }
        }

        if (reservation?.selected_additional_charges) {
          reservation?.selected_additional_charges?.forEach((charge) => {
            params.append("additional_charges", charge);
          });
        } else {
          params.append("additional_charges", "20");
        }

        const response = await hqApi.post(
          `/car-rental/reservations/additional-charges?${params.toString()}`,
          {}
        );
        console.log(response)

        const data = response?.data;
        if (response.status === 200) {
          dispatch(setReservation(data?.reservation));
          dispatch(setSelectedVehicle(data?.selected_vehicle));
          dispatch(
            setSelectedAdditionalCharges(data?.selected_additional_charges)
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmReservation = async () => {
    try {
      const response = await confirmReservation().unwrap();

      if (response?.status_code === 200) {
        const reservedReservationDetail = response.data;
        const reservationData = reservedReservationDetail?.reservation || {};
        const outstandingBalance =
          reservedReservationDetail?.total?.outstanding_balance?.amount ||
          "0.00";
        const reservationId = reservationData?.id || "N/A";
        const paymentDue = parseFloat(outstandingBalance).toFixed(2);
        const reservationUid = reservationData?.uuid;
        const domain = window.location.origin;

        const paymentRes = await processPayment({
          amount: paymentDue,
          reservationId,
          reservationUid,
          domain,
        }).unwrap();

        const paymentLink =
          paymentRes?.payment_gateways_transaction?.external_url;

        if (paymentLink) {
          dispatch(setFinalPayment({link:paymentLink , price:outstandingBalance}));
          router.push(`/book/step-06?ssid=${currentUUID}`);
        }
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  return (
    <div>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Policies
          </h3>
        }
      />
      <div className="!pb-[80px] py-[2px] mt-[70px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[95%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <PolicyLeftContent />
          <SideBar step={5} />
        </div>
      </div>

      <PriceBottomBar
        step={5}
        fetchLoader={loader}
        submitLoader={isConfirming || isPaying}
        onSubmit={handleConfirmReservation}
      />
    </div>
  );
}

export default Page;
