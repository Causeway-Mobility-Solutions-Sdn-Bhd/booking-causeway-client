"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import { TicketPlus } from "lucide-react";
import { FaUser } from "react-icons/fa6";
import { MdBookmark } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

function Page() {
  const loggedUser = useAppSelector((state) => state.auth.loggedUser);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Card — User Info */}
      <div className="bg-white rounded-md shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
              <FaUser color="#fff" size={16} />
            </div>
            <p className="font-bold text-black">
              Hi, {loggedUser?.fullName || "John Doe"}
            </p>
          </div>

          <p className="text-sm text-black font-normal">
            {loggedUser?.email || "johndoe@gmail.com"}
          </p>
        </div>
      </div>

      {/* Second Card — Stats */}
      <div className="bg-white rounded-md shadow-lg p-5 px-32 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col items-center gap-2">
          <TicketPlus className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">All bookings</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <FaRegCalendar strokeWidth={2.5} className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">Upcoming</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <MdBookmark className="text-teal-500 w-6 h-6" />
          <p className="text-xs font-medium text-black">Saved</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
