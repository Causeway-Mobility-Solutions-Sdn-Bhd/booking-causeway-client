import { apiSlice } from "../apiSlice";
import { setReservation } from "../slices/reservationSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Customer
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "customers/create-customers",
        method: "POST",
        params: customerData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.reservation) {
            dispatch(setReservation(data.reservation));
          }
        } catch (err) {
          console.error("Create customer failed:", err);
          throw err;
        }
      },
      invalidatesTags: ["Customers"],
    }),

    // Update Customer
    updateCustomer: builder.mutation({
      query: ({ id, data }) => ({
        url: `customers/update-customer/${id}`,
        method: "PUT",
        data: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Update customer failed:", err);
          throw err;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Customers", id },
        "Customers",
      ],
    }),

    // Upload License File
    uploadLicenseFile: builder.mutation({
      query: ({ file, item_id, item_type, field_id }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("item_id", item_id);
        formData.append("item_type", item_type);
        formData.append("field_id", field_id);
        formData.append("filename", file.name);

        return {
          url: "file/upload",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["Files"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUploadLicenseFileMutation,
} = customerApi;
