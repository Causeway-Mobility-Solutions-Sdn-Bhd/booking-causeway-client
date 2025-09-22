"use client"
import OtpVerify from "./_components/OtpVerify";

export default function Login() {
  return (
    <div className="w-[95%] mx-auto  flex justify-center items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <OtpVerify
        type="primary"
        email="user@example.com"
      />
    </div>
  );
}
