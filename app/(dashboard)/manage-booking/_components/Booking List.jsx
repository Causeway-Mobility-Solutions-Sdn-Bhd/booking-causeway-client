"use client";
import React, { useState } from "react";

import Header from "./MicroComponents/Header";
import BookingContent from "./MicroComponents/BookingContent";
import { useGetAllReservationsQuery } from "@/store/api/reservationApiSlice";
function BookingList() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const {
    data: reservations,
    isLoading,
    isError,
  } = useGetAllReservationsQuery();
  console.log(reservations);

  if (isLoading) return <p>Loading reservations...</p>;
  if (isError) return <p>Failed to load reservations</p>;
  const bookings = {
    upcoming: [
      {
        id: "OJajHjFMuvCA0pjw1MiBogmuSLnKnjOSIx274C_S",
        carName: "Perodua Myvi 1.3 (2020)",
        carImage: "booking/Perodua-Axia-02 1.svg",
        category: "Economy",
        seats: "5 seats",
        fuel: "Petrol",
        transmission: "Auto",
        date: "Fri 24 Aug, 2PM (5 days)",
        location: "Amari, Suasana Hotel, Johor Bahru",
      },
    ],
    completed: [
      {
        id: 2,
        carName: "Perodua Myvi 1.3 (2020)",
        carImage: "booking/Perodua-Axia-02 1.svg",
        category: "Economy",
        seats: "5 seats",
        fuel: "Petrol",
        transmission: "Auto",
        date: "Fri 24 Aug, 2PM (5 days)",
        location: "Amari, Suasana Hotel, Johor Bahru",
      },
      {
        id: 3,
        carName: "Perodua Myvi 1.3 (2020)",
        carImage: "booking/Perodua-Axia-02 1.svg",
        category: "Economy",
        seats: "5 seats",
        fuel: "Petrol",
        transmission: "Auto",
        date: "Fri 24 Aug, 2PM (5 days)",
        location: "Amari, Suasana Hotel, Johor Bahru",
      },
    ],
    cancelled: [
      {
        id: 4,
        carName: "Perodua Myvi 1.3 (2020)",
        carImage: "booking/Perodua-Axia-02 1.svg",
        category: "Economy",
        seats: "5 seats",
        fuel: "Petrol",
        transmission: "Auto",
        date: "Fri 24 Aug, 2PM (5 days)",
        location: "Amari, Suasana Hotel, Johor Bahru",
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F0F0" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <BookingContent activeTab={activeTab} bookings={bookings} />
    </div>
  );
}

export default BookingList;
