import { connection } from "next/server";
import { CommerceSession } from "@/components/CommerceSession/CommerceSession";
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
      <CommerceSession email={session?.user?.email ?? null} />
      <Navbar
        userName={userName}
        userEmail={session?.user?.email ?? undefined}
      />
    </>
  );
}
