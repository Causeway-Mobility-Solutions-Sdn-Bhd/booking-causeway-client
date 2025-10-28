import React from "react";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <button
          onClick={() => setActiveTab("upcoming")}
          className="relative transition-colors"
          style={{
            color: activeTab === "upcoming" ? "#2DBDB6" : "#404040",
            fontSize: "12px",
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: activeTab === "upcoming" ? 700 : 400,
            letterSpacing: "-0.0241em",
            padding: "14px 0",
            flex: 1,
            textAlign: "center",
          }}
        >
          Upcoming
          {activeTab === "upcoming" && (
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: "2px", backgroundColor: "#2DBDB6" }}
            ></div>
          )}
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className="relative transition-colors"
          style={{
            color: activeTab === "completed" ? "#2DBDB6" : "#404040",
            fontSize: "12px",
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: activeTab === "completed" ? 700 : 400,
            letterSpacing: "-0.0241em",
            padding: "14px 0",
            flex: 1,
            textAlign: "center",
          }}
        >
          Completed
          {activeTab === "completed" && (
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: "2px", backgroundColor: "#2DBDB6" }}
            ></div>
          )}
        </button>

        <button
          onClick={() => setActiveTab("cancelled")}
          className="relative transition-colors"
          style={{
            color: activeTab === "cancelled" ? "#2DBDB6" : "#404040",
            fontSize: "12px",
            fontFamily:
              "Poppins, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: activeTab === "cancelled" ? 700 : 400,
            letterSpacing: "-0.0241em",
            padding: "14px 0",
            flex: 1,
            textAlign: "center",
          }}
        >
          Cancelled
          {activeTab === "cancelled" && (
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: "2px", backgroundColor: "#2DBDB6" }}
            ></div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Tabs;
