"use client";
import React, { useState } from "react";
import { FaLocationDot} from "react-icons/fa6";
import { formatDate, formatTime } from "@/app/_lib/formattingDateTime";
import { useAppSelector } from "@/store/hooks";
import EditLocationDateDrawer from "./EditLocationDateDrawer";

function ShowPickDrop() {
  const reservation = useAppSelector((state) => state.reservation.reservation);
    const [editLocDateOpen, setEditLocDateOpen] = useState();

  return (
    <div className="mt-4" >
      {/* Header with edit icon */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-bold">Pickup & Return</h1>
      </div>

      {/* Main container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
        {/* Pickup Section */}
        <div className="flex items-center gap-3 justify-between pb-4 border-b border-gray-200 relative">
          <div className="flex items-center gap-2 justify-between pt-2">
            <div>
              <FaLocationDot className="text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[16px] leading-0 text-gray-900 mb-1">
                Pickup
              </h3>
              <div className="mt-3">
                <p className="text-gray-700 text-[14px]">
                  {reservation?.pick_up_location?.name ||
                    "Amari, Suasana Hotel, Johor Bahru"}
                </p>
                <p className="text-gray-600 text-[14px]">
                  {formatDate(reservation?.pick_up_date)}{" "}
                  {formatTime(reservation?.pick_up_time)}
                </p>
              </div>
            </div>
          </div>
          <EditLocationDateDrawer
            reservation={reservation}
            isDrawerOpen={editLocDateOpen}
            setIsDrawerOpen={setEditLocDateOpen}
            isMid={true} 
          />
        </div>

        {/* Return Section */}
        <div className="flex items-center gap-3 justify-between pt-4  relative">
          <div className="flex items-center gap-2 justify-between pt-2">
            <div>
              <FaLocationDot className="text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[16px] leading-0 text-gray-900 mb-1">
                Return
              </h3>
              <div className="mt-3">
                <p className="text-gray-700 text-[14px] ">
                  {reservation?.return_location?.name ||
                    "Amari, Suasana Hotel, Johor Bahru"}
                </p>
                <p className="text-gray-600 text-[14px]">
                  {formatDate(reservation?.return_date)}{" "}
                  {formatTime(reservation?.return_time)}
                </p>
              </div>
            </div>
          </div>
          <EditLocationDateDrawer
            reservation={reservation}
            isDrawerOpen={editLocDateOpen}
            setIsDrawerOpen={setEditLocDateOpen}
            isMid={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowPickDrop;
