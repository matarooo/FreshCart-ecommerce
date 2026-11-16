"use server";

import { RedirectType, redirect } from "next/navigation";
import { signOut } from "../../../authjs/authjs";

export async function logout() {
  await signOut({ redirect: false, redirectTo: "/login" });
  redirect("/login", RedirectType.replace);
}
