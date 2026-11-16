import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/components/AuthForm/AuthFormSchema";
import type { LoginResponseType } from "@/lib/Login/login.interface";

export const authConfig: NextAuthConfig = {
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

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
        if (!baseUrl) throw new Error("Missing authentication API base URL.");

        const response = await fetch(`${baseUrl}/api/v1/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        });

        if ([400, 401, 403].includes(response.status)) return null;
        if (!response.ok) {
          throw new Error(`Authentication API returned ${response.status}.`);
        }

        const { user }: LoginResponseType = await response.json();
        return { name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export const { auth, handlers, signOut } = NextAuth(authConfig);
