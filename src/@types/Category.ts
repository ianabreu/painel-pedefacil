export type Category = {
  id: string;
  position: number;
  name: string;
  slug: string;
  status: CATEGORY_STATUS;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
};

export enum CATEGORY_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const CATEGORY_STATUS_LABELS: Record<CATEGORY_STATUS, string> = {
  [CATEGORY_STATUS.ACTIVE]: "Ativo",
  [CATEGORY_STATUS.INACTIVE]: "Inativo",
};
