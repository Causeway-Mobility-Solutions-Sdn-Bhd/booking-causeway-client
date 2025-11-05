"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { useRefreshMutation } from "@/store/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setLogedUser } from "@/store/slices/generalSlice";

function RefreshTokenLoader({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const [isChecking, setIsChecking] = useState(true);
  const hasChecked = useRef(false);

  const protectedRoutes = ["/profile", "/dashboard", "/manage-booking"];
  const authRoutes = ["/login", "/signup", "/otp-verify"];

  useEffect(() => {
    if (hasChecked.current) {
      setIsChecking(false);
      return;
    }

    const verifyUser = async () => {
      try {
        const result = await refresh().unwrap();
        hasChecked.current = true;

        const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
        if (isAuthRoute) {
          router.replace("/profile");
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        console.log("Auth check failed:", err);
        hasChecked.current = true;

        const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
        if (isProtected) {
          router.replace("/");
        } else {
          setIsChecking(false);
        }
      }
    };

    verifyUser();
  }, [refresh, router, pathname, dispatch]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center fixed inset-0  z-[1000]">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  return children;
}

export default RefreshTokenLoader;
