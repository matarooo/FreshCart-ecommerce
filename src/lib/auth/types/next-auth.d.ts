import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    commerceToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    commerceToken?: string;
  }
}
