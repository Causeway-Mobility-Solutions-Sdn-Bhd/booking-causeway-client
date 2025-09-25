"use client";
import React, { useEffect, useState } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import PriceBottomBar from "../_components/PriceBottomBar";

import PolicyLeftContent from "./_components/PolicyLeftContent";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import {
  setFinalPaymentLink,
  setReservation,
  setSelectedAdditionalCharges,
  setSelectedVehicle,
} from "@/store/slices/reservationSlice";

function Page() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const router = useRouter();

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
          `car-rental/reservations/additional-charges?${params.toString()}`,
          {}
        );

        if (response?.status === 200) {
          dispatch(setReservation(response?.data?.reservation));
          dispatch(setSelectedVehicle(response?.data?.selected_vehicle));
          dispatch(
            setSelectedAdditionalCharges(
              response?.data?.selected_additional_charges
            )
          );
          setLoader(false);
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const conformReservation = async () => {
    setSubmitLoader(true);

    try {
      const response = await hqApi.post(
        "car-rental/reservations/conform-reservation"
      );

      if(response?.data?.status_code === 200){
        console.log(response?.data?.data)
        payNowReservation(response?.data?.data);
      }else{
        setSubmitLoader(false);
      }

      console.log("Reservation confirmed:", response?.data?.data);
    } catch (error) {
      console.log("Error confirming reservation:", error);
    }
  };

  const payNowReservation = async (reservedReservationDetail) => {
    const reservation = reservedReservationDetail?.reservation || {};
    const outstandingBalance =reservedReservationDetail?.total?.outstanding_balance?.amount || "0.00";
    const reservationId = reservation?.id || "N/A";
    const paymentDue = (parseFloat(outstandingBalance) * 0.1).toFixed(2);
    const reservationUid = reservation?.uuid;
    const domain = window.location.origin;

    await hqApi
      .post("car-rental/reservations/process-payment", null, {
        params: {
          amount: paymentDue,
          item_id: reservationId,
          label: `Reservation ${reservationId}`,
          description: `Payment From API - Reservation ${reservationId}`,
          external_redirect: `${domain}/book/conform-reservation/${reservationUid}`,
        },
      })
      .then((res) => {
        if (res?.status == 200) {
          console.log(res?.data)
          const paymentLink = res?.data?.payment_gateways_transaction?.external_url
          console.log(res?.data?.payment_gateways_transaction?.external_url)
          
          dispatch(setFinalPaymentLink(paymentLink))
        router.push(`/book/step-06?ssid=${currentUUID}`);
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
      }).finally(() => {
        setSubmitLoader(false);
      });
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
        submitLoader={submitLoader}
        onSubmit={conformReservation}
      />
    </div>
  );
}

export default Page;
