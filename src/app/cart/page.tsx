import type { Metadata } from "next";
import { CartView } from "@/components/CartView/CartView";
export const metadata: Metadata = { title: "Shopping Cart | FreshCart" };
export default function CartPage() {
  return (
    <main id="main-content" className="flex-1 bg-gray-50/70">
      <CartView />
    </main>
  );
}
