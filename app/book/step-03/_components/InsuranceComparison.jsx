import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import { useAppSelector } from "@/store/hooks";
import SubHead from "@/components/custom/SubHead";

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

function Row({ label, chargeId, handleAdditionalCharges, values }) {
  const ids = [20, 10, 11];

  return (
    <div className="grid grid-cols-4 gap-0 items-center border-gray-100 border-dashed">
      {/* LEFT LABEL */}
      <div
        className={`text-gray-700 text-left h-full flex ${
          label === "Price"
            ? "rounded-bl-2xl border-b pt-3"
            : "py-4 items-center"
        } text-xs font-medium pr-2 border-l pl-2 border-r border-gray-200`}
      >
        {label}
      </div>

      {/* VALUES */}
      {values.map((v, i) => {
        const isHighlighted = chargeId === ids[i];

        return (
          <div
            key={i}
            onClick={() => handleAdditionalCharges(ids[i])}
            className={`text-center relative text-sm font-medium h-full flex justify-center items-center text-gray-800 border-r border-l
              ${label === "Price" && isHighlighted ? "rounded-b-2xl" : ""}
              ${(label === "Price" &&  i === 0) && "rounded-br-none"}
              ${label === "Price" && i === 2 ? "rounded-br-2xl" : ""}
              ${label === "Price" ? "border-b" : ""}
            `}
            style={{
              borderRightColor: isHighlighted ? "#811311" : "#E5E7EB",
              borderLeftColor: isHighlighted ? "#811311" : "#E5E7EB",
              borderBottomColor:
                label === "Price"
                  ? isHighlighted
                    ? "#811311"
                    : "#E5E7EB"
                  : "transparent",
            }}
          >
            {/* BEST VALUE ICON (LEFT COLUMN ONLY) */}
            {label === "Price" && i === 0 && (
              <div className="w-4 h-4 absolute overflow-hidden bottom-0 right-0 bg-cPrimary z-20 flex justify-center items-center rounded-tl-2xl">
                <IoCheckmark className="text-[11px]" color="#fff" />
              </div>
            )}

            {v}
          </div>
        );
      })}
    </div>
  );
}

export default function InsuranceComparison({
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
}) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [chargeId, setChargeId] = useState(null);

  const additionalCharges = useAppSelector(
    (state) => state?.reservation?.additionalCharges
  );
  const currency = useAppSelector((state) => state.reservation.currency);
  const allCurrencies = useAppSelector(
    (state) => state.reservation.allCurrencies
  );

  // PLANS (NO JSX INSIDE STATE)
  const [plans, setPlans] = useState([
    {
      id: 20,
      name: "Standard",
      excess: "RM 2,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: false,
      price: "0.00",
      iconColors: ["#FF002A", "#E0E0E0", "#E0E0E0"],
    },
    {
      id: 10,
      name: "Premium",
      excess: "RM 1,500",
      thirdParty: false,
      towing: false,
      theft: false,
      exterior: true,
      price: "40.00",
      iconColors: ["#E69720", "#E28800", "#E0E0E0"],
    },
    {
      id: 11,
      name: "Platinum",
      excess: "RM 0",
      thirdParty: true,
      towing: true,
      theft: true,
      exterior: true,
      price: "80.00",
      iconColors: ["#05C7194D", "#05C71999", "#05C719"],
    },
  ]);

  const formatFinalPrice = (price) => {
    const rate =
      allCurrencies?.find((cur) => cur?.code === currency)?.exchange_rate ||
      1;
    return `${(rate * price?.usd_amount).toFixed(2)}`;
  };

  const showCurrency = (id) => {
    const isMYR = currency === "myr";
    const prefix = id === 20 ? "" : "+";
    return isMYR ? `${prefix}RM` : `${prefix}${currency.toUpperCase()}`;
  };

  const transformSelected = () =>
    Object.entries(selectedCharges).map(([id, { quantity }]) =>
      quantity === 0 ? `${id}` : `${id}_${quantity}`
    );

  // UPDATE PRICES FROM API
  useEffect(() => {
    if (!additionalCharges?.length) return;

    const all = additionalCharges.flatMap((c) => c.charges || []);
    const filtered = all.filter((c) => [10, 11, 20].includes(c.id));

    const updated = plans.map((plan) => {
      const match = filtered.find((c) => c.id === plan.id);
      return match
        ? { ...plan, price: formatFinalPrice(match?.total_price) }
        : plan;
    });

    setPlans(updated);
  }, [additionalCharges]);

  // UPDATE SELECTED ID
  useEffect(() => {
    if (selectedCharges[20]) setChargeId(20);
    else if (selectedCharges[10]) setChargeId(10);
    else if (selectedCharges[11]) setChargeId(11);
    else setChargeId(null);
  }, [selectedCharges]);

  // FETCH
  useEffect(() => {
    if (shouldFetch) {
      fetchData(transformSelected(), false);
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleAdditionalCharges = (id) => {
    const protectionIds = [9, 10, 11, 20];

    setSelectedCharges((prev) => {
      const updated = Object.fromEntries(
        Object.entries(prev).filter(
          ([key]) => !protectionIds.includes(+key)
        )
      );
      updated[id] = { quantity: 0 };
      return updated;
    });

    setChargeId(id);
    setShouldFetch(true);
  };

  const handleRemoveAdditionalCharges = (id) => {
    setSelectedCharges((prev) => {
      const updated = { ...prev };
      delete updated[id];
      updated[20] = { quantity: 0 }; // fallback to Standard
      return updated;
    });

    setChargeId(20);
    setShouldFetch(true);
  };

  return (
    <div>
      <SubHead text={"Select Packages"} />

      <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-2xl mx-auto my-4">
        <div className="relative border border-gray-200 rounded-2xl">
          {/* SMART CHOICE BADGE */}
          <div className="absolute bottom-0 right-0 mb-[-33px] mr-[-15px]">
            <div className="relative bg-cSecondary text-white px-4 py-1 rounded-sm text-xs flex items-center space-x-1">
              <Image
                src="/icons/thumbs-up-02.svg"
                width={16}
                height={16}
                alt="thumbs up"
                loading="lazy"
              />
              <span>Smart Choice</span>
              <div className="absolute top-0 right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cSecondary -mt-[6px]" />
            </div>
          </div>

          {/* HEADER */}
          <div className="grid grid-cols-4 text-center text-sm border-b border-gray-200">
            <div className="text-gray-700 text-left border-t rounded-tl-2xl pr-2 border-r border-l pl-2" />

            {plans.map((plan  , index) => {
              const isHighlighted = chargeId === plan.id;

              return (
                <div
                  key={plan.id}
                  onClick={() => handleAdditionalCharges(plan.id)}
                  className={`pb-2 px-2 border-r border-l border-t ${index === 2 && 'rounded-tr-2xl'} ${
                    isHighlighted ? "rounded-t-2xl" : ""
                  }`}
                  style={{
                    borderColor: isHighlighted ? "#811311" : "#E5E7EB",
                    background: isHighlighted
                      ? "linear-gradient(to bottom, #ffdee3 , #FFFFFF)"
                      : "transparent",
                  }}
                >
                  <div className="text-xs flex flex-col items-center py-3">
                    <span className="font-semibold text-[14px]">
                      {plan.name}
                    </span>

                    <div className="flex justify-center items-center gap-1 mt-2">
                      <Image
                        src="/icons/security-check.svg"
                        width={15}
                        height={15}
                        alt="insurance plan"
                        loading="lazy"
                      />
                      <ProgressBar colors={plan.iconColors} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROWS */}
          <div className="divide-y divide-gray-100">
            <Row
              label="Excess"
              chargeId={chargeId}
              handleAdditionalCharges={handleAdditionalCharges}
              values={plans.map((p) => p.excess)}
            />

            {[
              ["3rd Party Liability", "thirdParty"],
              ["Towing And Road Side Assistance", "towing"],
              ["Vehicle Theft And Fire", "theft"],
              [
                "Damage To Vehicle Exterior (Excluding Interior Damage)",
                "exterior",
              ],
            ].map(([label, key]) => (
              <Row
                key={label}
                label={label}
                chargeId={chargeId}
                handleAdditionalCharges={handleAdditionalCharges}
                values={plans.map((p) =>
                  p[key] ? (
                    <Check
                      className="w-5 h-5 mx-auto"
                      style={{ color: "#2dbdb6" }}
                    />
                  ) : (
                    <X
                      className="w-5 h-5 mx-auto"
                      style={{ color: "#ff748b" }}
                    />
                  )
                )}
              />
            ))}

            {/* PRICE */}
            <Row
              label="Price"
              chargeId={chargeId}
              handleAdditionalCharges={handleAdditionalCharges}
              values={plans.map((p) => {
                const isSelected = selectedCharges[p.id];
                const isIncluded = p.id === 20;

                return (
                  <div className="flex flex-col items-center py-3">
                    <div className="font-semibold text-[11px] text-gray-800 flex flex-col items-center">
                      <p>
                        <span className="text-ctextGray">
                          {showCurrency(p.id)}
                        </span>
                        <span> {p.price}</span>
                      </p>
                      <p className="text-ctextGray">/Day</p>
                    </div>

                    {isIncluded ? (
                      <p className="text-gray-400 text-xs mt-3">
                        Currently Included
                      </p>
                    ) : isSelected ? (
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
                );
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
