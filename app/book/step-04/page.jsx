"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import PriceBottomBar from "../_components/PriceBottomBar";

import GuestLoginToggler from "@/components/custom/GuestLoginToggler";
import CustomerDetailsForm from "./_components/CustomerDetailsForm";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import {
  setReservation,
  setSelectedAdditionalCharges,
  setSelectedVehicle,
} from "@/store/slices/reservationSlice";
import LoginDrawer from "./_components/LoginDrawer";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";

function Page() {
  const [submitLoader, setSubmitLoader] = useState(false);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const currentUUID = useAppSelector((state) => state.reservation.currentUUID);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [loginDrawer, setIsLoginDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState("guest");

  const router = useRouter();
  const submitFormRef = useRef(null);
  const [formData, setFormData] = useState(null);
  const loggedUser = useAppSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    if (!reservation?.vehicle_class_id) {
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

        const responseData = response.data;
        const status = response.status;

        if (status === 200) {
          const customerId = responseData.reservation?.customer_id;

          if (customerId) {
            const customerRes = await hqApi.get(
              `customers/get-customer/${customerId}`
            );

            const transformData = transformCustomerData(customerRes.data);
            setFormData(transformData);
          }
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
  }, [loggedUser]);

  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    } else {
      console.log("Form ref missing");
    }
  }, []);

  return (
    <div>
      <BookNavBar
        type="booking"
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Customer details
          </h3>
        }
      />

      <div className="!pb-32 py-[20px] mt-[70px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[92%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            {!loggedUser && (
              <GuestLoginToggler
                setIsDrawerOpen={setIsLoginDrawer}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}

            {/* Customer Form */}
            <CustomerDetailsForm
              dataAvailable={formData}
              submitFormRef={submitFormRef}
              setSubmitLoader={setSubmitLoader}
            />
          </div>
          <SideBar step={4} />
        </div>
      </div>
      <LoginDrawer
        isDrawerOpen={loginDrawer}
        setIsDrawerOpen={setIsLoginDrawer}
        setActiveTab={setActiveTab}
      />

      <PriceBottomBar
        submitLoader={submitLoader}
        step={4}
        onSubmit={triggerSubmit}
        fetchLoader={loader}
      />
    </div>
  );
}

export default Page;
