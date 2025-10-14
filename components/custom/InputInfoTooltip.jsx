import React, { useState, useRef, useEffect } from "react";
import { Info, X } from "lucide-react";

// Reusable Tooltip Component
export const Tooltip = ({
  message,
  title = "Information",
  iconSize = 24,
  position = "bottom-left",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const positionClasses = {
    "bottom-left": "top-full right-0 mt-2",
    "bottom-right": "top-full left-0 mt-2",
    "top-left": "bottom-full right-0 mb-2",
    "top-right": "bottom-full left-0 mb-2",
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showTooltip]);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        className="text-teal-500 cursor-pointer transition-colors focus:outline-none"
        aria-label="Information"
      >
        <Info size={iconSize} />
      </button>

      {showTooltip && (
        <div
          className={`absolute ${positionClasses[position]} bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              <p className="text-gray-600 text-sm mt-1">{message}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
