"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OtpVerify from "../_components/OtpVerify";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import { useVerifyClientMutation } from "@/store/api/authApiSlice";

export default function OtpVerifyPage() {
  const { clientToken } = useParams();
  const router = useRouter()
  const [userData, setUserData] = useState(null);

  const [verifyClient, { isLoading}] = useVerifyClientMutation();

 useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyClient(clientToken).unwrap();
        setUserData(res.data);

        if (res.data?.isVerified) {
          showSuccessToast("User Already Verified Successfully");
          router.push("/");
        }
      } catch (err) {
        showErrorToast(err?.data?.message || "Invalid or expired verification link.");
        router.push("/signup");
      }
    };

    verifyToken();
  }, [clientToken]);

  if (isLoading || userData === null) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Checking verification link...
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <OtpVerify type="primary" userData={userData} />
    </div>
  );
}
