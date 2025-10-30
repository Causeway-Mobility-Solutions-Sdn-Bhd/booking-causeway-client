"use client";
import React, { useState } from "react";

import Header from "./MicroComponents/Header";
import BookingContent from "./MicroComponents/BookingContent";
import { useGetAllReservationsQuery } from "@/store/api/reservationApiSlice";
import Spinner from "@/components/custom/Spinner";
function BookingList() {
  const [activeTab, setActiveTab] = useState("upcoming");
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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <BookingContent activeTab={activeTab} bookings={bookings} />
    </div>
  );
}

export default BookingList;
