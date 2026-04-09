import { Store } from "./Store";

enum ROLE {
  ADMIN,
  MANAGER,
  SELLER,
}
enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: ROLE;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
  store: Store;
}
