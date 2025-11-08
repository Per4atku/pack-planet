import fetches from "@siberiacancode/fetches";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL + "/api";
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_READ_ONLY;

const httpClient = fetches.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `Bearer ${TOKEN}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
