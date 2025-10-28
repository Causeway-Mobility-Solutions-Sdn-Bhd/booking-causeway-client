"use client";
import SaveBottomBar from "@/app/_components/SaveBottomBar";
import { transformCustomerData } from "@/app/_lib/transformCustomerData";
import BookNavBar from "@/app/book/_components/BookNavBar";
import CustomerDetailsForm from "@/app/book/step-04/_components/CustomerDetailsForm";
import hqApi from "@/lib/hqApi";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const page = () => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitFormRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hqApi.get(
          `car-rental/reservations/get-reservation/${id}`
        );

        const responseData = response?.data?.data;

        const customerData = transformCustomerData(responseData?.customer);

        setFormData(customerData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reservation:", error);
        // router.replace("/");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    } else {
      console.log("Form ref missing");
    }
  }, []);
  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }
  return (
    <>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Customer details
          </h3>
        }
        topBar={true}
      />

      <div className="!pb-32 py-[20px] mt-[70px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[92%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <CustomerDetailsForm
              dataAvailable={formData}
              submitFormRef={submitFormRef}
              setSubmitLoader={setSubmitLoader}
              managing={true}
            />
          </div>
        </div>
      </div>

      <SaveBottomBar
        title="Confirm changes"
        load={submitLoader || loading}
        onSubmit={triggerSubmit}
      />
    </>
  );
};

export default page;
