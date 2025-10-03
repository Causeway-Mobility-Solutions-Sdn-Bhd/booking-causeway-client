"use client";

import React, { useEffect, useState } from "react";
import hqApi from "@/lib/hqApi";
import Spinner from "@/components/custom/Spinner";
import { useDispatch } from "react-redux";
import { setLogedUserUser } from "@/store/slices/authSlie";

function RefreshTokenLoader() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await hqApi.post("auth/refresh/token");
        dispatch(setLogedUserUser(res?.data?.user))
        console.log("Token refreshed" , res);
        setLoading(false);
      } catch (error) {
        console.log("Refresh token failed", error);
        setLoading(false);
      }
    };
    refreshToken();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 w-full bg-cWhite z-[1000]">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  return null;
}

export default RefreshTokenLoader;
