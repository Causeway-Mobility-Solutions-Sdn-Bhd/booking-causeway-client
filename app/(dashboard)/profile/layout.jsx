"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Nav from "@/app/_components/Nav";
import ProfileSidebar from "./_components/ProfileSidebar";
import BookNavBar from "@/app/book/_components/BookNavBar";
import BottomBar from "@/app/_components/BottomBar";
import SideBar from "@/app/_components/SideBar";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = [
    "/profile/security",
    "/profile/personal",
    "/profile/license",
  ];

  const isInnerProfile = noLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const getHeading = () => {
    if (pathname.startsWith("/profile/security")) return "Security";
    if (pathname.startsWith("/profile/personal")) return "Personal Information";
    if (pathname.startsWith("/profile/license")) return "License Information";
    return "";
  };

  return (
    <>
      {!isInnerProfile ? (
        <Nav isMain={true} value="Home" />
      ) : (
        <>
          <div className="block sm:hidden">
            <BookNavBar
              topBar={true}
              currencyDrawer={false}
              child={
                <h3 className="text-center text-[17px] w-full font-semibold">
                  {getHeading()}
                </h3>
              }
            />
          </div>
          <div className="hidden sm:block">
            <Nav isMain={true} value="Home" />
          </div>
        </>
      )}

      <div
        className={`pb-24 py-5 sm:py-[30px] max-w-[1400px] mx-auto w-[92%] ${
          isInnerProfile
            ? ""
            : "mt-2.5 flex justify-start items-start gap-5 flex-col-reverse lg:flex-row"
        }`}
      >
        {!isInnerProfile && <ProfileSidebar />}
        <div
          className={`flex-1 w-full ${isInnerProfile ? "pt-16" : ""} sm:pt-0`}
        >
          {children}
        </div>
      </div>

      {!isInnerProfile && <BottomBar />}
      <SideBar />
    </>
  );
}
