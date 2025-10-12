import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Spinner from "@/components/custom/Spinner";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const protectionFeatures = [
  {
    name: "3rd Party Liability",
    basic: true,
    economy: true,
  },
  {
    name: "Towing And Road Side Assistance",
    basic: true,
    economy: true,
  },
  {
    name: "Vehicle Theft And Fire",
    basic: false,
    economy: true,
  },
  {
    name: "Damage To Vehicle Exterior (Excluding Interior Damage)",
    basic: false,
    economy: true,
  },
  {
    name: "Windscreen Damage Protection",
    basic: false,
    economy: true,
  },
  {
    name: "Interior Damage Protection",
    basic: false,
    economy: true,
  },
];

const options = [
  { name: "basic", id: 20 },
  { name: "econamy", id: 11 },
];

const UpgradeDrawer = ({
  selectedCharges,
  setSelectedCharges,
  fetchData,
  finalLoader,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("economy");

  useEffect(() => {
    setSelectedOption("economy");
  }, [isDrawerOpen]);

  const handleDrawerChange = (open) => {
    if (open) {
      const platinumIds = [9, 10, 11];
      const selectedIds = Object.keys(selectedCharges).map(Number);
      const hasPlatinum = selectedIds.some((id) => platinumIds.includes(id));

      if (hasPlatinum) {
        conformNextStep();
      } else {
        setIsDrawerOpen(open);
      }
    } else {
      setIsDrawerOpen(open);
    }
  };

  const handleOptionSelect = (option, id) => {
    setSelectedOption(option);
  };

  const transformSelectedCharges = (id) => {
    const protectionIds = [9, 10, 11, 20];
    let newSelectedCharges = { ...selectedCharges };

    protectionIds.forEach((pid) => {
      if (newSelectedCharges[pid]) {
        delete newSelectedCharges[pid];
      }
    });

    newSelectedCharges[id] = { quantity: 0 };
    setSelectedCharges(newSelectedCharges);

    return Object.entries(newSelectedCharges).map(([id, { quantity }]) => {
      const parsedId = parseInt(id, 10);
      return quantity === 0 ? `${parsedId}` : `${parsedId}_${quantity}`;
    });
  };

  const conformNextStep = () => {
    const ac = transformSelectedCharges(11);
    fetchData(ac, true);
  };

  const conformNoThanks = () => {
    const ac = transformSelectedCharges(20);
    fetchData(ac, true);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawerChange}>
      <DrawerTrigger asChild>
        <Button
          disabled={finalLoader}
          className="items-center bg-cPrimary basis-[40%] sm:basis-[10%] h-[53px] text-white"
        >
          {finalLoader ? (
            <Spinner size={20} color="#fff" thickness={3} />
          ) : (
            <span>Next</span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex flex-col bg-white rounded-t-xl h-[85vh]">
        {/* Header */}
        <DrawerHeader className="flex items-center justify-between border-b border-[#e6e6e6] px-4 py-3 relative">
          <DrawerTitle className="text-center w-full text-lg font-semibold text-gray-800">
            Upgrade Protection
          </DrawerTitle>
        </DrawerHeader>

        {/* Comparison Table */}
        <div className="px-4 py-6">
          <div className="border border-[#e6e6e6] rounded-lg overflow-hidden">
            {/* Fixed Header */}
            <div className="bg-[#e6e6e6] sticky top-0 z-10">
              <table className="w-full text-sm text-gray-800">
                <thead>
                  <tr>
                    <th className="p-3 text-left w-1/2"></th>
                    <th
                      className={`p-3 text-center font-medium cursor-pointer transition-colors ${
                        selectedOption === "basic"
                          ? "text-white bg-[#006643]"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => handleOptionSelect("basic", 20)}
                    >
                      Basic
                    </th>
                    <th
                      className={`p-3 text-center font-medium cursor-pointer transition-colors ${
                        selectedOption === "economy"
                          ? "text-white bg-[#006643]"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => handleOptionSelect("economy", 11)}
                    >
                      Economy
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Body */}
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm text-gray-800">
                <tbody>
                  {/* Excess Row */}
                  <tr className="border-t border-[#e6e6e6]">
                    <td className="p-3 font-medium w-1/2">Excess</td>
                    <td className="p-3 text-center">RM 5,000</td>
                    <td className="p-3 text-center">RM 0</td>
                  </tr>
                  {/* Feature Rows */}
                  {protectionFeatures.map((feature, index) => (
                    <tr key={index} className="border-t border-[#e6e6e6]">
                      <td className="p-3 w-1/2">{feature.name}</td>
                      {/* Basic column */}
                      <td className="p-3 text-center">
                        {feature.basic ? (
                          <FaCheckCircle
                            size={20}
                            className={`flex items-center justify-center w-full ${
                              selectedOption === "basic"
                                ? "text-[#006643]"
                                : "text-[#404040]"
                            } `}
                          />
                        ) : (
                          <XCircle size={20} className="text-red-500 mx-auto" />
                        )}
                      </td>
                      {/* Economy column */}
                      <td className="p-3 text-center">
                        {feature.economy ? (
                          <FaCheckCircle
                            size={20}
                            className={`flex items-center justify-center w-full ${
                              selectedOption === "economy"
                                ? "text-[#006643]"
                                : "text-[#404040]"
                            } `}
                          />
                        ) : (
                          <XCircle size={20} className="text-red-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 space-y-3">
          <p className="text-center text-sm text-gray-600">
            <>
              Upgrade to Economy at{" "}
              <span className="font-bold text-black">+RM80/day</span>
            </>
          </p>

          <button
            className="w-full bg-[#ff748b] hover:bg-[#ff5a73] text-white py-3 rounded-lg font-medium transition-colors"
            onClick={conformNextStep}
          >
            {finalLoader ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              <>
                <span>Upgrade to Economy</span>
              </>
            )}
          </button>

          <button
            onClick={conformNoThanks}
            className="block mx-auto text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
          >
            No, thanks
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UpgradeDrawer;
