import { createHqApi } from "@/lib/hqApi";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }, api) => {
    try {
      const state = api.getState();
      const accessToken = state.auth?.loggedUser?.accessToken;

      const apiInstance = createHqApi(accessToken);

      const result = await apiInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
