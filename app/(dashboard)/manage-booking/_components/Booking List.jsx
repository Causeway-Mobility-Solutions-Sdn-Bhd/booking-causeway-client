"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Header from "./MicroComponents/Header";
import BookingContent from "./MicroComponents/BookingContent";
import { useGetAllReservationsQuery } from "@/store/api/reservationApiSlice";
import Spinner from "@/components/custom/Spinner";

function BookingList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryTab =
    searchParams.get("upcoming") !== null
      ? "upcoming"
      : searchParams.get("completed") !== null
      ? "completed"
      : null;

  const [activeTab, setActiveTab] = useState(queryTab || "upcoming");

  useEffect(() => {
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/manage-booking?${tab}`);
  };

  const {
    data: reservations,
    isLoading,
    isError,
  } = useGetAllReservationsQuery();

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  if (isError) return <p>Failed to load reservations</p>;

  const bookings = reservations?.data;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Header receives handler that updates both state & URL */}
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />
      <BookingContent activeTab={activeTab} bookings={bookings} />
    </div>
  );
}

export default BookingList;
