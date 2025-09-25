"use client";
import React from 'react';

const Page = () => {
  const handleTalkWithAgent = () => {
    // You can replace this with your agent contact method
    // For example: redirect to a contact form, chat widget, or phone number
    window.open('tel:+1-800-123-4567', '_blank'); // Replace with your contact method
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
            />
          </svg>
        </div>

        {/* Status Badge */}
        <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
          Under Development
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Feature Coming Soon
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          This feature is currently being developed and will be available in the next version release.
        </p>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Development Progress</span>
            <span className="text-sm text-gray-500">70%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: '70%', 
                backgroundColor: '#ff748b' 
              }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleTalkWithAgent}
          className="px-6 py-3 bg-cSecondary text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Talk with Our Agent
        </button>

        {/* Booking Experience Note */}
        <p className="text-sm text-gray-500 mt-3">
          For a better booking experience
        </p>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Expected release: Next version update
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page