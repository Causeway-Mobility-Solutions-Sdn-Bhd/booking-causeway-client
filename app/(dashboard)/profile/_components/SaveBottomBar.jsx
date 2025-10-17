import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/custom/Spinner";

function SaveBottomBar({
  onSubmit = () => {},
  fetching = false,
  submitLoader = false,
}) {
  const handlePress = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  if (fetching) {
    return <BottomBarSkeleton />;
  }

  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 p-3 left-0 right-0 z-50">
      <div className="flex items-center justify-between gap-2  sm:hidden">
        <Button
          onClick={handlePress}
          className={`items-center bg-cPrimary basis-[40%] h-[53px] text-white ${
            fetching || submitLoader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={fetching || submitLoader}
        >
          {submitLoader ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            "Save"
          )}
        </Button>
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

export default SaveBottomBar;
