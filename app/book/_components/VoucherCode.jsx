import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  setSelectedAdditionalCharges,
  setSelectedVehicle,
  setVoucherCode,
} from "@/store/slices/reservationSlice";
import { useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import Spinner from "@/components/custom/Spinner";

function VoucherCode() {
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(false);
  const [loader, setLoader] = useState(false);

  const voucherCode = useAppSelector((state) => state.reservation.voucherCode);
  const reservation = useAppSelector((state) => state.reservation.reservation);
  const selectedAdditionalCharges = useAppSelector(
    (state) => state.reservation.selectedAdditionalCharges
  );

  // ✅ Extract selected charge IDs
  function getSelectedChargeIds() {
    const result = [];
    selectedAdditionalCharges?.forEach((categoryItem) => {
      categoryItem.charges?.forEach((charge) => {
        if (charge.selection_type === "multiple") {
          result.push(`${charge.id}_${charge.selected_quantity || 1}`);
        } else {
          result.push(`${charge.id}`);
        }
      });
    });
    return result;
  }

  // ✅ Shared API call for both apply & remove
  const handleVoucherAction = async (isRemove = false) => {
    setLoader(true);

    try {
      const requestData = {
        pick_up_date: reservation?.pick_up_date
          ? format(reservation.pick_up_date, "yyyy-MM-dd")
          : null,
        pick_up_time: reservation?.pick_up_time || null,
        return_date: reservation?.return_date
          ? format(reservation.return_date, "yyyy-MM-dd")
          : null,
        return_time: reservation?.return_time || null,
        pick_up_location: reservation?.pick_up_location?.id || null,
        return_location: reservation?.return_location?.id || null,
        brand_id: reservation?.brand_id ?? null,
        vehicle_class_id: reservation?.vehicle_class_id,
        isFinal: reservation?.isFinal ?? false,
        coupon_code: isRemove ? "" : voucherCode, 
      };

      const params = new URLSearchParams();

      for (const key in requestData) {
        if (requestData[key] !== null && requestData[key] !== undefined) {
          params.append(key, requestData[key]);
        }
      }

      const ac = getSelectedChargeIds();
      ac?.forEach((charge) => {
        params.append("additional_charges", charge);
      });

      const response = await hqApi.post(
        `car-rental/reservations/additional-charges?${params.toString()}`,
        {}
      );

      if (response?.status === 200) {
        dispatch(setSelectedVehicle(response?.data?.selected_vehicle));
        dispatch(
          setSelectedAdditionalCharges(
            response?.data?.selected_additional_charges
          )
        );

        if (isRemove) {
          dispatch(setVoucherCode(""));
          setDiscount(false);
        } else {
          setDiscount(true);
        }
      }
    } catch (error) {
      console.error("Voucher action failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleApply = () => handleVoucherAction(false);
  const handleRemove = () => handleVoucherAction(true);

  return (
    <div className="flex gap-2 mb-3 bg-white p-4 rounded-lg mt-4">
      <Input
        type="text"
        placeholder="Discount/Voucher code"
        value={voucherCode}
        onChange={(e) => dispatch(setVoucherCode(e.target.value))}
        disabled={discount || loader}
        className="flex-1 h-12 px-4 text-[13PX] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2dbdb6] focus:border-transparent"
      />

      {!discount ? (
        <Button
          onClick={handleApply}
          disabled={loader || !voucherCode}
          className="h-12 px-8 bg-[#2dbdb6] hover:bg-[#26a8a1] text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          {loader ? <Spinner /> : "Apply"}
        </Button>
      ) : (
        <Button
          onClick={handleRemove}
          disabled={loader}
          className="h-12 px-8 bg-[#f87171] hover:bg-[#ef4444] text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          {loader ? <Spinner /> : "Remove"}
        </Button>
      )}
    </div>
  );
}

export default VoucherCode;
