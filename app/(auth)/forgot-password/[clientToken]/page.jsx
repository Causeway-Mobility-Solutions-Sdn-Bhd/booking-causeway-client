"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VerifyResetOtp from "../_components/VerifyResetOtp";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import { useVerifyClientMutation } from "@/store/api/authApiSlice"; // same hook structure
import { OtpFormSkeleton } from "@/components/custom/Skeleton";

export default function VerifyResetOtpPage() {
  const { clientToken } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const [verifyClient, { isLoading }] = useVerifyClientMutation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyClient(clientToken).unwrap();
        setUserData(res.data);
      } catch (err) {
        showErrorToast(
          err?.data?.message || "Invalid or expired verification link."
        );
        router.push("/forgot-password");
      }
    };

    verifyToken();
  }, [clientToken]);

  if (isLoading || userData === null) {
    return (
      <div className="w-[95%] mx-auto flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <OtpFormSkeleton />
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <VerifyResetOtp
        type="primary"
        userData={userData}
        clientToken={clientToken}
      />
    </div>
  );
}
