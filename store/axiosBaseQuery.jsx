// src/lib/axiosBaseQuery.js
import hqApi from "@/lib/hqApi";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }, { getState }) => {
    try {
      const accessToken = getState()?.auth?.loggedUser?.accessToken;
      // console.log(getState()?.auth?.loggedUser);

      const headers = {};
      if (accessToken) {
        headers["x-access-token"] = `Bearer ${accessToken}`;
      }
      // console.log("HEADERS", headers);

      const result = await hqApi({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
