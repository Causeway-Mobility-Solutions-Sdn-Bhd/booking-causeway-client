"use client";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

function Page() {
  const loggedUser = useAppSelector((state) => state.auth.loggedUser);

  return (
    <div>
      <p>Name : {loggedUser?.fullName}</p>
    </div>
  );
}

export default Page;
