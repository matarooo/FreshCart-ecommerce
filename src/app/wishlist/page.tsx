import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView/WishlistView";
export const metadata: Metadata = { title: "My Wishlist | FreshCart" };
export default function WishlistPage() {
  return (
    <main id="main-content" className="flex-1 bg-gray-50">
      <WishlistView />
    </main>
  );
}
