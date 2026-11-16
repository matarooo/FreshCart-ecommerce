import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/components/AuthForm/AuthFormSchema";
import { authenticate } from "@/lib/auth/auth.api";
import type { ProfileUpdate } from "@/lib/auth/types/account.interface";

const verifiedProfileUpdate = new AsyncLocalStorage<{
  token: string;
  profile: ProfileUpdate;
}>();

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
    jwt({ token, user, trigger }) {
      if (user?.commerceToken) {
        token.commerceToken = user.commerceToken;
        token.phone = user.phone;
      }
      const update =
        trigger === "update" ? verifiedProfileUpdate.getStore() : undefined;
      if (update && token.commerceToken === update.token) {
        token.name = update.profile.name;
        token.email = update.profile.email;
        token.phone = update.profile.phone ?? token.phone;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const { auth, handlers, signOut, unstable_update } = NextAuth(authConfig);
export { auth, handlers, signOut };

export function refreshAccountProfile(token: string, profile: ProfileUpdate) {
  // Only the server action that saved the profile can supply session updates.
  return verifiedProfileUpdate.run({ token, profile }, () =>
    unstable_update({}),
  );
}
