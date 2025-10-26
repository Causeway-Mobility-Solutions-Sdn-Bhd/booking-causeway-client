"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

function BookingList() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = {
    upcoming: [
      {
        id: 1,
        carName: "Perodua Myvi 1.3 (2020)",
        carImage: "booking/Perodua-Axia-02 1.svg",
        category: "Economy",
        seats: "5 seats",
        fuel: "Petrol",
        transmission: "Auto",
        date: "Fri 24 Aug, 2PM (5 days)",
        location: "Amari, Suasana Hotel, Johor Bahru"
      }
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
        location: "Amari, Suasana Hotel, Johor Bahru"
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
        location: "Amari, Suasana Hotel, Johor Bahru"
      }
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
        location: "Amari, Suasana Hotel, Johor Bahru"
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F0F0' }}>
      {/* Header */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #e6e6e6' }}>
          <button 
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 rounded-lg transition-colors"
            style={{ position: 'absolute', left: '0', padding: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft style={{ width: '28px', height: '28px', color: '#2DBDB6' }} strokeWidth={3} />
          </button>
          <h1 className="text-gray-900" style={{ fontSize: '16px', fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 400, lineHeight: '18px', letterSpacing: '0', textTransform: 'none' }}>My Booking</h1>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="flex" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setActiveTab("upcoming")}
              className="relative transition-colors"
              style={{ 
                color: activeTab === "upcoming" ? '#2DBDB6' : '#404040',
                fontSize: '12px',
                fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: activeTab === "upcoming" ? 700 : 400,
                letterSpacing: '-0.0241em',
                padding: '14px 0',
                flex: 1,
                textAlign: 'center'
              }}
            >
              Upcoming
              {activeTab === "upcoming" && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '2px', backgroundColor: '#2DBDB6' }}></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className="relative transition-colors"
              style={{ 
                color: activeTab === "completed" ? '#2DBDB6' : '#404040',
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
                color: activeTab === "cancelled" ? '#2DBDB6' : '#404040',
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
      <div className="max-w-7xl mx-auto" style={{ paddingTop: '140px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
        {/* Booking Count Header */}
        {bookings[activeTab].length > 0 && (
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', width: '343px', marginLeft: 'auto', marginRight: 'auto' }}>
            {bookings[activeTab].length} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Booking{bookings[activeTab].length > 1 ? 's' : ''}
          </h2>
        )}

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
          <div key={booking.id} className="bg-white mb-4" style={{ width: '343px', minHeight: '455px', padding: '16px', border: '1px solid #f3f4f6', borderRadius: '12px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Car Image */}
            <div className="bg-white rounded-lg mb-4 flex items-center justify-center" style={{ height: '200px', overflow: 'hidden' }}>
              <img 
                src={booking.carImage} 
                alt={booking.carName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Car Name */}
            <h3 className="text-gray-900 mb-3" style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', width: '311px' }}>
              {booking.carName}
            </h3>

            {/* Car Specs */}
            <div className="flex items-center justify-between mb-4" style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <div className="flex flex-col items-center" style={{ width: '77.75px', height: '30px' }}>
                <img 
                  src="booking/Type.svg" 
                  alt="Economy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="flex flex-col items-center" style={{ width: '77.75px', height: '30px' }}>
                <img 
                  src="booking/Seat.svg" 
                  alt="Seats"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="flex flex-col items-center" style={{ width: '77.75px', height: '30px' }}>
                <img 
                  src="booking/Fuel.svg" 
                  alt="Petrol"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="flex flex-col items-center" style={{ width: '77.75px', height: '30px' }}>
                <img 
                  src="booking/Gear.svg" 
                  alt="Auto"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Location and Date */}
            <div className="flex items-start mb-4">
              <img 
                src="booking/Icons Outline.svg" 
                alt="Location"
                style={{ width: '24px', height: '24px', marginTop: '2px', marginRight: '8px', flexShrink: 0 }}
              />
              <div style={{ width: '275px' }}>
                <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px', fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif' }}>{booking.date}</p>
                <p className="text-gray-600" style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif' }}>{booking.location}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {activeTab === "upcoming" && (
              <button 
                className="w-full text-white transition-all"
                style={{ 
                  backgroundColor: '#FF748B',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                  borderRadius: '8px',
                  width: '311px',
                  height: '44px'
                }}
              >
                View Booking
              </button>
            )}

            {activeTab === "completed" && (
              <div className="flex gap-3">
                {index === 0 ? (
                  <>
                    <button 
                      className="flex-1 transition-all"
                      style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #FF748B',
                        color: '#FF748B',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                        borderRadius: '8px',
                        height: '44px'
                      }}
                    >
                      Add Review
                    </button>
                    <button 
                      className="flex-1 text-white transition-all"
                      style={{ 
                        backgroundColor: '#FF748B',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                        borderRadius: '8px',
                        height: '44px'
                      }}
                    >
                      Re-book
                    </button>
                  </>
                ) : (
                  <button 
                    className="w-full text-white transition-all"
                    style={{ 
                      backgroundColor: '#FF748B',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                      borderRadius: '8px',
                      width: '311px',
                      height: '44px'
                    }}
                  >
                    Re-book
                  </button>
                )}
              </div>
            )}

            {activeTab === "cancelled" && (
              <button 
                className="w-full text-white transition-all"
                style={{ 
                  backgroundColor: '#FF748B',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                  borderRadius: '8px',
                  width: '311px',
                  height: '44px'
                }}
              >
                Re-Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;