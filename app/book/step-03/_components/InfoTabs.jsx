import React from "react";
import { Info } from "lucide-react";
import SubHead from "@/components/custom/SubHead";

export default function InfoTabs() {
  const sections = [
    {
      title: "Fuel Policy",
      value: ["Level to Level"],
    },
    {
      title: "Mileage Policy",
      value: ["Unlimited mileage"],
    },
    {
      title: "Payment Policy",
      value: ["Pay in full", "Pay at pick up"],
    },
  ];

  return (
    <div className=" w-full max-w-md mx-auto mb-4">
      <SubHead text="Info Tabs" />

      <div className="space-y-5">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border shadow-sm mt-2"
          >
            {/* Header */}
            <div className="flex items-center gap-1 mb-3">
              <h3 className="font-medium text-gray-800">{section.title}</h3>
              <Info className="w-4 h-4 text-cPrimary" />
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-3">
              {section.value.map((v, j) => (
                <button
                  key={j}
                  className="px-4 py-2 rounded-lg border border-[#811311] text-cPrimary font-medium text-sm transition"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
