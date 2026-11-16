import { connection } from "next/server";
import { Navbar } from "@/components/Navbar/Navbar";
import { auth } from "../../../authjs/authjs";

export async function SessionNavbar() {
  await connection();
  const session = await auth();
  const userName = session?.user
    ? session.user.name || "My account"
    : undefined;

  return (
    <Navbar userName={userName} userEmail={session?.user?.email ?? undefined} />
  );
}
