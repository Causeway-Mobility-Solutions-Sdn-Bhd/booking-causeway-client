import React, { useState } from "react";

const GuestLoginToggler = ({ onToggle , setIsDrawerOpen , activeTab, setActiveTab}) => {
  const handleToggle = (tab) => {
    setActiveTab(tab);
    onToggle?.(tab);
    if(tab === "login"){
      setTimeout(() => {
        setIsDrawerOpen(true)
      },150)
    }
  };

  return (
    <div className="flex mb-6">
      <div className="bg-white rounded-lg flex flex-row w-full md:w-[60%] gap-2 sm:gap-0">
        <button
          onClick={() => handleToggle("guest")}
          className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "guest"
              ? "bg-teal-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Continue as guest
        </button>
        <button
          onClick={() => handleToggle("login")}
          className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "login"
              ? "bg-teal-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default GuestLoginToggler;
