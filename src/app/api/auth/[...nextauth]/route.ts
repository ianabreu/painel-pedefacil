import { api } from "@/services/api";
import NextAuth, { NextAuthOptions, Employee } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await api.post<Employee>("/admin/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!result.data) {
          return null;
        }
        return result.data;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/cadastro",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as Employee;
        token.employee = u;
        token.accessToken = u.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.employee = token.employee as Employee;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
