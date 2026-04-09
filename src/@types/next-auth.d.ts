// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: {
      id: string;
      role: string;
      storeId: string;
    } & DefaultSession["user"];
  }

  interface User {
    access_token?: string;
    role?: string;
    storeId?: string;
  }
}
