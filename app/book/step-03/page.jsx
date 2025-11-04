"use client";
import React, { useEffect, useState } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import PriceBottomBar from "../_components/PriceBottomBar";
import AdditionalCharges from "./_components/AdditionalCharges";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import {
  setAdditionalCharges,
  setReservation,
  setSelectedAdditionalCharges,
  setSelectedVehicle,
} from "@/store/slices/reservationSlice";

function page() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);
  const voucherCode = useAppSelector((state) => state.reservation.voucherCode);

  const selectedAdditionalCharges = useAppSelector(
    (state) => state.reservation.selectedAdditionalCharges
  );
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [selectedCharges, setSelectedCharges] = useState({
    20: { quantity: 0 },
  });
  const [finalLoader, setFinalLoader] = useState(false);

  useEffect(() => {
    if (!reservation?.vehicle_class_id) {
      router.push(`/`);
    } else {
      if (reservation?.selected_additional_charges?.length !== 0) {
        const parsedCharges = parseAdditionalCharges(
          reservation.selected_additional_charges
        );
        setSelectedCharges(parsedCharges);
      }
    }
  }, [reservation]);

  const fetchData = async () => {
    try {
      if (reservation?.vehicle_class_id && currentUUID) {
        if (selectedAdditionalCharges?.length === 0) {
          setLoader(true);
        }
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
          coupon_code: voucherCode,
        };

        const response = await hqApi.get(
          "car-rental/reservations/additional-charges",
          { params: requestData }
        );

        if (response?.status === 200) {
          dispatch(setAdditionalCharges(response?.data?.additional_charges));
          if (!reservation?.selected_additional_charges) {
            const ac = transformSelectedCharges();
            handleAddonChnange(ac, false);
          } else {
            handleAddonChnange(reservation?.selected_additional_charges, false);
          }
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

  const parseAdditionalCharges = (arr) => {
    if (!Array.isArray(arr)) return {};

    return arr.reduce((acc, item) => {
      if (typeof item === "string" && item.includes("_")) {
        const [id, qty] = item.split("_");
        acc[Number(id)] = { quantity: Number(qty) };
      } else {
        acc[Number(item)] = { quantity: 0 };
      }
      return acc;
    }, {});
  };

  const handleAddonChnange = async (ac, isFinal) => {
    try {
      if (isFinal) {
        setFinalLoader(true);
      }
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
        isFinal: isFinal,
        coupon_code: voucherCode,
      };

      const params = new URLSearchParams();

      for (const key in requestData) {
        if (requestData[key] !== null && requestData[key] !== undefined) {
          params.append(key, requestData[key]);
        }
      }

      ac?.forEach((charge) => {
        params.append("additional_charges", charge);
      });

      const response = await hqApi.post(
        `car-rental/reservations/additional-charges?${params.toString()}`,
        {}
      );

      if (response?.status === 200) {
        dispatch(setSelectedVehicle(response?.data?.selected_vehicle));
        dispatch(
          setSelectedAdditionalCharges(
            response?.data?.selected_additional_charges
          )
        );

        if (isFinal) {
          dispatch(setReservation(response?.data?.reservation));
          setTimeout(() => {
            setFinalLoader(false);
          }, 1000);
          router.push(`/book/step-04?ssid=${currentUUID}`);
        } else {
          setFinalLoader(false);
          setLoader(false);
        }
      } else {
        setFinalLoader(false);
        setLoader(false);
      }
    } catch (error) {
      setFinalLoader(false);
      setLoader(false);
      console.log(error);
    }
  };

  const transformSelectedCharges = () => {
    return Object.entries(selectedCharges).map(([id, { quantity }]) => {
      const parsedId = parseInt(id, 10);
      return quantity === 0 ? `${parsedId}` : `${parsedId}_${quantity}`;
    });
  };

  return (
    <div>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full  font-semibold">
            Add-Ons
          </h3>
        }
      />
      <div className="py-[20px] mt-[50px] sm:mt-[70px] sm:py-[30px] max-w-[1400px] mx-auto w-[93%] sm:w-[95%] ">
        <div className="mt-[10px] flex justify-start items-start gap-5">
          <div className="flex-1">
            <AdditionalCharges
              selectedCharges={selectedCharges}
              setSelectedCharges={setSelectedCharges}
              fetchData={handleAddonChnange}
              fetchLoader={loader}
            />
          </div>
          <SideBar step={3} />
        </div>
      </div>
      <PriceBottomBar
        step={3}
        selectedCharges={selectedCharges}
        setSelectedCharges={setSelectedCharges}
        fetchData={handleAddonChnange}
        finalLoader={finalLoader}
        fetchLoader={loader}
      />
    </div>
  );
}

export default page;
