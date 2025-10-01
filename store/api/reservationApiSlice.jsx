import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/car-rental/reservations/" }),
  endpoints: (builder) => ({
    confirmReservation: builder.mutation({
      query: ({ couponCode = "" } = {}) => ({
        url: "conform-reservation",
        method: "POST",
        data: {
          couponCode, 
        },
      }),
    }),

    processPayment: builder.mutation({
      query: ({ amount, reservationId, reservationUid, domain }) => ({
        url: "process-payment",
        method: "POST",
        params: {
          amount,
          item_id: reservationId,
          label: `Reservation ${reservationId}`,
          description: `Payment From API - Reservation ${reservationId}`,
          external_redirect: `${domain}/book/confirm-reservation/${reservationUid}`,
        },
      }),
    }),
  }),
});

export const { useConfirmReservationMutation, useProcessPaymentMutation } =
  reservationApi;
