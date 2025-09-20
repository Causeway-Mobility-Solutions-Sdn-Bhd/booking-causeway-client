import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryBadgeLoader = ({ count = 4 }) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-18 rounded-full flex-shrink-0" />
      ))}
    </div>
  );
};


export const BookCarCardSkeleton = () => {
  return (
    <Card className="relative h-full">
      <CardContent className="relative p-4 flex flex-col h-full justify-between">
        {/* Favorite Icon */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Image Placeholder */}
        <div className="flex justify-center mb-6 mt-2">
          <Skeleton className="w-[180px] sm:w-[220px] h-[100px] rounded-md" />
        </div>

        {/* Car Title */}
        <div className="mb-4">
          <Skeleton className="h-4 w-[70%] mb-2" />
          <Skeleton className="h-3 w-[50%]" />
        </div>

        {/* Features (Icons and Labels) */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex flex-col gap-3 mt-auto">
          <div>
            <Skeleton className="h-4 w-[70px] mb-1" />
            <Skeleton className="h-3 w-[50px]" />
          </div>
          <Skeleton className="h-[44px] rounded-md w-full" />
        </div>
      </CardContent>
    </Card>
  );
};



export const CarCardSkeleton = () => {
  return (
    <Card className="h-full relative">
      <CardContent className="px-4">
        {/* Car Image Skeleton */}
        <div className="flex justify-center mb-4">
          <Skeleton className="h-[80px] w-[200px] rounded-lg" />
        </div>

        <div className="flex justify-between items-center">
          {/* Car Info Skeleton */}
          <div className="text-left mb-4">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Price Skeleton */}
          <div className="text-right mb-4">
            <Skeleton className="h-6 lg:h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-4 w-4 rounded mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-4 w-4 rounded mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-4 w-4 rounded mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex flex-col items-center text-center">
            <Skeleton className="h-4 w-4 rounded mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Book Button Skeleton */}
        <Skeleton className="w-full h-10 sm:h-12 rounded-md" />
      </CardContent>
    </Card>
  );
};
