"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import { TicketPlus } from "lucide-react";
import { FaUser, FaRegCalendar } from "react-icons/fa6";
import { MdBookmark } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const loggedUser = useAppSelector((state) => state.auth.loggedUser);
  const router = useRouter();

  const handleAllBookings = () => {
    router.push("/manage-booking?completed");
  };

  const handleUpcoming = () => {
    router.push("/manage-booking?upcoming");
  };

  const handleSaved = () => {
    console.log("Saved clicked");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Card — User Info */}
      <div className="bg-white rounded-md shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
            <FaUser color="#fff" size={16} />
          </div>

          <div className="sm:hidden">
            <p className="font-bold text-black">
              Hi, {loggedUser?.fullName || "John Doe"}
            </p>
            <p className="text-sm text-gray-600 font-normal">
              {loggedUser?.email || "johndoe@gmail.com"}
            </p>
          </div>

          <p className="hidden sm:block font-bold text-black">
            Hi, {loggedUser?.fullName || "John Doe"}
          </p>
        </div>

        <p className="hidden sm:block text-sm text-gray-600 font-normal">
          {loggedUser?.email || "johndoe@gmail.com"}
        </p>
      </div>

      {/* Second Card — Stats */}
      <div className="bg-white rounded-md shadow-lg p-5 xsm:px-8 sm:px-16 md:px-32 flex items-center justify-between gap-5">
        {/* All Bookings */}
        <div
          onClick={handleAllBookings}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <TicketPlus className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">All bookings</p>
        </div>

        {/* Upcoming */}
        <div
          onClick={handleUpcoming}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <FaRegCalendar strokeWidth={2.5} className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">Upcoming</p>
        </div>

        <Link
          href="/favorite-vehicles"
          className="flex flex-col items-center gap-2"
        >
          <MdBookmark className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">Saved</p>
        </Link>
      </div>
    </div>
  );
}

export default Page;
