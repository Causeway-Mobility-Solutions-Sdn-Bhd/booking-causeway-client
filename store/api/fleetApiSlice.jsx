import { apiSlice } from "../apiSlice";

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
  }),
  overrideExisting: false,
});

export const { useGetLocationBrandsQuery, useGetLocationsQuery , useGetVehicleTypesQuery, useGetVehiclesByCategoryQuery } = fleetApi;
