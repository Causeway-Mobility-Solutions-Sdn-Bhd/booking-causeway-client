import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

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
    <div className="bg-white px-3 pt-4 rounded-2xl shadow-lg w-full max-w-2xl mx-auto mb-4">
      <div className="grid grid-cols-4 gap-0 text-center text-sm font-medium border-b border-gray-200 pb-4 mb-2">
        <div className="text-gray-700 text-left text-xs"></div>
        {plans.map((plan) => (
          <div key={plan.name} className={`pt-3 -mt-6 rounded-t-lg`}>
            <div className="text-xs flex flex-col items-center">
              <span className="font-semibold text-base mb-1">{plan.name}</span>
              {plan.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-100">
        <Row label="Excess" values={plans.map((p) => p.excess)} />
        <Row
          label="3rd Party Liability"
          values={plans.map((p) =>
            p.thirdParty ? (
              <Check className="w-5 h-5 mx-auto" style={{ color: "#2dbdb6" }} />
            ) : (
              <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
            )
          )}
        />
        <Row
          label="Towing And Road Side Assistance"
          values={plans.map((p) =>
            p.towing ? (
              <Check className="w-5 h-5 mx-auto" style={{ color: "#2dbdb6" }} />
            ) : (
              <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
            )
          )}
        />
        <Row
          label="Vehicle Theft And Fire"
          values={plans.map((p) =>
            p.theft ? (
              <Check className="w-5 h-5 mx-auto" style={{ color: "#2dbdb6" }} />
            ) : (
              <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
            )
          )}
        />
        <Row
          label="Damage To Vehicle Exterior (Excluding Interior Damage)"
          values={plans.map((p) =>
            p.exterior ? (
              <Check className="w-5 h-5 mx-auto" style={{ color: "#2dbdb6" }} />
            ) : (
              <X className="w-5 h-5 mx-auto" style={{ color: "#ff748b" }} />
            )
          )}
        />
        <Row
          label="Price"
          values={plans.map((p) =>
            selectedCharges.hasOwnProperty(p.id) ? (
              <div className="flex flex-col items-center">
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
              <div className="flex flex-col items-center">
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
                    className="text-xs font-medium px-6 py-2 rounded-lg"
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
  );
}

function Row({ label, values }) {
  return (
    <div className="grid grid-cols-4 gap-0 items-center py-4">
      <div className="text-gray-700 text-left text-xs font-medium pr-2">
        {label}
      </div>
      {values.map((v, i) => (
        <div key={i} className="text-center text-sm font-medium text-gray-800">
          {v}
        </div>
      ))}
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
