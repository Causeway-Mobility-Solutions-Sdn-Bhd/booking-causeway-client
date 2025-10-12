"use client";
import Image from "next/image";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CurrencyDrawer from "@/app/_components/CurrencyDrawer";


function BookNavBar({ topBar, child }) {

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };


  return (
    <div className="w-full fixed top-0 z-[50] bg-white">
      <div className="py-5 sm:py-7">
        <div className="flex relative justify-between items-center w-[95%] max-w-[1400px] mx-auto">
          <Image
            priority
            className="object-contain w-[150px] sm:w-[200px] hidden sm:block"
            src="/logo/logo-black.webp"
            alt="Causeway Logo"
            width={200}
            height={70}
          />
          <FaChevronLeft
            color="#2DBDB6"
            size={20}
            className="block sm:hidden cursor-pointer z-100"
            onClick={handleBack}
          />
          <div className="block sm:hidden absolute left-[50%] translate-x-[-50%] w-full">
            {child}
          </div>
          <CurrencyDrawer />
        </div>
      </div>
      <div className="border-t border-cGrayLight">{topBar}</div>
    </div>
  );
}

export default BookNavBar;
