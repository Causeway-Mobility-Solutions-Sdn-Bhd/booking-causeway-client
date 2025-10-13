"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BookNavBar from "../_components/BookNavBar";
import SideBar from "../_components/SideBar";
import hqApi from "@/lib/hqApi";
import { useRouter } from "next/navigation";
import PriceBottomBar from "../_components/PriceBottomBar";

import GuestLoginToggler from "@/components/custom/GuestLoginToggler";
import CustomerDetailsForm from "./_components/CustomerDetailsForm";
import { useAppSelector } from "@/store/hooks";
import LoginDrawer from "./_components/LoginDrawer";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import {
  usePostAdditionalChargesMutation,
} from "@/store/api/reservationApiSlice";

function Page() {
  const [loginDrawer, setIsLoginDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState("guest");
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setLoading] = useState(null);
  

  const reservation = useAppSelector((state) => state.reservation.reservation);

  const router = useRouter();
  const submitFormRef = useRef(null);

  const [postAdditionalCharges ] =
    usePostAdditionalChargesMutation();

  useEffect(() => {
    fetchData();
  }, [reservation?.customer_id]);

  const fetchData = async () => {
    try {
      setLoading(true)
      const ac = reservation?.selected_additional_charges
      const result = await postAdditionalCharges({ac }).unwrap();
      console.log(result);
      if (result) {
        fetchCustomer();
      }else{
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error submitting additional charges:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      if (reservation?.customer_id) {
        const response = await hqApi.get(
          `customers/get-customer/${reservation.customer_id}`
        );

        const transformedData = transformCustomerData(response.data);
        setFormData(transformedData);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("Failed to fetch customer data:", error);
    }
  };

  useEffect(() => {
    if (!reservation?.vehicle_class_id) {
      router.push(`/`);
    }
  }, [reservation]);

  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    }
  }, []);

  return (
    <div>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Customer details
          </h3>
        }
      />

      <div className="!pb-32 py-[20px] mt-[70px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[92%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            {/* <GuestLoginToggler
              setIsDrawerOpen={setIsLoginDrawer}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            /> */}

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
        fetchLoader={isLoading}
      />
    </div>
  );
}

export default Page;
