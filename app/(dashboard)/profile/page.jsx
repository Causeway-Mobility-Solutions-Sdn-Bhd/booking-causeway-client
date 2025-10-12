"use client";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

function Page() {
  const [refreshToken, setRefreshToken] = useState("");
  const logedUser = useAppSelector((state) => state.auth.logedUser);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="));
    const token = cookies ? cookies.split("=")[1] : "";
    setRefreshToken(token);
  }, []);

  return (
    <div>
      <p>Refresh Token: {refreshToken}</p>
      <p>Name : {logedUser?.fullName}</p>
    </div>
  );
}

export default Page;
