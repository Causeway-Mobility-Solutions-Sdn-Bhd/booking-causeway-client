import { useAppSelector } from "@/store/hooks";
import { setSelectedPayment } from "@/store/slices/reservationSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useFormatPrice } from "@/app/_lib/formatPrice";

function PaymentType() {
  const selectedPayment = useAppSelector(
    (state) => state.reservation.selectedPayment
  );
  const selectedVehicle = useAppSelector(
    (state) => state.reservation.selectedVehicle
  );
  const dispatch = useDispatch();

  const handlePaymentChange = (value = "") => {
    dispatch(setSelectedPayment(value));
  };
  const formatPrice = useFormatPrice();
  console.log("selectedVehicle",  selectedVehicle?.total_price_with_mandatory_charges_and_taxes);

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <RadioGroup
        value={selectedPayment}
        onValueChange={handlePaymentChange}
        className="space-y-3"
      >
        <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#2dbdb6] transition-colors">
          <RadioGroupItem
            value="full"
            id="full"
            className="mt-0.5 border-[#2dbdb6] text-[#2dbdb6] data-[state=checked]:border-[#2dbdb6] data-[state=checked]:bg-[#2dbdb6]"
          />
          <Label htmlFor="full" className="flex-1 cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
              Pay in full now
            </h3>
            <p className="text-xs text-gray-500 font-normal">
              Faster vehicle collection
            </p>
          </Label>
        </div>

        {/* Pay partial option */}
        <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#2dbdb6] transition-colors">
          <RadioGroupItem
            value="partial"
            id="partial"
            className="mt-0.5 border-[#2dbdb6] text-[#2dbdb6] data-[state=checked]:border-[#2dbdb6] data-[state=checked]:bg-[#2dbdb6]"
          />
          <Label htmlFor="partial" className="flex-1 cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
              Pay{" "}
              <span>
                {selectedVehicle?.total_price_with_mandatory_charges_and_taxes?.amount / 2}
              </span>{" "}
              now
            </h3>

            <p className="text-xs text-gray-500 font-normal">
              Pay the rest at pickup
            </p>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default PaymentType;
