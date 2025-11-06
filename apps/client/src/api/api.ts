import httpClient from "@/lib/http-client";

export const getProducts = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}): Promise<ProductsApiResponse> => {
  return await httpClient.get(
    `/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};

export const getProductById = async ({
  productId,
}: {
  productId: string;
}): Promise<{ data: Product; meta: unknown }> => {
  return await httpClient.get(`/products/${productId}?populate=*`);
};

export const getCategories = async (): Promise<CategoriesApiResponse> => {
  return await httpClient.get(`/categories?pagination[pageSize]=100`);
};

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<{ data: Category; meta: unknown }> => {
  return await httpClient.get(`/categories/${categoryId}?populate=*`);
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
  return await httpClient.get(
    `/products?filters[category][documentId][$eq]=${categoryId}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};
