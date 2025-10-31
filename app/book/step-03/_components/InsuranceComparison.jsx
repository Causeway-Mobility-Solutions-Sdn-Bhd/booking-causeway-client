import React , {useEffect , useState} from "react";

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

  console.log(selectedCharges);
  const plans = [
    {
      id: 20,
      name: "Standard",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: false,
      price: "RM 0.00 /Day",
      color: "border-[#05C7194D]",
      icon: <ProgressBar colors={["#05C7194D", "#05C71999", "#05C719"]} />,
    },
    {
      id: 10,
      name: "Premium",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: true,
      price: "+RM 40.00 /Day",
      color: "border-[#E69720]",
      icon: <ProgressBar colors={["#E69720", "#E28800", "#E0E0E0"]} />,
    },
    {
      id: 11,
      name: "Platinum",
      excess: "RM 1,500",
      thirdParty: true,
      towing: true,
      theft: true,
      exterior: true,
      price: "+RM 80.00 /Day",
      color: "border-[#FF002A]",
      icon: <ProgressBar colors={["#FF002A", "#E0E0E0", "#E0E0E0"]} />,
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
    setShouldFetch(true)
  };

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
            selectedCharges.hasOwnProperty(p.id) ? (
              <div>
                <p className="font-semibold" >{p.price}</p>
                <p className="text-gray-400 mt-2">Currently Included</p>
              </div>
            ) : (
              <>
                <p className="font-semibold">{p.price}</p>
                <button
                  onClick={() => handleAdditionalCharges(p.id)}
                  className="ml-2 text-sm border-cPrimary border-1 text-cPrimary font-medium px-4 py-2 mt-2 rounded-lg"
                >
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
