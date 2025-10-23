"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BookingList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = {
    upcoming: [],
    completed: [],
    cancelled: []
  };

  const upcomingCount = bookings.upcoming.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #e6e6e6' }}>
          <button 
            onClick={() => router.back()}
            className="hover:bg-gray-100 rounded-lg transition-colors"
            style={{ position: 'absolute', left: '16px', padding: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft style={{ width: '24px', height: '24px', color: '#2DBDB6' }} strokeWidth={2.5} />
          </button>
          <h1 className="text-gray-900" style={{ fontSize: '16px', fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 400, lineHeight: '18px', letterSpacing: '0', textTransform: 'none' }}>My Booking</h1>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="flex" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setActiveTab("upcoming")}
              className="relative font-bold transition-colors"
              style={{ 
                color: activeTab === "upcoming" ? '#2DBDB6' : '#9ca3af',
                fontSize: '12px',
                fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.0241em',
                padding: '14px 0',
                flex: 1,
                textAlign: 'center'
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Upcoming
                {upcomingCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {upcomingCount}
                  </span>
                )}
              </span>
              {activeTab === "upcoming" && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '2px', backgroundColor: '#2DBDB6' }}></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className="relative transition-colors"
              style={{ 
                color: activeTab === "completed" ? '#2DBDB6' : '#9ca3af',
                fontSize: '12px',
                fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: activeTab === "completed" ? 700 : 400,
                letterSpacing: '-0.0241em',
                padding: '14px 0',
                flex: 1,
                textAlign: 'center'
              }}
            >
              Completed
              {activeTab === "completed" && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '2px', backgroundColor: '#2DBDB6' }}></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("cancelled")}
              className="relative transition-colors"
              style={{ 
                color: activeTab === "cancelled" ? '#2DBDB6' : '#9ca3af',
                fontSize: '12px',
                fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: activeTab === "cancelled" ? 700 : 400,
                letterSpacing: '-0.0241em',
                padding: '14px 0',
                flex: 1,
                textAlign: 'center'
              }}
            >
              Cancelled
              {activeTab === "cancelled" && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '2px', backgroundColor: '#2DBDB6' }}></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4" style={{ paddingTop: '120px', paddingBottom: '24px' }}>
        {activeTab === "upcoming" && bookings.upcoming.length === 0 && (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: '100px' }}>
            <p className="text-gray-400" style={{ fontSize: '16px' }}>No upcoming bookings</p>
          </div>
        )}

        {activeTab === "completed" && bookings.completed.length === 0 && (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: '100px' }}>
            <p className="text-gray-400" style={{ fontSize: '16px' }}>No completed bookings</p>
          </div>
        )}

        {activeTab === "cancelled" && bookings.cancelled.length === 0 && (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: '100px' }}>
            <p className="text-gray-400" style={{ fontSize: '16px' }}>No cancelled bookings</p>
          </div>
        )}

        {/* Booking Cards */}
        {bookings[activeTab].map((booking, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-4">
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;