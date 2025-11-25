// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    employee: Employee;
  }
  interface Employee {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    tenant: Tenant;
    accessToken: string;
  }
  interface Tenant {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    employee: Employee;
    accessToken: string;
  }
}
