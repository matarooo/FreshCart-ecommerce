import "server-only";

import { connection } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "../../../authjs/authjs";

// Only this server-side reader projects the commerce token from the JWT.
const { auth: readCommerceSession } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    session({ session, token }) {
      return { ...session, commerceToken: token.commerceToken };
    },
  },
});

export async function getCommerceToken(): Promise<string | null> {
  await connection();
  const session = await readCommerceSession();
  if (
    session &&
    "commerceToken" in session &&
    typeof session.commerceToken === "string"
  )
    return session.commerceToken;

  return null;
}
