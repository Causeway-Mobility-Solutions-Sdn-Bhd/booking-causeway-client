import { useFormatPrice } from "@/app/_lib/formatPrice";
import SmartImage from "@/components/custom/SmartImage";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaShieldAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store/hooks";
import SubHead from "@/components/custom/SubHead";
import InsuranceComparison from "./InsuranceComparison";
import InfoTabs from "./InfoTabs";
import PolicyLeftContent from "./PolicyLeftContent";

const currentLanguage = "en";

function AdditionalCharges({
  selectedCharges = {},
  setSelectedCharges = () => {},
  fetchData = () => {},
  fetchLoader = false,
}) {
  const additionalCharges = useAppSelector(
    (state) => state?.reservation?.additionalCharges
  );

  const formatPrice = useFormatPrice();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      const ac = transformSelectedCharges();
      fetchData(ac, false);
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleAddSingle = (charge, ac) => {
    const protectionIds = [9, 10, 11, 20];

    setSelectedCharges((prev) => {
      const updated = { ...prev };

      const isAlreadySelected = !!prev[charge.id];

      if (isAlreadySelected && !protectionIds.includes(charge?.id)) {
        delete updated[charge.id];
        return updated;
      }
      if (protectionIds.includes(charge.id) && !isAlreadySelected) {
        protectionIds.forEach((id) => {
          if (updated[id]) {
            delete updated[id];
          }
        });
      }

      if (!isAlreadySelected) {
        updated[charge.id] = { quantity: 0 };
      }

      return updated;
    });

    setShouldFetch(true);
  };

  const handleIncrement = (charge) => {
    setSelectedCharges((prev) => {
      const currentQty = prev[charge.id]?.quantity || 0;
      return {
        ...prev,
        [charge.id]: { quantity: currentQty + 1 },
      };
    });
    setShouldFetch(true);
  };

  const handleDecrement = (charge) => {
    setSelectedCharges((prev) => {
      const currentQty = prev[charge.id]?.quantity || 0;
      if (currentQty <= 1) {
        const newState = { ...prev };
        delete newState[charge.id];
        return newState;
      }
      return {
        ...prev,
        [charge.id]: { quantity: currentQty - 1 },
      };
    });
    setShouldFetch(true);
  };

  const transformSelectedCharges = () => {
    return Object.entries(selectedCharges).map(([id, { quantity }]) => {
      const parsedId = parseInt(id, 10);
      return quantity === 0 ? `${parsedId}` : `${parsedId}_${quantity}`;
    });
  };


  if (fetchLoader) {
    return <AdditionalChargesSkeleton />;
  }

  const getUpdatedAdditionalCharges = (additionalCharges) => {
    const desiredOrder = [2, 4];

    return additionalCharges
      .filter((item) => desiredOrder.includes(item.category.id))
      .sort(
        (a, b) =>
          desiredOrder.indexOf(a.category.id) -
          desiredOrder.indexOf(b.category.id)
      );
  }

  return (
    <div className="pb-[70px]">
      <InsuranceComparison selectedCharges={selectedCharges} setSelectedCharges={setSelectedCharges} fetchData={fetchData} />
      <InfoTabs /> 
      {getUpdatedAdditionalCharges(additionalCharges).map((ac) => (
        <div key={ac?.category?.id} className="mb-5">
          <SubHead text={ac?.category?.label?.[currentLanguage] ?? "No label"} />

          <div className="flex justify-start items-baseline gap-4 sm:gap-4 mt-4 flex-wrap">
            {ac?.charges?.map((acc, index) => {
              const isSelected = selectedCharges[acc.id];
              const quantity = selectedCharges[acc.id]?.quantity || 0;

              return (
                <div
                  key={acc.id ?? index}
                  className={`bg-white ${
                    acc?.id === 11 && "mt-2 sm:mt-0"
                  } shadow-lg rounded-md p-6 basis-[100%] w-full sm:basis-[calc(33%-16px)] relative`}
                >
                  {acc?.id === 11 && (
                    <div className="absolute top-[0] translate-y-[-50%] right-[8px] text-white text-[11px] font-semibold px-5 py-[6px] bg-[#006643] z-2 rounded-full">
                      Top Choice
                    </div>
                  )}
                  <div className="border-b border-[#E6E6E6]">
                    <div className="hidden sm:block">
                      <AccordionItem ac={ac} acc={acc} active={[20]} />
                    </div>
                    <div className="block sm:hidden">
                      <AccordionItem ac={ac} acc={acc} active={[20, 11]} />
                    </div>
                    {/* Extra Visual Indicator */}
                    {ac?.category?.id === 1 && acc?.id !== 20 && (
                      <div className="flex justify-start gap-2 items-center pb-[15px]">
                        {acc?.id === 9 && (
                          <>
                            <div className="h-7 flex justify-end flex-col items-center">
                              <FaShieldAlt size={20} />
                            </div>
                            <ProgressBar
                              colors={["#05C7194D", "#E6E6E6", "#E6E6E6"]}
                            />
                          </>
                        )}
                        {acc?.id === 10 && (
                          <>
                            <div className="h-7 flex justify-end flex-col items-center">
                              <FaShieldAlt size={20} />
                            </div>
                            <ProgressBar
                              colors={["#05C7194D", "#05C71999", "#E6E6E6"]}
                            />
                          </>
                        )}
                        {acc?.id === 11 && (
                          <>
                            <div className="h-7 flex justify-end flex-col items-center">
                              <FaShieldAlt size={20} />
                            </div>
                            <ProgressBar
                              colors={["#05C7194D", "#05C71999", "#05C719"]}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-[18px] flex justify-between items-center gap-2">
                    {acc?.base_price?.amount !== "0.00" ? (
                      <div>
                        <h2 className="text-[17px] font-semibold">
                          {formatPrice(acc?.base_price)}
                        </h2>
                        <p className="leading-[8px]">/ day</p>
                      </div>
                    ) : (
                      <h2 className="text-[17px] font-semibold">Included</h2>
                    )}

                    {acc?.selection_type !== "multiple" ? (
                      <Button
                        onClick={() => handleAddSingle(acc, ac)}
                        className={`h-10 cursor-pointer border border-cSecondary flex justify-center items-center gap-1 shadow-none w-[110px] font-bold  ${
                          isSelected
                            ? "bg-cSecondary text-white hover:bg-cSecondary"
                            : "text-cSecondary bg-transparent hover:bg-transparent"
                        }`}
                      >
                        {isSelected ? (
                          <span className="flex justify-center items-center gap-1">
                            Added
                            <FaCheckCircle size={20} />
                          </span>
                        ) : (
                          <span>Add</span>
                        )}
                      </Button>
                    ) : (
                      <div className="flex justify-end gap-3 items-center">
                        <div
                          className={`h-8 w-8 flex justify-center items-center text-white shadow-none rounded-full text-[17px] font-bold cursor-pointer 
                                ${
                                  quantity > 0
                                    ? "bg-cSecondary"
                                    : "bg-[#E6E6E6] cursor-not-allowed"
                                }
                            `}
                          onClick={() =>
                            quantity > 0 && handleDecrement(acc, ac)
                          }
                        >
                          <FaMinus size={15} />
                        </div>

                        <h3 className="text-[17px] font-bold">{quantity}</h3>
                        <div
                          className="h-8 w-8 flex justify-center items-center text-white bg-cSecondary shadow-none rounded-full text-[17px] font-bold cursor-pointer"
                          onClick={() => handleIncrement(acc, ac)}
                        >
                          <FaPlus size={15} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <PolicyLeftContent />
    </div>
  );
}

const AccordionItem = ({ ac, acc, active }) => {
  const [isOpen, setIsOpen] = useState(active?.includes(acc?.id));
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    if (acc?.description) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="pb-[15px]">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center gap-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex justify-start items-center gap-2">
          {acc?.image && (
            <SmartImage
              src={acc?.image}
              width={30}
              height={30}
              alt={`${acc.id}`}
              className="h-full w-[30px]"
            />
          )}
          <h3 className="text-[16px] font-semibold">{acc?.label}</h3>
        </div>

        {acc?.description && (
          <IoIosArrowDown
            className={`text-cSecondary text-[17px] transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </div>

      {/* Accordion Content with animation */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {acc?.description && (
          <div
            className="additional-charges-desc text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: acc.description }}
          />
        )}
      </div>
    </div>
  );
};

// Progress bar helper component
const ProgressBar = ({ colors = [] }) => (
  <div className="w-[93px] rounded-full h-[10px] bg-white relative overflow-hidden mt-2">
    {colors.map((color, index) => (
      <div
        key={index}
        className="absolute h-[10px]"
        style={{
          left: `${index * 31}px`,
          width: "30px",
          backgroundColor: color,
        }}
      />
    ))}
  </div>
);

const AdditionalChargesSkeleton = () => {
  return (
    <div className="pb-[70px]">
      {/* Simulate 2–3 categories */}
      {Array.from({ length: 2 }).map((_, catIndex) => (
        <div key={catIndex} className="mb-5">
          {/* Category Title */}
          <Skeleton className="h-5 w-40 mb-4" />

          {/* Cards Grid */}
          <div className="flex justify-start items-start gap-4 flex-wrap">
            {Array.from({ length: 3 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-white shadow-lg rounded-md p-6 basis-[100%] w-full sm:basis-[calc(33%-16px)] relative"
              >
                {/* Top Badge (simulate "Top Choice") */}
                {cardIndex === 1 && (
                  <Skeleton className="absolute top-[-10px] right-2 h-6 w-20 rounded-full" />
                )}

                {/* Accordion Header */}
                <div className="border-b border-[#E6E6E6] pb-3">
                  <div className="flex justify-start items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-3 w-full mt-2" />
                  <Skeleton className="h-3 w-[80%] mt-1" />
                </div>

                {/* Price + Button / Counter */}
                <div className="pt-[18px] flex justify-between items-center gap-2">
                  <div>
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>

                  {/* Right side button or counter */}
                  {cardIndex % 2 === 0 ? (
                    <Skeleton className="h-10 w-[110px] rounded-md" />
                  ) : (
                    <div className="flex justify-end gap-3 items-center">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-6" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdditionalCharges;
