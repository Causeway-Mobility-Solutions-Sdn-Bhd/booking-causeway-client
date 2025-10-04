import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const hqApi = axios.create({
  baseURL: `${server}/api`,
  headers: {
    Authorization:`Bearer ${apiKey}`,
  },
  withCredentials: true,
});

// hqApi.interceptors.request.use(
//   (config) => {
//     const reservationAttemptId =
//       typeof window !== "undefined"
//         ? localStorage.getItem("ssid")
//         : null;

//     if (reservationAttemptId) {
//       config.headers["reservation-attempt-id"] = reservationAttemptId;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default hqApi;
