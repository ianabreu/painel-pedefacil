export const generateTag = {
  categories: (storeId: string) => `store:${storeId}:categories`,
  variationsTypes: (storeId: string) => `store:${storeId}:variation-types`,
  products: (storeId: string) => `store:${storeId}:products`,
} as const;
