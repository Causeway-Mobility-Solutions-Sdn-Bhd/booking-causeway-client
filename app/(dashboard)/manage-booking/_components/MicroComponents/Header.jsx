import React from "react";
import { ChevronLeft } from "lucide-react";
import Tabs from "./Tabs";

function Header({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      <div
        className="max-w-7xl mx-auto px-4"
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #e6e6e6",
        }}
      >
        <button
          onClick={() => window.history.back()}
          className="hover:bg-gray-100 rounded-lg transition-colors"
          style={{
            position: "absolute",
            left: "0",
            padding: "8px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronLeft
            style={{ width: "28px", height: "28px", color: "#2DBDB6" }}
            strokeWidth={3}
          />
        </button>
        <h1
          className="text-gray-900"
          style={{
            fontSize: "16px",
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            lineHeight: "18px",
            letterSpacing: "0",
            textTransform: "none",
          }}
        >
          My Booking
        </h1>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Header;
