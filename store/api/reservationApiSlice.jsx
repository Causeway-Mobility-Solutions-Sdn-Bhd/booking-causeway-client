import { format } from "date-fns";
import { apiSlice } from "../apiSlice";
import {
  setAdditionalCharges,
  setCurrentUUID,
  setReservation,
  setSelectedAdditionalCharges,
  setSelectedVehicle,
} from "../slices/reservationSlice";

export const reservationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalCharges: builder.query({
      async queryFn(_arg, { getState, dispatch }, _extraOptions, baseQuery) {
        try {
          const state = getState();
          const reservation = state.reservation.reservation;
          const currentUUID = state.reservation.currentUUID;

          if (!reservation?.vehicle_class_id || !currentUUID) {
            return { data: null };
          }

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

          const response = await baseQuery({
            url: "/car-rental/reservations/additional-charges",
            method: "GET",
            params: requestData,
          });

          if (response?.data) {
            dispatch(setAdditionalCharges(response.data.additional_charges));
          }

          return { data: response.data };
        } catch (err) {
          console.log("Failed to fetch additional charges:", err);
          return { error: err };
        }
      },
      providesTags: ["Reservation"],
    }),

    postAdditionalCharges: builder.mutation({
      async queryFn(
        { ac, isFinal },
        { getState, dispatch },
        _extraOptions,
        baseQuery
      ) {
        try {
          const state = getState();
          const reservation = state.reservation.reservation;
          const currentUUID = state.reservation.currentUUID;

          if (!reservation?.vehicle_class_id || !currentUUID) {
            return { data: null };
          }

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
            isFinal,
          };

          const params = new URLSearchParams();
          for (const key in requestData) {
            if (requestData[key] !== null && requestData[key] !== undefined) {
              params.append(key, requestData[key]);
            }
          }

          ac?.forEach((charge) => {
            params.append("additional_charges", charge);
          });

          const response = await baseQuery({
            url: `/car-rental/reservations/additional-charges?${params.toString()}`,
            method: "POST",
            body: {},
          });

          if (response?.data) {
            dispatch(setSelectedVehicle(response?.data?.selected_vehicle));
            dispatch(
              setSelectedAdditionalCharges(
                response?.data?.selected_additional_charges
              )
            );
          }

          return { data: response.data };
        } catch (err) {
          console.log("Failed to post additional charges:", err);
          return { error: err };
        }
      },
      invalidatesTags: ["Reservation"],
    }),

    confirmReservation: builder.mutation({
      query: ({ couponCode = "", isRemove = false } = {}) => ({
        url: "/car-rental/reservations/conform-reservation",
        method: "POST",
        data: { couponCode, isRemove },
      }),
      invalidatesTags: ["Reservation"],
    }),

    processPayment: builder.mutation({
      query: ({ amount, reservationId, reservationUid, domain }) => ({
        url: "/car-rental/reservations/process-payment",
        method: "POST",
        params: {
          amount,
          item_id: reservationId,
          label: `Reservation ${reservationId}`,
          description: `Payment From API - Reservation ${reservationId}`,
          external_redirect: `${domain}/book/confirm-reservation/${reservationUid}`,
        },
      }),
      invalidatesTags: ["Reservation"],
    }),

    getReservationAttempt: builder.query({
      query: () => ({
        url: "/car-rental/reservations/reservation-attempts",
        method: "GET",
      }),
      providesTags: ["Reservation"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setCurrentUUID(data._id));
            dispatch(setReservation(data));
          }
        } catch (err) {
          console.log("Failed to fetch reservation:", err);
        }
      },
    }),
    getAllReservations: builder.query({
      query: () => ({
        url: "/car-rental/manage-reservations",
        method: "GET",
      }),
      providesTags: ["Reservation"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched reservations:", data);
          // You can dispatch to store here if needed, e.g.:
          // dispatch(setAllReservations(data));
        } catch (err) {
          console.error("Failed to fetch all reservations:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdditionalChargesQuery,
  useLazyGetAdditionalChargesQuery,
  usePostAdditionalChargesMutation,
  useConfirmReservationMutation,
  useProcessPaymentMutation,
  useGetReservationAttemptQuery,
  useGetAllReservationsQuery,
} = reservationApi;
