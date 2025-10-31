import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import SmartImage from "@/components/custom/SmartImage";

import { useRouter } from "next/navigation";
import React from "react";

function BookingCard({ booking, activeTab, index }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/manage/${booking.id}`);
  };

  const onRebook = async () => {
    console.log("Rebooking...");

    // try {
    //   await reBook({ id: booking.id }).unwrap();
    //   showSuccessToast("Booking Rebooked successfully!");
    // } catch (error) {
    //   const errorMessage =
    //     error?.data?.message || "Failed to Rebook. Please try again.";
    //   showErrorToast(errorMessage);
    //   console.error("Error reopening booking:", error);
    // }
  };
  return (
    <div
      className="bg-white mb-4"
      style={{
        width: "343px",
        minHeight: "455px",
        padding: "16px",
        border: "1px solid #f3f4f6",
        borderRadius: "12px",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Car Image */}
      <div
        className="bg-white rounded-lg mb-4 flex items-center justify-center"
        style={{ height: "200px", overflow: "hidden" }}
      >
        <SmartImage
          src={booking?.vehicle_class_image}
          width={230}
          height={100}
          alt={`${booking?.vehicle_class.name}`}
        />
      </div>

      {/* Car Name */}
      <h3
        className="text-gray-900 mb-3"
        style={{
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
          width: "311px",
        }}
      >
        {booking.vehicle_class.name}
      </h3>

      {/* Car Specs */}
      <div
        className="flex items-center justify-between mb-4"
        style={{
          paddingBottom: "16px",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        {booking?.vehicle_class?.features?.map((feature) => {
          return (
            <div
              key={feature.id}
              className="flex flex-col items-center"
              style={{ width: "77.75px", height: "30px" }}
            >
              <img
                src={feature?.images[0]?.public_link}
                alt="Economy"
                style={{
                  width: "13px",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              <span className="text-xs mt-1 text-muted-foreground">
                {feature?.label_for_website?.en || feature?.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Location and Date */}
      <div className="flex items-start mb-4">
        <img
          src="booking/Icons Outline.svg"
          alt="Location"
          style={{
            width: "24px",
            height: "24px",
            marginTop: "2px",
            marginRight: "8px",
            flexShrink: 0,
          }}
        />
        <div style={{ width: "275px" }}>
          <p
            className="text-gray-900"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "2px",
              fontFamily:
                "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {booking.dateWithDays || ""}
          </p>
          <p
            className="text-gray-600"
            style={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily:
                "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {booking.pick_up_location}
          </p>
          {booking.return_location !== booking.pick_up_location && (
            <p
              className="text-gray-600"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                fontFamily:
                  "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              {booking.return_location}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {activeTab === "upcoming" && (
        <button
          onClick={handleClick}
          className="w-full text-white transition-all"
          style={{
            backgroundColor: "#FF748B",
            padding: "12px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            borderRadius: "8px",
            width: "311px",
            height: "44px",
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
                  backgroundColor: "white",
                  border: "1px solid #FF748B",
                  color: "#FF748B",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily:
                    "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
                  borderRadius: "8px",
                  height: "44px",
                }}
              >
                Add Review
              </button>
              <button
                onClick={onRebook}
                className="flex-1 text-white transition-all"
                style={{
                  backgroundColor: "#FF748B",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily:
                    "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
                  borderRadius: "8px",
                  height: "44px",
                }}
              >
                Re-book
              </button>
            </>
          ) : (
            <button
              onClick={onRebook}
              className="w-full text-white transition-all"
              style={{
                backgroundColor: "#FF748B",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily:
                  "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
                borderRadius: "8px",
                width: "311px",
                height: "44px",
              }}
            >
              Re-book
            </button>
          )}
        </div>
      )}

      {activeTab === "cancelled" && (
        <button
          onClick={onRebook}
          className="w-full text-white transition-all"
          style={{
            backgroundColor: "#FF748B",
            padding: "12px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            borderRadius: "8px",
            width: "311px",
            height: "44px",
          }}
        >
          Re-Book
        </button>
      )}
    </div>
  );
}

export default BookingCard;
