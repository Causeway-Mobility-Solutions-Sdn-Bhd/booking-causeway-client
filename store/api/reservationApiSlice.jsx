import { apiSlice } from "../apiSlice";

export const reservationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    confirmReservation: builder.mutation({
      query: ({ couponCode = "" } = {}) => ({
        url: "/car-rental/reservations/conform-reservation",
        method: "POST",
        data: { couponCode },
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
  }),
  overrideExisting: false,
});

export const {
  useConfirmReservationMutation,
  useProcessPaymentMutation,
} = reservationApi;
