import React from "react";
import { Button } from "@/components/ui/button";
import { useFormatPrice } from "@/app/_lib/formatPrice";
import UpgradeDrawer from "./UpgradeDrawer";
import PriceSummaryDrawer from "./PriceSummaryDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store/hooks";
import Spinner from "@/components/custom/Spinner";
function PriceBottomBar({
  step = 0,
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
  finalLoader = false,
  onSubmit = () => {},
  fetchLoader = false,
  submitLoader = false,
}) {
  const currency = useAppSelector((state) => state.reservation.currency);
  const selectedVehicle = useAppSelector(
    (state) => state.reservation.selectedVehicle
  );
  const formatPrice = useFormatPrice();

  const handlePress = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  if (fetchLoader) {
    return <BottomBarSkeleton />;
  }

  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 p-3 left-0 right-0 z-50">
      <div className="flex items-center justify-between gap-2  sm:hidden">
        <PriceSummaryDrawer
          selectedVehicle={selectedVehicle}
          currency={currency}
        />

        {step === 3 ? (
          <UpgradeDrawer
            selectedCharges={selectedCharges}
            setSelectedCharges={setSelectedCharges}
            fetchData={fetchData}
            finalLoader={finalLoader}
          />
        ) : (
          <Button
            onClick={handlePress}
            className={`items-center bg-cPrimary basis-[40%] h-[53px] text-white ${
              submitLoader ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={submitLoader}
          >
            {submitLoader ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              "Next"
            )}
          </Button>
        )}
      </div>

      <div className="hidden items-center justify-end gap-3 sm:flex">
        {/* Price Section */}
        <div className="flex items-center gap-2 rounded-lg px-4 py-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Total ({currency})</span>
            <span className="text-[16px] font-bold text-gray-900">
              {formatPrice(
                selectedVehicle?.total_price_with_mandatory_charges_and_taxes
              )}
            </span>
          </div>
        </div>

        {step === 3 ? (
          <UpgradeDrawer
            selectedCharges={selectedCharges}
            setSelectedCharges={setSelectedCharges}
            fetchData={fetchData}
            finalLoader={finalLoader}
          />
        ) : (
          <Button
            onClick={handlePress}
            disabled={submitLoader}
            className={`items-center bg-cPrimary basis-[50%] sm:basis-[10%] h-[53px] text-white ${
              submitLoader ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitLoader ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              "Next"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

const BottomBarSkeleton = () => {
  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 p-3 left-0 right-0 z-50">
      {/* Mobile (sm:hidden) */}
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <Skeleton className="flex-1 h-[53px] w-1/2 rounded-lg" />
        <Skeleton className="basis-[40%] h-[53px] w-1/2 rounded-lg" />
      </div>

      {/* Desktop (hidden sm:flex) */}
      <div className="hidden items-center justify-end gap-3 sm:flex">
        <div className="flex items-center gap-2 rounded-lg px-4 py-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-5 w-32 rounded" />
          </div>
        </div>

        <Skeleton className="h-[57px] w-[200px] rounded-lg" />
      </div>
    </div>
  );
};

export default PriceBottomBar;
