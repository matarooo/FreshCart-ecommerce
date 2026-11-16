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
      return {
        ...session,
        commerceToken: token.commerceToken,
        phone: token.phone,
      };
    },
  },
});

export async function getCommerceSession() {
  await connection();
  const session = await readCommerceSession();
  if (
    session?.user?.email &&
    "commerceToken" in session &&
    typeof session.commerceToken === "string"
  )
    return {
      email: session.user.email,
      name: session.user.name ?? "",
      phone:
        "phone" in session && typeof session.phone === "string"
          ? session.phone
          : undefined,
      token: session.commerceToken,
    };

  return null;
}

export async function getCommerceToken(
  accountEmail: string,
): Promise<string | null> {
  const session = await getCommerceSession();
  return session?.email === accountEmail ? session.token : null;
}
