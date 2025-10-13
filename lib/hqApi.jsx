import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;


const hqApi = axios.create({
  baseURL: `${server}/api`,
  withCredentials: true,
});

hqApi.interceptors.request.use((config) => {
  config.headers["x-api-key"] = apiKey;
  return config;
});

export const createHqApi = (accessToken) => {
  const instance = axios.create({
    baseURL: `${server}/api`,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    config.headers["x-api-key"] = apiKey;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  return instance;
};

export default hqApi;
