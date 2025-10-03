import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/store/hooks";
import { showErrorToast } from "@/app/_lib/toast";

const PaymentOptionCard = ({
  voucherCode = "",
  setVoucherCode = () => {},
  discount = false,
  handleConfirmReservation = () => {},
}) => {
  const [selectedPayment, setSelectedPayment] = useState("full");

  const finalPayment = useAppSelector(
    (state) => state.reservation.finalPayment
  );
  const handleApply = () => {
    if (voucherCode) {
      handleConfirmReservation({
        couponCode: voucherCode || "",
        paymentType: selectedPayment,
        isRemove: false,
      });
    } else {
      showErrorToast("Please Added Coupan Code");
    }
  };

  const handlePaymentChange = (value = "") => {
    setSelectedPayment(value);
    handleConfirmReservation({
      couponCode: voucherCode || "",
      paymentType: value || "full",
      isRemove: false,
    });
  };

  const handleRemove = () => {
    if (voucherCode) {
      handleConfirmReservation({
        couponCode: voucherCode || "",
        paymentType: selectedPayment,
        isRemove: true,
      });
    } else {
      showErrorToast("Please Added Coupan Code");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Discount/Voucher</h2>

      {/* Voucher Input Section */}
      <div className="flex gap-2 mb-3 bg-white p-4 rounded-lg">
        <Input
          type="text"
          placeholder="Discount/Voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          disabled={discount}
          className="flex-1 h-12 px-4 text-[13PX] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2dbdb6] focus:border-transparent"
        />
        {!discount ? (
          <Button
            onClick={handleApply}
            className="h-12 px-8 bg-[#2dbdb6] hover:bg-[#26a8a1] text-white font-medium rounded-lg transition-colors"
          >
            Apply
          </Button>
        ) : (
          <Button
            onClick={handleRemove}
            className="h-12 px-8 bg-[#2dbdb6] hover:bg-[#26a8a1] text-white font-medium rounded-lg transition-colors"
          >
            Remove
          </Button>
        )}
      </div>

      {/* Payment Options */}
      <div className="bg-white p-4 rounded-lg">
        <RadioGroup
          value={selectedPayment}
          onValueChange={handlePaymentChange}
          className="space-y-3"
        >
          {/* Pay in full option */}
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
                Pay {(finalPayment?.price / 2).toFixed(2)} RM now
              </h3>

              <p className="text-xs text-gray-500 font-normal">
                Pay the rest at pickup
              </p>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <style jsx>{`
        [data-state="checked"] {
          background-color: #2dbdb6;
          border-color: #2dbdb6;
        }
      `}</style>
    </div>
  );
};

export default PaymentOptionCard;
