"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

import ProfileUpdateForm from "../_components/ProfileUpdateForm";
import SaveBottomBar from "../_components/SaveBottomBar";

const page = () => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const submitFormRef = useRef(null);
  const loggedUser = useAppSelector((state) => state.auth.loggedUser);
  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    } else {
      console.log("Form ref missing");
    }
  }, []);

  return (
    <>
      <ProfileUpdateForm
        submitFormRef={submitFormRef}
        setSubmitLoader={setSubmitLoader}
        dataAvailable={dataAvailable}
      />
      <SaveBottomBar onSubmit={triggerSubmit} />
    </>
  );
};

export default page;
