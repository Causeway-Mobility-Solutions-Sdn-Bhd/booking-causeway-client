"use client";

import ResetPassword from "@/app/_components/CustomerFormComponents/ResetPassword";
import { useRef } from "react";

export default function page() {
  const submitFormRef = useRef(null);
  return (
    <>
      <ResetPassword submitFormRef={submitFormRef} />
    </>
  );
}
