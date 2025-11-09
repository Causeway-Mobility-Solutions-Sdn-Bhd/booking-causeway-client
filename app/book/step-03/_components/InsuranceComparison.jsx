import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

export default function InsuranceComparison({
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
}) {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      const ac = transformSelectedCharges();
      console.log(ac);
      fetchData(ac, false);
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const transformSelectedCharges = () => {
    return Object.entries(selectedCharges).map(([id, { quantity }]) => {
      const parsedId = parseInt(id, 10);
      return quantity === 0 ? `${parsedId}` : `${parsedId}_${quantity}`;
    });
  };

  const plans = [
    {
      id: 20,
      name: "Standard",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: false,
      price: "RM 0.00",
      color: "border-[#05C7194D]",
      icon: <ProgressBar colors={["#FF002A", "#E0E0E0", "#E0E0E0"]} />,
    },
    {
      id: 10,
      name: "Premium",
      excess: "RM 1,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: true,
      price: "+RM 40.00",
      color: "border-[#E69720]",
      icon: <ProgressBar colors={["#E69720", "#E28800", "#E0E0E0"]} />,
    },
    {
      id: 11,
      name: "Platinum",
      excess: "RM 0",
      thirdParty: true,
      towing: true,
      theft: true,
      exterior: true,
      price: "+RM 80.00",
      color: "border-[#FF002A]",
      icon: <ProgressBar colors={["#05C7194D", "#05C71999", "#05C719"]} />,
    },
  ];

  const handleAdditionalCharges = (id) => {
    const protectionIds = [9, 10, 11, 20];

    setSelectedCharges((prev) => {
      const updated = { ...prev };

      for (const key of Object.keys(updated)) {
        if (protectionIds.includes(Number(key))) {
          delete updated[key];
        }
      }

      updated[id] = { quantity: 0 };

      return updated;
    });
    setShouldFetch(true);
  };

  const handleRemoveAdditionalCharges = (id) => {
    setSelectedCharges((prev) => {
      const updated = { ...prev };
      delete updated[id];
      const protectionIds = [9, 10, 11];
      if (protectionIds.includes(Number(id))) {
        updated[20] = { quantity: 0 };
      }

      return updated;
    });

    setShouldFetch(true);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-2xl mx-auto mb-4">
      <div className="relative">
        <div className="absolute bottom-0 right-0 flex flex-col items-end mb-[-33px] mr-[-15px]">
          <div className="relative bg-cPrimary text-white px-4 py-1 rounded-sm text-xs flex items-center space-x-1">
            <Image
              src="/icons/thumbs-up.svg"
              width={16}
              height={16}
              alt="thumbs up"
              />
              <span>Excess refunded</span>

            <div className="absolute top-0 right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cPrimary -mt-[6px]"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-0 text-center text-sm border-t border-gray-100">
          <div className="text-gray-700 text-left  pr-2 border-r border-gray-200 border-l pl-2"></div>
          {plans.map((plan, index) => {
            const borderColor =
              index === 1 || index === 2 ? "#811311" : "#E5E7EB";
            const hasTopBorder = index === 2;

            return (
              <div
                key={plan.name}
                className={`pb-2 px-2 border-r ${
                  hasTopBorder ? "border-t" : ""
                }`}
                style={{
                  borderColor,
                  background: hasTopBorder
                    ? "linear-gradient(to bottom, #ffdee3 , #FFFFFF)"
                    : "transparent",
                }}
              >
                <div className="text-xs flex flex-col items-center py-3">
                  <span className="font-semibold text-base text-[14px]">
                    {plan.name}
                  </span>
                  {plan.icon}
                </div>
              </div>
            );
          })}
        </div>

        <div className="divide-y divide-gray-100">
          <Row label="Excess" values={plans.map((p) => p.excess)} />
          <Row
            label="3rd Party Liability"
            values={plans.map((p) =>
              p.thirdParty ? (
                <Check
                  className="w-5 h-5 mx-auto"
                  style={{ color: "#2dbdb6" }}
                />
              ) : (
                <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
              )
            )}
          />
          <Row
            label="Towing And Road Side Assistance"
            values={plans.map((p) =>
              p.towing ? (
                <Check
                  className="w-5 h-5 mx-auto"
                  style={{ color: "#2dbdb6" }}
                />
              ) : (
                <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
              )
            )}
          />
          <Row
            label="Vehicle Theft And Fire"
            values={plans.map((p) =>
              p.theft ? (
                <Check
                  className="w-5 h-5 mx-auto"
                  style={{ color: "#2dbdb6" }}
                />
              ) : (
                <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
              )
            )}
          />
          <Row
            label="Damage To Vehicle Exterior (Excluding Interior Damage)"
            values={plans.map((p) =>
              p.exterior ? (
                <Check
                  className="w-5 h-5 mx-auto"
                  style={{ color: "#2dbdb6" }}
                />
              ) : (
                <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
              )
            )}
          />
          <Row
            label="Price"
            values={plans.map((p) =>
              selectedCharges.hasOwnProperty(p.id) ? (
                <div className="flex flex-col items-center pt-3">
                  {p.id !== 20 && (
                    <div className="mb-2">
                      <p className="font-semibold text-sm text-left text-gray-800">
                        {p.price}
                      </p>
                      <p className="text-gray-800 text-left">/Day</p>
                    </div>
                  )}
                  {p.id === 20 ? (
                    <p className="text-gray-400 text-xs">Currently Included</p>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdditionalCharges(p.id)}
                      className="text-xs text-white font-medium px-6 py-2 rounded-lg"
                      style={{
                        backgroundColor: "#ff748b",
                        border: "1px solid #ff748b",
                      }}
                    >
                      Added
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center py-3">
                  {p.id !== 20 && (
                    <div className="mb-2">
                      <p className="font-semibold text-sm text-left text-gray-800">
                        {p.price}
                      </p>
                      <p className="text-gray-800 text-left">/Day</p>
                    </div>
                  )}
                  {p.id === 20 ? (
                    <p className="text-gray-400 text-xs mt-2">
                      Currently Included
                    </p>
                  ) : (
                    <button
                      onClick={() => handleAdditionalCharges(p.id)}
                      className="text-xs font-medium px-6 py-2 rounded-lg mt-3"
                      style={{
                        color: "#ff748b",
                        border: "1px solid #ff748b",
                        backgroundColor: "white",
                      }}
                    >
                      Add
                    </button>
                  )}
                </div>
              )
            )}
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, values }) {
  return (
    <div
      className={`grid grid-cols-4 gap-0 items-center  border-t border-gray-100`}
    >
      <div
        className={`text-gray-700 text-left flex items-center text-xs ${
          label === "Price" && "border-b"
        } ${
          label !== "Price" ? "py-4" : "h-full"
        } font-medium pr-2 border-l pl-2 border-r border-gray-200`}
      >
        {label}
      </div>
      {values.map((v, i) => {
        const borderRightColor = i === 1 || i === 2 ? "#811311" : "#E5E7EB";
        const borderBottomColor =
          label === "Price" ? (i === 2 ? "#811311" : "#E5E7EB") : "transparent";

        return (
          <div
            key={i}
            className={`text-center text-sm font-medium h-full flex justify-center items-center text-gray-800 border-r ${
              label === "Price" ? "border-b" : ""
            }`}
            style={{
              borderRightColor,
              borderBottomColor,
            }}
          >
            {v}
          </div>
        );
      })}
    </div>
  );
}

const ProgressBar = ({ colors = [] }) => (
  <div className="w-[63px] rounded-full h-[8px] bg-white relative overflow-hidden mt-2">
    {colors.map((color, index) => (
      <div
        key={index}
        className="absolute h-[8px]"
        style={{
          left: `${index * 21}px`,
          width: "20px",
          backgroundColor: color,
        }}
      />
    ))}
  </div>
);
