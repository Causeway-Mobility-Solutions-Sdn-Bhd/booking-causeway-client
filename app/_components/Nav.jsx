"use client";
import SecondaryButton from "@/components/custom/SecondaryButton";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import Image from "next/image";
import React from "react";
import { useAppDispatch, useLoggedUser } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Nav({ isMain = true, value = "" }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpenSidebar = () => {
    dispatch(setOpenBg(true));
    dispatch(setSidebarOpen(true));
  };

  const user = useLoggedUser();

  const buttonClick = () => {
    if (user) {
      console.log("LOGGING OUT");
    } else {
      router.push("/login");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Manage Booking", href: "/manage"},
    { name: "Partnership", href: "/partnership" },
    { name: "Contact Us", href: "/support" },
    { name: "Terms & Conditions", href: "/terms-and-condition" },
  ];


  return (
    <div className="w-full py-5 sm:py-4 bg-white z-100">
      <div className="flex justify-between items-center w-[95%] max-w-[1400px] mx-auto">
        <IoMdMenu
          onClick={handleOpenSidebar}
          color="#2DBDB6"
          size={35}
          className="block sm:hidden cursor-pointer"
        />

        {isMain ? (
          <Image
            priority
            className="object-contain w-[150px] sm:w-[200px] absolute left-[50%] sm:left-[0%] translate-x-[-50%] sm:translate-x-[0%]  sm:relative"
            src="/logo/logo-black.svg"
            alt="Causeway Logo"
            width={200}
            height={70}
          />
        ) : (
          <>
            <h3 className="block sm:hidden absolute left-[50%] translate-x-[-50%] font-semibold text-[17px]">
              {value}
            </h3>
            <Image
              priority
              className="hidden sm:block object-contain w-[150px] sm:w-[200px] absolute left-[50%] sm:left-[0%] translate-x-[-50%] sm:translate-x-[0%] grayscale sm:grayscale-0 sm:relative"
              src="/logo/logo-black.svg"
              alt="Causeway Logo"
              width={200}
              height={70}
            />
          </>
        )}

        <div className="basis-[90%] hidden justify-end items-center w-full text-cGr sm:flex">
          <div className="hidden items-center gap-7 border-r border-gray-300 pr-6 font-[400] xxl:flex">
            {navLinks.map((link) => (
              <p key={link.href}>
                <Link href={link.href} className={`${link.name === value && 'font-bold'}`}>
                  {link.name}
                </Link>
              </p>
            ))}
          </div>

          <div className="px-6 border-r border-gray-300 text-cSecondary text-cGreen font-bold hidden xxl:flex justify-center gap-1 items-center">
            <span>MYR</span>
            <MdKeyboardArrowDown size={20} />
          </div>

          <div className="pl-6">
            <SecondaryButton
              onClick={buttonClick}
              style={"h-12"}
              content={user ? "Log out" : "Log in/Sign Up"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
