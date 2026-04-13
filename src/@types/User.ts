import { Store } from "./Store";

export enum USER_ROLE {
  ADMIN,
  MANAGER,
  SELLER,
}
export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: USER_ROLE;
  status: USER_STATUS;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
  store: Store;
}

export const ROLE_LABELS: Record<USER_ROLE, string> = {
  [USER_ROLE.ADMIN]: "Administrador",
  [USER_ROLE.MANAGER]: "Gerente",
  [USER_ROLE.SELLER]: "Vendedor",
};
