import { connection } from "next/server";
import { CartSession } from "@/components/CartSession/CartSession";
import { Navbar } from "@/components/Navbar/Navbar";
import { auth } from "../../../authjs/authjs";

export async function SessionNavbar() {
  await connection();
  const session = await auth();
  const userName = session?.user
    ? session.user.name || "My account"
    : undefined;

  return (
    <>
      <CartSession email={session?.user?.email ?? null} />
      <Navbar
        userName={userName}
        userEmail={session?.user?.email ?? undefined}
      />
    </>
  );
}
