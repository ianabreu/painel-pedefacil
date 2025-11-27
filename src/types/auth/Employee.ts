import { Tenant } from "./Tenant";

enum ROLE {
  ADMIN = "ADMIN",
}
enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface Employee {
  id: string;
  email: string;
  name: string;
  role: ROLE;
  status: STATUS;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  tenant: Tenant;
}
