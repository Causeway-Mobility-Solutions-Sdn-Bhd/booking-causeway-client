"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OtpVerify from "../_components/OtpVerify";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import hqApi from "@/lib/hqApi";

export default function OtpVerifyPage() {
  const { clientToken } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await hqApi.post(`/auth/verify-client/${clientToken}`)
        console.log(res)
        setUserData(res.data?.data);
        if(res?.data?.data?.isVerified){
           router.push('/')
           showSuccessToast("User Already Verified Successfully")
        }
        setLoading(false);
      } catch (err) {
        setError(true)
        router.push('/signup')
        showErrorToast(err?.response?.data?.message || "Invalid or expired verification link.");
        setLoading(false);
      }
    };

    verifyToken();
  }, [clientToken]);

  if (loading || error) {
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
