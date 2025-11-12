import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";

export default function InsuranceComparison({
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
}) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [chargeId, setChargeId] = useState(null);

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
    setChargeId(id);
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
        <div
          className={`absolute bottom-0 ${
            chargeId === 10 ? "right-[25%]" : "right-[0]"
          } flex flex-col items-end mb-[-33px] mr-[-15px]`}
        >
          <div className="relative bg-cPrimary text-white px-4 py-1 rounded-sm text-xs flex items-center space-x-1">
            <Image
              src="/icons/thumbs-up.svg"
              width={16}
              height={16}
              alt="thumbs up"
              loading="lazy"
            />
            <span>Excess refunded</span>

            <div className="absolute top-0 right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cPrimary -mt-[6px]"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-0 text-center text-sm border-b border-gray-200">
          <div className="text-gray-700 text-left border-t rounded-tl-2xl pr-2 border-r border-gray-200 border-l pl-2"></div>
          {plans.map((plan, index) => {
            const borderColor = (chargeId === 10 ? index === 1 : index === 2)
              ? "#811311"
              : "#E5E7EB";
            const borderRightColor = (
              chargeId === 10
                ? index === 0 || index === 1
                : index === 1 || index === 2
            )
              ? "#811311"
              : "#E5E7EB";

            const hasTopBorder = chargeId === 10 ? index === 1 : index === 2;

            return (
              <div
                key={plan.name}
                className={`pb-2 px-2  border-r border-t ${
                  index === 2 && "rounded-tr-2xl"
                }`}
                style={{
                  borderTopColor: borderColor,
                  borderRightColor: borderRightColor,
                  background: hasTopBorder
                    ? "linear-gradient(to bottom, #ffdee3 , #FFFFFF)"
                    : "transparent",
                }}
              >
                <div className="text-xs flex flex-col items-center py-3">
                  <span className="font-semibold text-base text-[14px]">
                    {plan.name}
                  </span>
                  <div className="flex justify-center items-center gap-1 mt-2">
                    <Image
                      src="/icons/security-check.svg"
                      width={15}
                      height={15}
                      alt="insurance plan icon"
                      loading="lazy"
                    />
                    {plan.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="divide-y divide-gray-100">
          <Row
            label="Excess"
            chargeId={chargeId}
            values={plans.map((p) => p.excess)}
          />
          <Row
            label="3rd Party Liability"
            chargeId={chargeId}
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
            chargeId={chargeId}
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
            chargeId={chargeId}
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
            chargeId={chargeId}
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
            chargeId={chargeId}
            values={plans.map((p) =>
              selectedCharges.hasOwnProperty(p.id) ? (
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
                    <p className="text-gray-400 text-xs">Currently Included</p>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdditionalCharges(p.id)}
                      className="text-xs text-white font-medium px-4 py-2 rounded-lg mt-3"
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
                      className="text-xs font-medium px-4 py-2 rounded-lg mt-3"
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

function Row({ label, chargeId, values }) {
  console.log("Row chargeId:", chargeId);
  return (
    <div
      className={`grid grid-cols-4 gap-0 items-center  border-gray-100 border-dashed`}
    >
      <div
        className={`text-gray-700 text-left flex ${
          label === "Price" && "rounded-bl-2xl"
        }  items-center text-xs ${label === "Price" && "border-b"} ${
          label !== "Price" ? "py-4" : "h-full"
        } font-medium pr-2 border-l pl-2 border-r border-gray-200`}
      >
        {label}
      </div>
      {values.map((v, i) => {
        const borderRightColor = (
          chargeId === 10 ? i === 0 || i === 1 : i === 1 || i === 2
        )
          ? "#811311"
          : "#E5E7EB";
        const borderBottomColor =
          label === "Price"
            ? i === (chargeId === 10 ? 1 : 2)
              ? "#811311"
              : "#E5E7EB"
            : "transparent";

        return (
          <div
            key={i}
            className={`text-center relative text-sm font-medium h-full flex justify-center items-center text-gray-800 border-r ${
              label === "Price" && i === 2 && "rounded-br-2xl"
            } ${label === "Price" ? "border-b" : ""}`}
            style={{
              borderRightColor,
              borderBottomColor,
            }}
          >
            {label === "Price" && i === 0 && (
              <div className="py-1 px-1 absolute bottom-0 right-0 bg-cPrimary z-20 flex justify-center items-center rounded-tl-2xl">
                <IoCheckmark color="#fff" />
              </div>
            )}
            {v}
          </div>
        );
      })}
    </div>
  );
}

const ProgressBar = ({ colors = [] }) => (
  <div className="w-[63px] rounded-full h-[8px] bg-white relative overflow-hidden">
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
