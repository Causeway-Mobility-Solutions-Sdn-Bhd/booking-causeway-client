"use client";
import Image from "next/image";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrency } from "@/store/slices/reservationSlice";

const currencies = ["MYR", "USD"];

function BookNavBar({ topBar, child }) {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(
    (state) => state.reservation.currency
  );

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleCurrencyChange = (newCurrency) => {
    if (newCurrency !== currency) {
      dispatch(setCurrency(newCurrency));
    }
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
          <DropdownMenu>
            <DropdownMenuTrigger className="z-100">
              <div className="text-cSecondary cursor-pointer z-100 text-cGreen font-bold flex justify-center gap-0 items-center">
                <span>{currency}</span> <MdKeyboardArrowDown size={20} />{" "}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-24">
              {currencies.map((cur) => (
                <DropdownMenuItem
                  key={cur}
                  onClick={() => handleCurrencyChange(cur)}
                  className={`${
                    currency === cur ? "font-semibold text-primary" : ""
                  }`}
                >
                  {cur}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border-t border-cGrayLight">{topBar}</div>
    </div>
  );
}

export default BookNavBar;
