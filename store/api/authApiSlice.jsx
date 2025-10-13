import { apiSlice } from "../apiSlice";
import { clearLoggedUser, setLoggedUser } from "../slices/authSlie";

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
          dispatch(setLoggedUser(data.user));
        } catch (err) {
          console.log("Login failed: ", err);
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
          dispatch(setLoggedUser(data.user));
        } catch (err) {
          console.log("OTP verification failed: ", err);
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
    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setLoggedUser(data.user));
        } catch (err) {
          console.log("Token refresh failed: ", err);
        }
      },
      providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearLoggedUser());
        } catch (err) {
          console.error("Logout failed: ", err);
        }
      },
      invalidatesTags: ["Auth"],
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
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
