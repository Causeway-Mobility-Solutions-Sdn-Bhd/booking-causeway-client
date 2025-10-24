"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppSelector } from "@/store/hooks";

import ProfileUpdateForm from "../_components/ProfileUpdateForm";

import { useGetCustomerQuery } from "@/store/api/customerApiSlice";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import DriverLicenseForm from "../_components/DriverLicenseForm";
import SaveBottomBar from "@/app/_components/SaveBottomBar";

const Page = () => {
  const [dataAvailable, setDataAvailable] = useState(null);
  const [submitLoader, setSubmitLoader] = useState(false);
  const submitFormRef = useRef(null);

  const loggedUser = useAppSelector((state) => state.auth.loggedUser);
  const customerId = loggedUser?.HqId;

  const {
    data: customer,
    isFetching,
    isSuccess,
    isError,
    refetch,
    error,
  } = useGetCustomerQuery(customerId, {
    skip: !customerId,
  });

  useEffect(() => {
    if (isSuccess && customer) {
      const transformed = transformCustomerData(customer);
      setDataAvailable(transformed);
    }
  }, [customer, isSuccess]);

  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    } else {
      console.log("Form ref missing");
    }
  }, []);

  // if (isFetching && !dataAvailable) {
  //   return <div className="p-6 text-gray-600">Loading customer data...</div>;
  // }

  if (isError) {
    console.error("Error fetching customer:", error);
    return (
      <div className="p-6 text-red-600">Failed to load customer data.</div>
    );
  }

  return (
    <>
      <DriverLicenseForm
        refetch={refetch}
        submitFormRef={submitFormRef}
        setSubmitLoader={setSubmitLoader}
        dataAvailable={dataAvailable}
        customerId={customerId}
      />

      <SaveBottomBar
        onSubmit={triggerSubmit}
        load={isFetching || submitLoader}
      />
    </>
  );
};

export default Page;
