"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="));
    const token = cookies ? cookies.split("=")[1] : "";
    setRefreshToken(token);
  }, []);

  return <div>Refresh Token: {refreshToken}</div>;
}

export default Page;
