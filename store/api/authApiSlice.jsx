import { apiSlice } from "../apiSlice";
import { setLogedUser } from "../slices/authSlie";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        data: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLogedUser(data.user));
        } catch (err) {
          console.error("Login failed: ", err);
        }
      },
      providesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        data: userData,
      }),
      providesTags: ["Auth"],
    }),

    verifyClient: builder.mutation({
      query: (clientToken) => ({
        url: `auth/verify-client/${clientToken}`,
        method: "POST",
      }),
    }),

     verifyOtp: builder.mutation({
      query: (data) => ({
        url: "auth/verify",
        method: "POST",
        data: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLogedUser(data.user));
        } catch (err) {
          console.error("OTP verification failed: ", err);
        }
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "auth/resend-verify",
        method: "POST",
        data: data, 
      }),
    }),


  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyClientMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;
