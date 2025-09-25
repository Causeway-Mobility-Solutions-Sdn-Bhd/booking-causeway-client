"use client";
import React from "react";
import { Wrench, MessageCircle } from "lucide-react";

function Page() {
  const handleTalkWithAgent = () => {
    window.open("tel:+1-800-123-4567", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Wrench className="w-8 h-8 text-gray-600" />
        </div>

        <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
          Under Development
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Something New is Coming
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          We’re working hard behind the scenes to bring you a smoother, smarter
          and more exciting experience very soon.
        </p>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Development Progress</span>
            <span className="text-sm text-gray-500">70%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: "70%",
                backgroundColor: "#ff748b",
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleTalkWithAgent}
          className="px-6 py-3 bg-cSecondary text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Talk with Our Agent
        </button>

        <p className="text-sm text-gray-500 mt-4">
          We can’t wait to share this with you soon!
        </p>
      </div>
    </div>
  );
}

export default Page;
