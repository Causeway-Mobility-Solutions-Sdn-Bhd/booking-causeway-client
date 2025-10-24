"use client";

import ResetPassword from "@/app/_components/CustomerFormComponents/ResetPassword";
import SaveBottomBar from "@/app/_components/SaveBottomBar";
import { useRef, useCallback, useState } from "react";

export default function page() {
  const submitFormRef = useRef(null);
  const [submitLoader, setSubmitLoader] = useState(false);
  const triggerSubmit = useCallback(() => {
    if (submitFormRef.current) {
      submitFormRef.current();
    } else {
      console.log("Form ref missing");
    }
  }, []);

  return (
    <>
      <ResetPassword
        submitFormRef={submitFormRef}
        setSubmitLoader={setSubmitLoader}
      />
      <SaveBottomBar onSubmit={triggerSubmit} load={submitLoader} />
    </>
  );
}
