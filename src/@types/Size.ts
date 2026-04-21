interface SizeGroup {
  id: string;
  name: string;
  storeId: string;
  sizes: Size[];
}
interface Size {
  id: string;
  description: string;
  acronym: string;
  allowMixingFlavors: boolean;
  sizeGroupId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Size, SizeGroup };
