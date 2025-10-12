import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

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

export const PaymentLoader = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm mt-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
      </div>

      {/* Card Number Field */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        <div className="relative">
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Expiry and Security Code Row */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Country Field */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md border animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Terms Text Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/5" />
      </div>

      <div className="space-y-1">
        <div className="w-full h-12 bg-gradient-to-r from-teal-200 via-teal-100 to-teal-200 rounded-md animate-shimmer bg-[length:200%_100%]" />
        <div className="w-full h-12 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-md animate-shimmer bg-[length:200%_100%]" />
      </div>

      <div className="flex items-center justify-center mt-6 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-teal-500" />
        <span className="text-sm text-gray-600 font-medium">
          Preparing secure payment...
        </span>
      </div>
    </div>
  );
};
export const OtpFormSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5 md:p-6 relative animate-pulse">
      {/* Back button skeleton */}
      <div className="absolute top-5 left-5 w-5 h-5 bg-gray-200 rounded"></div>

      {/* Header skeleton */}
      <div className="text-center mb-6 mt-2">
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
      </div>

      {/* OTP input boxes skeleton */}
      <div className="mb-6">
        <div className="flex justify-center space-x-3 mb-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Verify button skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>

      {/* Resend text skeleton */}
      <div className="flex justify-center items-center gap-1">
        <div className="h-4 bg-gray-200 rounded w-36"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>

      {/* Back to login skeleton */}
      <div className="text-center mt-4">
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
      </div>
    </div>
  );
};
