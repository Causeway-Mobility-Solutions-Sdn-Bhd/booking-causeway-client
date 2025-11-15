import React from "react";
import BookingCard from "./BookingCard";

function BookingContent({ activeTab, bookings }) {
  return (
    <div
      className="max-w-7xl mx-auto"
      style={{
        paddingTop: "140px",
        paddingBottom: "65px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      {/* Booking Count Header */}
      {bookings[activeTab].length > 0 && (
        <h2
          className="text-gray-900 mb-4"
          style={{
            fontSize: "16px",
            fontWeight: 700,
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            width: "343px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {bookings[activeTab].length}{" "}
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Booking
          {bookings[activeTab].length > 1 ? "s" : ""}
        </h2>
      )}

      {activeTab === "upcoming" && bookings.upcoming.length === 0 && (
        <div
          className="flex flex-col items-center justify-center"
          style={{ paddingTop: "100px" }}
        >
          <p className="text-gray-400" style={{ fontSize: "16px" }}>
            No upcoming bookings
          </p>
        </div>
      )}

      {activeTab === "completed" && bookings.completed.length === 0 && (
        <div
          className="flex flex-col items-center justify-center"
          style={{ paddingTop: "100px" }}
        >
          <p className="text-gray-400" style={{ fontSize: "16px" }}>
            No completed bookings
          </p>
        </div>
      )}

      {activeTab === "cancelled" && bookings.cancelled.length === 0 && (
        <div
          className="flex flex-col items-center justify-center"
          style={{ paddingTop: "100px" }}
        >
          <p className="text-gray-400" style={{ fontSize: "16px" }}>
            No cancelled bookings
          </p>
        </div>
      )}

      {/* Booking Cards */}
      {bookings[activeTab].map((booking, index) => (
        <BookingCard
          key={booking.reservation_id}
          booking={booking}
          activeTab={activeTab}
          index={index}
        />
      ))}
    </div>
  );
}

export default BookingContent;
