import { showErrorToast } from "@/app/_lib/toast";
import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
const StepBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState("Add-Ons");
  const reservation = useAppSelector((state) => state.reservation.reservation);

  const stepNumber = pathname?.match(/step-(\d+)/)?.[1];
  const steps = ["Vehicle", "Add-Ons", "Details", "Payment"];
  const stepMap = {
    Vehicle: 2,
    "Add-Ons": 3,
    Details: 4,
    Payment: 6,
  };
  const searchParams = useSearchParams();
  const handleStepClick = (step) => {
    const ssid = searchParams.get("ssid");
    const targetStep = stepMap[step];
    const currentStep = reservation?.step || 2;

    // Prevent jumping ahead
    if (targetStep > currentStep) {
      showErrorToast("Please complete the current step first!");
      return;
    }

    router.push(
      `/book/step-${String(targetStep).padStart(2, "0")}?ssid=${ssid}`
    );
  };

  useEffect(() => {
    if (stepNumber) {
      const index = parseInt(stepNumber) - 2;
      if (steps[index]) setActiveStep(steps[index]);
    }
  }, [stepNumber]);

  return (
    <div className="block sm:hidden w-full flex-1 border-b border-gray-200 pt-5">
      <div className="flex justify-between w-full gap-4">
        {steps.map((step) => (
          <button
            key={step}
            onClick={() => handleStepClick(step)}
            className={`pb-3 text-md font-medium transition-all duration-200 ${
              activeStep === step
                ? "text-cPrimary border-b-2 border-cPrimary"
                : "text-cGray"
            }`}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepBar;
