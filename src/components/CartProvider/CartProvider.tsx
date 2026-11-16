"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { cartLoginHref, fetchAccountCart } from "@/lib/cart/cart.client";
import type { CartChange, CartState } from "@/lib/cart/types/cart.interface";
import type { CartContextValue, CartQueue } from "./@type";

const CartContext = createContext<CartContextValue | null>(null);

function createCartQueue(): CartQueue {
  return {
    tail: Promise.resolve(false),
    pending: new Set(),
    needsSignIn: false,
  };
}

export function CartProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const account = useRef<string | null | undefined>(undefined);
  const revision = useRef(0);
  const queue = useRef(createCartQueue());
  const [state, setState] = useState<CartState>({ status: "loading" });
  const [pending, setPending] = useState<ReadonlySet<string | null>>(new Set());

  const refresh = useCallback(async () => {
    const email = account.current;
    if (!email || queue.current.pending.size) return;
    const request = ++revision.current;

    try {
      const result = await fetchAccountCart(email);
      if (request !== revision.current) return;
      queue.current.needsSignIn = result.status === "sign-in";
      setState(result);
      if (result.status === "sign-in") router.refresh();
    } catch {
      if (request === revision.current) setState({ status: "error" });
    }
  }, [router]);

  const bindAccount = useCallback(
    (email: string | null) => {
      if (account.current === email) return;
      account.current = email;
      revision.current++;
      queue.current = createCartQueue();
      setPending(new Set());
      setState({ status: email ? "loading" : "sign-in" });
      if (email) void refresh();
    },
    [refresh],
  );

  useEffect(() => {
    const refreshOnFocus = () => void refresh();
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [refresh]);

  function goToSignIn() {
    const { pathname, search, hash } = window.location;
    router.push(cartLoginHref(pathname + search + hash));
  }

  async function applyChange(
    scope: CartQueue,
    email: string,
    change: CartChange,
  ) {
    if (scope !== queue.current || scope.needsSignIn) return false;
    try {
      const result = await fetchAccountCart(email, change);
      if (scope !== queue.current) return false;
      setState(result);
      if (result.status === "sign-in") {
        scope.needsSignIn = true;
        goToSignIn();
      }
      return result.status === "ready";
    } catch (error) {
      if (scope === queue.current) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Your cart could not be updated.",
        );
        // A request can fail after the server has applied part of an update.
        const latest = await fetchAccountCart(email).catch(
          () => ({ status: "error" }) as const,
        );
        if (scope === queue.current) {
          scope.needsSignIn = latest.status === "sign-in";
          setState(latest);
        }
      }
      return false;
    }
  }

  async function update(change: CartChange) {
    const email = account.current;
    const scope = queue.current;
    if (state.status === "loading") return false;
    if (!email || scope.needsSignIn || state.status === "sign-in") {
      goToSignIn();
      return false;
    }

    const productId = change.type === "clear" ? null : change.productId;
    if (scope.pending.has(null) || scope.pending.has(productId)) return false;
    if (productId === null && scope.pending.size) return false;

    revision.current++;
    scope.pending.add(productId);
    setPending(new Set(scope.pending));
    // Keep cart snapshots in order while other products remain interactive.
    const request = scope.tail.then(() => applyChange(scope, email, change));
    scope.tail = request;
    try {
      return await request;
    } finally {
      if (scope === queue.current) {
        scope.pending.delete(productId);
        setPending(new Set(scope.pending));
      }
    }
  }

  const cartCount =
    state.status === "ready"
      ? state.cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

  return (
    <CartContext.Provider
      value={{
        state,
        cartCount,
        updating: pending.size > 0,
        isProductUpdating: (productId) =>
          pending.has(productId) || pending.has(null),
        bindAccount,
        refresh,
        update,
        addToCart: (productId, quantity = 1) =>
          update({ type: "add", productId, quantity }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requires a CartProvider.");
  return cart;
}
