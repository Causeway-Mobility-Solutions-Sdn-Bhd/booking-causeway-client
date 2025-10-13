import { apiSlice } from "../apiSlice";
import { setAllCurrencies } from "../slices/reservationSlice";

export const fleetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocationBrands: builder.query({
      query: () => ({ url: "/fleets/locations-brands", method: "GET" }),
      providesTags: ["Fleet"],
    }),
    getLocations: builder.query({
      query: () => ({ url: "/fleets/locations", method: "GET" }),
      providesTags: ["Fleet"],
    }),
    getVehicleTypes: builder.query({
      query: () => ({
        url: "fleets/vehicle-types",
        method: "GET",
      }),
      providesTags: ["Fleet"],
    }),
    getVehiclesByCategory: builder.query({
      query: (categoryId) => ({
        url: `fleets/vehicles/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Fleet"],
    }),
    getCurrencies: builder.query({
      query: () => ({
        url: "fleets/currencies",
        method: "GET",
      }),
      providesTags: ["Fleet"],
      transformResponse: (response) => response?.data ?? [],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllCurrencies(data));
        } catch (err) {
          console.log("getCurrencies error: ", err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLocationBrandsQuery,
  useGetLocationsQuery,
  useGetVehicleTypesQuery,
  useGetVehiclesByCategoryQuery,
  useGetCurrenciesQuery,
} = fleetApi;
