import { apiSlice } from "../apiSlice";
import { setCurrentUUID, setReservation } from "../slices/reservationSlice";

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

    getReservationAttempt: builder.query({
      query: () => ({
        url: "/car-rental/reservations/reservation-attempts",
        method: "GET",
      }),
      providesTags: ["Reservation"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data )
          if (data) {
            dispatch(setCurrentUUID(data._id));
            dispatch(setReservation(data));
          }
        } catch (err) {
          console.error("Failed to fetch reservation:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useConfirmReservationMutation,
  useProcessPaymentMutation,
  useGetReservationAttemptQuery,
} = reservationApi;
