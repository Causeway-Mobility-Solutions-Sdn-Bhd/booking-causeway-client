import React from "react";

export default function InsuranceComparison({
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
}) {
  console.log(selectedCharges)
  const plans = [
    {
      name: "Standard",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: false,
      price: "Currently Included",
      color: "border-green-400",
      icon: <ProgressBar colors={["#05C7194D", "#05C71999", "#05C719"]} />,
    },
    {
      name: "Premium",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: true,
      price: "+RM 25.31 /Day",
      color: "border-yellow-400",
      icon: <ProgressBar colors={["#E69720", "#E28800", "#E0E0E0"]} />
    },
    {
      name: "Platinum",
      excess: "RM 1,500",
      thirdParty: true,
      towing: true,
      theft: true,
      exterior: true,
      price: "+RM 25.31 /Day",
      color: "border-pink-400",
      icon: <ProgressBar colors={["#FF002A", "#E0E0E0", "#E0E0E0"]} />
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto border border-gray-200 mb-4">
      <div className="grid grid-cols-4 text-center text-sm font-medium border-b pb-3">
        <div className="text-gray-600 text-left">Coverage</div>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border-t-4 ${plan.color} rounded-t-lg pt-2`}
          >
            <div className="text-xs flex flex-col items-center">
              {plan.icon}
              <span className="font-semibold mt-1">{plan.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y text-sm">
        <Row label="Excess" values={plans.map((p) => p.excess)} />
        <Row
          label="3rd Party Liability"
          values={plans.map((p) => (p.thirdParty ? "✔️" : "❌"))}
        />
        <Row
          label="Towing And Road Side Assistance"
          values={plans.map((p) => (p.towing ? "✔️" : "❌"))}
        />
        <Row
          label="Vehicle Theft And Fire"
          values={plans.map((p) => (p.theft ? "✔️" : "❌"))}
        />
        <Row
          label="Damage To Vehicle Exterior (Excluding Interior Damage)"
          values={plans.map((p) => (p.exterior ? "✔️" : "❌"))}
        />
        <Row
          label="Price"
          values={plans.map((p) =>
            p.price === "Currently Included" ? (
              <span className="text-gray-400">{p.price}</span>
            ) : (
              <>
                <span className="text-cPrimary font-semibold">{p.price}</span>
                <button className="ml-2 text-sm border-cPrimary text-cPrimary font-medium px-3 py-1 rounded-lg">
                  Add
                </button>
              </>
            )
          )}
        />
      </div>


    </div>
  );
}

function Row({ label, values }) {
  return (
    <div className="grid grid-cols-4 items-center py-3">
      <div className="text-gray-600 text-left">{label}</div>
      {values.map((v, i) => (
        <div key={i} className="text-center">
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
