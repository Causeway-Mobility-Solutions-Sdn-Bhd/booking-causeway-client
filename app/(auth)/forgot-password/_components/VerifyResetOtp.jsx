"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import {
  useResendResetOtpMutation,
  useVerifyResetOtpMutation,
} from "@/store/api/authApiSlice";
import Spinner from "@/components/custom/Spinner";

function VerifyResetOtp({ type, userData }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const router = useRouter();

  const [verifyResetOtp, { isLoading }] = useVerifyResetOtpMutation();
  const [resendResetOtp, { isLoading: isResending }] =
    useResendResetOtpMutation();

  useEffect(() => {
    setTimer(userData);
  }, [userData]);

  const setTimer = (data) => {
    if (data?.forgotPasswordExpiresAt) {
      const expiryTime = new Date(data.forgotPasswordExpiresAt).getTime();
      const now = Date.now();
      const diff = Math.max(Math.floor((expiryTime - now) / 1000), 0);
      setResendTimer(diff);
      setCanResend(diff <= 0);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
      } else newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      showErrorToast("Please enter complete OTP");
      return;
    }

    try {
      const res = await verifyResetOtp({ code: otpValue }).unwrap();
      showSuccessToast("OTP verified successfully");
      router.push(`/reset-forgot-password/${res?.data?.clientToken}`);
    } catch (err) {
      showErrorToast(
        err?.data?.message || "Verification failed. Please try again."
      );
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);

    try {
      const res = await resendResetOtp({ email: userData.email }).unwrap();
      setTimer(res?.data);
      showSuccessToast("OTP resent successfully");
    } catch (err) {
      showErrorToast(
        err?.data?.message || "Failed to resend OTP. Please try again."
      );
      setCanResend(true);
      setResendTimer(0);
    }
  };

  const onBack = () => router.push("/forgot-password");

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative">
      {type === "primary" && (
        <>
          <button
            onClick={onBack}
            className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center mb-6 mt-2">
            <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-cPrimary font-medium text-sm">
              {userData.email}
            </p>
          </div>
        </>
      )}

      <div>
        <div className="mb-6">
          <div className="flex justify-center space-x-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full bg-cPrimary text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors"
        >
          {isLoading ? (
            <Spinner size={24} color="#fff" thickness={3} />
          ) : (
            <span>Verify OTP</span>
          )}
        </button>

        <div className="text-center flex justify-center items-center gap-1">
          <p className="text-gray-600 text-sm">Didn't receive the code? </p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-cSecondary font-medium text-sm hover:underline transition-colors"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-400 text-sm">
              {isResending ? "Resending..." : `Resend in ${resendTimer}s`}
            </p>
          )}
        </div>
      </div>

      {type === "primary" && (
        <div className="text-center mt-4">
          <Link
            href="/login"
            className="text-cSecondary font-medium text-sm hover:underline transition-colors"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default VerifyResetOtp;
