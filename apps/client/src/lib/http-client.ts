import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL + "/api", // e.g. https://mystrapi.com
  headers: {
    "Content-Type": "application/json",

    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_READ_ONLY}`,
  },
});

httpClient.interceptors.response.use(
  (response) => response.data, // return only data by default
  (error) => {
    console.error("Axios error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default httpClient;
