export const generateTag = {
  categories: (storeId: string) => `store:${storeId}:categories`,
  products: (storeId: string) => `store:${storeId}:products`,
} as const;
