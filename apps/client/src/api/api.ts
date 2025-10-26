import httpClient from "@/lib/http-client";
import { paths } from "@/types/strapi";

type ProductsResponse =
  paths["/products"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export const getProducts = async (): Promise<ProductsResponse> => {
  return (await httpClient.get<ProductsResponse>("/products")).data;
};
