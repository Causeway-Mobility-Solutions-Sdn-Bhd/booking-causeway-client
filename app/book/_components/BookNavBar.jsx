"use client";
import Image from "next/image";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CurrencyDrawer from "@/app/_components/CurrencyDrawer";
import StepBar from "./StepBar";
import { TruckElectric } from "lucide-react";

function BookNavBar({
  topBar = null,
  child = null,
  currencyDrawer = TruckElectric,
  type = "default",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stepNumber = pathname?.match(/step-(\d+)/)?.[1];
  const ssid = searchParams.get("ssid");

  const handleBack = () => {
    if (type === "booking") {
      if (stepNumber) {
        const step = parseInt(stepNumber);
        let targetStep = null;

        if (step === 2) {
          router.replace("/");
          return;
        } else if (step > 2) {
          targetStep = step - 1;
        }

        if (targetStep) {
          const formattedStep = String(targetStep).padStart(2, "0");
          router.replace(
            `/book/step-${formattedStep}${ssid ? `?ssid=${ssid}` : ""}`
          );
          return;
        }
      }
    }

    router.back();
  };
  return (
    <div className="w-full fixed top-0 z-[50] bg-white">
      <div className={`${topBar ? "py-5" : "py-0"} sm:py-7`}>
        <div className="flex gap-4 relative justify-between items-center w-[95%] max-w-[1400px] mx-auto">
          <Link href="/" className="hidden sm:block cursor-pointer">
            <Image
              loading="lazy"
              className="object-contain w-[150px] sm:w-[200px]"
              src="/logo/logo-black.svg"
              alt="Causeway Logo"
              width={200}
              height={70}
            />
          </Link>
          <FaChevronLeft
            color="#2DBDB6"
            size={20}
            className="block sm:hidden cursor-pointer z-100"
            onClick={handleBack}
          />
          {topBar ? (
            <>
              <div className="block sm:hidden absolute left-[50%] translate-x-[-50%] w-full">
                {child}
              </div>
              {currencyDrawer && <CurrencyDrawer />}
            </>
          ) : (
            <StepBar />
          )}
        </div>
      </div>
      <div className="border-t border-cGrayLight">{topBar}</div>
    </div>
  );
}

export default BookNavBar;