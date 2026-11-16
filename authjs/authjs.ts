import "server-only";

import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/components/AuthForm/AuthFormSchema";
import { authenticate } from "@/lib/auth/auth.api";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Auth",
      credentials: {
        email: { type: "email", placeholder: "Enter your email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (!result.success) return null;

        const account = await authenticate(result.data);
        if (!account) return null;

        return { ...account.user, commerceToken: account.token };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.commerceToken) token.commerceToken = user.commerceToken;
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { auth, handlers, signOut } = NextAuth(authConfig);
