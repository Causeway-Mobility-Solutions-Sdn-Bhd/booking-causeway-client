import React from "react";
import { CheckCircle } from "lucide-react";

const PolicyBox = ({ heading, items = [], variant = "icon" }) => {
  return (
    <div className="rounded-md shadow-sm px-6 py-3 bg-white mb-4">
      <h3 className="font-semibold text-[15px] mb-2">{heading}</h3>

      {variant === "bullet" ? (
        <ul className="list-disc list-inside space-y-2 pl-3">
          {items.map((item, index) => (
            <li key={index} className="text-[14px] text-[#404040] leading-5">
              {item.description}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="text-[#404040] mt-0.5 flex-shrink-0">
                {item.icon || <CheckCircle size={14} />}
              </span>
              <span className="text-[14px] text-[#404040] leading-5">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PolicyBox;
