"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OtpVerify from "../_components/OtpVerify";
import { showErrorToast } from "@/app/_lib/toast";
import hqApi from "@/lib/hqApi";

export default function OtpVerifyPage() {
  const { clientToken } = useParams();
  console.log("clientToken:", clientToken); 
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!clientToken) return;

    const verifyToken = async () => {
      try {
        const res = await hqApi.post(`/auth/verify-client/${clientToken}`)
        setUserData(res.data?.data);
        console.log("User data:", res.data?.data);  
        setLoading(false);
      } catch (err) {
        setError(true)
        console.error("Verify token error:", err);
        showErrorToast("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    verifyToken();
  }, [clientToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Checking verification link...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="mb-4">{error}</p>
        <button
          onClick={() => router.push("/register")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go back to Register
        </button>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <OtpVerify type="primary" email={userData?.email} />
    </div>
  );
}
