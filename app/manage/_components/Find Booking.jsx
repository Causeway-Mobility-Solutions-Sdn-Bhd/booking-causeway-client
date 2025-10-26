"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";

function FindBookingForm() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F0F0' }}>
      {/*  Header */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #e6e6e6' }}>
          <button 
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 rounded-lg transition-colors"
            style={{ position: 'absolute', left: '0', padding: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft style={{ width: '28px', height: '28px', color: '#2DBDB6' }} strokeWidth={3} />
          </button>
          <h1 className="text-gray-900" style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, lineHeight: '18px', letterSpacing: '0', textTransform: 'none' }}>My Booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6" style={{ paddingTop: '76px' }}>
        <h2 className="text-[20px] sm:text-2xl font-bold mb-4 px-1">
          Find Your Booking
        </h2>
        
        <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto sm:mx-0 p-6 sm:p-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Reservation number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cPrimary/50 focus:border-transparent placeholder-gray-400 text-[15px]"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cPrimary/50 focus:border-transparent placeholder-gray-400 text-[15px]"
            />
          </div>

          <button className="w-full bg-cPrimary text-white font-semibold flex justify-center items-center py-3 px-4 rounded-lg cursor-pointer mb-4 hover:bg-cPrimary/90 transition-colors text-[16px]">
            Find my booking
          </button>

          <div className="text-center">
            <p className="text-[15px] text-gray-700">
              Have an account?{" "}
              <a href="/my-booking" className="text-cSecondary font-bold hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindBookingForm;