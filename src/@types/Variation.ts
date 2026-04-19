interface Variation {
  id: string;
  name: string;
  storeId: string;
  variations: VariationOption[];
}
interface VariationOption {
  id: string;
  description: string;
  acronym: string;
  allowMixingFlavors: boolean;
  variationTypeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { VariationOption, Variation };
