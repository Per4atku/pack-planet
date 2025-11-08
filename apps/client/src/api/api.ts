import httpClient from "@/lib/instance";
import {
  CategoriesApiResponse,
  Category,
  Meta,
  PartnersApiResponse,
  Product,
  ProductsApiResponse,
} from ".";

const ISR_REVALIDATE = 60; // seconds

export const getProducts = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}): Promise<ProductsApiResponse> => {
  const response: { data: ProductsApiResponse } = await httpClient.get(
    `/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { next: { revalidate: ISR_REVALIDATE } }
  );

  return response.data;
};

export const getProductById = async ({
  productId,
}: {
  productId: string;
}): Promise<{ data: Product; meta: unknown }> => {
  const response: { data: { data: Product; meta: unknown } } =
    await httpClient.get(`/products/${productId}?populate=*`, {
      next: { revalidate: ISR_REVALIDATE },
    });

  return response.data;
};

export const getCategories = async (): Promise<CategoriesApiResponse> => {
  const response: { data: CategoriesApiResponse } = await httpClient.get(
    `/categories?pagination[pageSize]=100`,
    {
      next: { revalidate: ISR_REVALIDATE },
    }
  );

  return response.data;
};

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<{ data: Category; meta: Meta }> => {
  const response: { data: { data: Category; meta: Meta } } =
    await httpClient.get(`/categories/${categoryId}?populate=*`, {
      next: { revalidate: ISR_REVALIDATE },
    });

  return response.data;
};

export const getProductsFilteredByCategory = async ({
  categoryId,
  page,
  pageSize,
}: {
  categoryId: string;
  page: string;
  pageSize: string;
}): Promise<ProductsApiResponse> => {
  const response: { data: ProductsApiResponse } = await httpClient.get(
    `/products?filters[category][documentId][$eq]=${categoryId}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { next: { revalidate: ISR_REVALIDATE } }
  );

  return response.data;
};

export const getPartners = async (): Promise<PartnersApiResponse> => {
  const response: { data: PartnersApiResponse } = await httpClient.get(
    `/partners?populate=image`,
    {
      next: { revalidate: ISR_REVALIDATE },
    }
  );

  return response.data;
};
