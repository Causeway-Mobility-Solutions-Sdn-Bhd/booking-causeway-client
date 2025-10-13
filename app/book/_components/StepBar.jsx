import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const StepBar = () => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState("Add-Ons");

  const stepNumber = pathname?.match(/step-(\d+)/)?.[1];
  const steps = ["Vehicle", "Add-Ons", "Details", "Payment"];


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
