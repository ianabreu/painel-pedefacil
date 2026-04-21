export const generateTag = {
  categories: (storeId: string) => `store:${storeId}:categories`,
  sizeGroups: (storeId: string) => `store:${storeId}:size-groups`,
  products: (storeId: string) => `store:${storeId}:products`,
} as const;
