import { useFormatPrice } from "@/app/_lib/formatPrice";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const currentLanguage = "en";

function PriceSummary() {
  const selectedVehicle = useAppSelector(
    (state) => state.reservation.selectedVehicle
  );
  const selectedAdditionalCharges = useAppSelector(
    (state) => state.reservation.selectedAdditionalCharges
  );
  const formatPrice = useFormatPrice();

  return (
    <div className="mt-3">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div>
          {/* Rental Section */}
          <div className="border-b border-[#E6E6E6] pb-5">
            <h3 className="text-lg font-semibold text-[17px] mb-2">Rental</h3>
            <div className="flex justify-between items-center">
              <span className="text-[#808080]">
                {selectedVehicle?.tot_days} days (
                {formatPrice(selectedVehicle?.base_daily_price)}/Day)
              </span>
              <span className="text-[#808080] font-medium">
                {formatPrice(selectedVehicle?.total_price_without_tax)}{" "}
              </span>
            </div>
          </div>

          {selectedAdditionalCharges?.length > 0 && (
            <>
              {/* Protections Section */}
              {selectedAdditionalCharges?.map((ac) => (
                <div
                  key={ac?.category?.id}
                  className="border-b border-[#E6E6E6] py-3"
                >
                  <h3 className="text-lg font-semibold text-[17px] mb-2">
                    {ac?.category?.label?.[currentLanguage] ?? "No label"}
                  </h3>
                  {ac?.charges?.map((acc) => (
                    <div
                      key={acc?.id}
                      className="flex justify-between items-center"
                    >
                      <p className="text-[#808080]">
                        <span>{acc?.label} </span>
                        {acc?.selection_type === "multiple" && (
                          <span>
                            ({formatPrice(acc?.base_price)} X{" "}
                            {acc?.selected_quantity})
                          </span>
                        )}
                      </p>
                      {acc?.total_price.amount !== "0.00" ? (
                        <p className="text-[#808080] font-medium">
                          {formatPrice(acc?.total_price)}
                        </p>
                      ) : (
                        <p className="text-[#808080] font-medium">Included</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          {/* First Booking Discount */}
          <div className="flex justify-between items-center border-b border-[#E6E6E6] py-3">
            <span className="text-[#808080] font-medium">
              {selectedVehicle?.total_tax?.name}
            </span>
            <span className="text-[#808080] font-medium">
              {formatPrice(selectedVehicle?.total_tax?.total_amount)}{" "}
            </span>
          </div>

          <div className="pt-4">
            <div className="flex justify-end gap-2.5 items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(
                  selectedVehicle?.total_price_with_mandatory_charges_and_taxes
                )}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSummary;
