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

export const getLinkedProducts = async ({
  productSkus,
}: {
  productSkus: string[];
}): Promise<ProductsApiResponse> => {
  if (!Array.isArray(productSkus)) {
    throw new TypeError("productSkus must be an array of strings");
  }

  if (productSkus.length === 0) {
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
    } as unknown as ProductsApiResponse;
  }
  const params = new URLSearchParams();
  productSkus.forEach((sku, idx) => {
    params.append(`filters[sku][$in][${idx}]`, sku);
  });

  params.append("populate", "*");
  const url = `/products?${params.toString()}`;
  try {
    const response: { data: ProductsApiResponse } = await httpClient.get(url, {
      next: { revalidate: ISR_REVALIDATE },
    });

    return response.data;
  } catch (err) {
    console.error("getLinkedProducts error:", err);
    throw err;
  }
};

export const getFeaturedProducts = async (): Promise<ProductsApiResponse> => {
  const response: { data: ProductsApiResponse } = await httpClient.get(
    `/products?filters[featured_product][$eq]=true&populate=*`,
    { next: { revalidate: ISR_REVALIDATE } }
  );

  return response.data;
};
