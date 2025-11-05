"use client";
import SaveBottomBar from "@/app/_components/SaveBottomBar";
import { showErrorToast, showSuccessToast } from "@/app/_lib/toast";
import BookNavBar from "@/app/book/_components/BookNavBar";
import AdditionalCharges from "@/app/book/step-03/_components/AdditionalCharges";
import Spinner from "@/components/custom/Spinner";
import hqApi from "@/lib/hqApi";
import { setAdditionalCharges } from "@/store/slices/reservationSlice";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCharges, setSelectedCharges] = useState({
    20: { quantity: 0 },
  });
  const [reservation, setReservation] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hqApi.get(
          `car-rental/reservations/get-reservation/${id}`
        );

        const responseData = response?.data;
        const reservation = responseData?.reservation_attempt;
        const selected_additional_charges =
          response?.data?.data?.selected_additional_charges;
        updateSelectedCharges(selected_additional_charges);
        setReservation(reservation);
        fetchAddons(reservation);
      } catch (error) {
        console.log("Error fetching reservation:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(loading , "loading");

  const fetchAddons = async (reservation) => {
    try {
      if (reservation?.vehicle_class_id) {
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
        };

        const response = await hqApi.get(
          "car-rental/reservations/additional-charges",
          { params: requestData }
        );

        if (response?.status === 200) {
          dispatch(setAdditionalCharges(response?.data?.additional_charges));
          setLoading(false);
        } else {
          setLoading(false);
        }
      }else{
         setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const updateSelectedCharges = (selected_additional_charges) => {
    const updatedCharges = {};

    selected_additional_charges.forEach((item) => {
      updatedCharges[item.id] = {
        quantity:
          item.selection_type === "only_one" ? 0 : item.selected_quantity || 1,
      };
    });
    setSelectedCharges(updatedCharges);
  };

  const triggerSubmit = async () => {
    try {
      setSubmitLoader(true);

      const formattedCharges = transformSelectedCharges();

      const body = {
        reservation_id: reservation?.reservation_id,
        additional_charges: formattedCharges,
      };

      const response = await hqApi.post(
        `car-rental/manage-reservations/update-reservation-addons`,
        body
      );

      if(response?.status === 200){
        router.replace(`/manage/${reservation?._id}/?addonsupdated=true`);
      }
      showSuccessToast("Add-ons updated successfully!");
    } catch (error) {
      console.error("Error updating add-ons:", error);
      showErrorToast("Add-ons update failed. Please try again.");
    } finally {
      setSubmitLoader(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Spinner size={30} color={"#2dbdb6"} thickness={4} />
      </div>
    );
  }

  const transformSelectedCharges = () => {
    return Object.entries(selectedCharges).map(([id, { quantity }]) => {
      const parsedId = parseInt(id, 10);
      return quantity === 0 ? `${parsedId}` : `${parsedId}_${quantity}`;
    });
  };

  return (
    <>
      <BookNavBar
        child={
          <h3 className="text-center text-[17px] w-full font-semibold">
            Add-Ons
          </h3>
        }
        currencyDrawer={false}
        topBar={true}
      />

      <div className="py-[20px] mt-[70px] sm:mt-[90px] sm:py-[30px] max-w-[1400px] mx-auto w-[92%]">
        <div className="mt-[10px] flex justify-start items-start gap-5 flex-col lg:flex-row">
          <div className="flex-1 w-full">
            <AdditionalCharges
              selectedCharges={selectedCharges}
              setSelectedCharges={setSelectedCharges}
              fetchLoader={loading}
            />
          </div>
        </div>
      </div>

      <SaveBottomBar
        title="Confirm changes"
        load={submitLoader || loading}
        onSubmit={triggerSubmit}
      />
    </>
  );
};

export default page;
