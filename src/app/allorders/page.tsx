import { redirect } from "next/navigation";

export default function OrdersReturnPage() {
  redirect("/account/orders");
}
