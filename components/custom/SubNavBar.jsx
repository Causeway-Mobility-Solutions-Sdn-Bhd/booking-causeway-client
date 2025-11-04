import { ChevronLeft } from "lucide-react";
import React from "react";

function SubNavBar({name}) {
  return (
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center relative border-b border-gray-200 bg-white">
      <button
        onClick={() => window.history.back()}
        className="absolute left-0 p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-7 h-7 text-[#2DBDB6]" strokeWidth={3} />
      </button>
      <h1 className="text-gray-900 text-base font-normal leading-[18px]">
        {name}
      </h1>
    </div>
  );
}

export default SubNavBar;
