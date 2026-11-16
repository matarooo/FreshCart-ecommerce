"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { loginHref } from "./account-resource.client";
import type {
  AccountRequestQueue,
  AccountResourceRequest,
  AccountResourceState,
} from "./types/account-resource.interface";

function createQueue(): AccountRequestQueue {
  return {
    tail: Promise.resolve(false),
    pending: new Set(),
    needsSignIn: false,
  };
}

export function useAccountResource<Data, Change>(
  requestResource: AccountResourceRequest<Data, Change>,
  updateErrorMessage: string,
) {
  const router = useRouter();
  const account = useRef<string | null | undefined>(undefined);
  const revision = useRef(0);
  const queue = useRef(createQueue());
  const [state, setState] = useState<AccountResourceState<Data>>({
    status: "loading",
  });
  const [pending, setPending] = useState<ReadonlySet<string | null>>(new Set());

  const refresh = useCallback(async () => {
    const email = account.current;
    if (!email || queue.current.pending.size) return;
    const request = ++revision.current;

    try {
      const result = await requestResource(email);
      if (request !== revision.current) return;
      queue.current.needsSignIn = result.status === "sign-in";
      setState(result);
      if (result.status === "sign-in") router.refresh();
    } catch {
      if (request === revision.current) setState({ status: "error" });
    }
  }, [requestResource, router]);

  const bindAccount = useCallback(
    (email: string | null) => {
      if (account.current === email) return;
      account.current = email;
      revision.current++;
      queue.current = createQueue();
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
    router.push(loginHref(pathname + search + hash));
  }

  async function applyChange(
    scope: AccountRequestQueue,
    email: string,
    change: Change,
  ) {
    if (scope !== queue.current || scope.needsSignIn) return false;
    try {
      const result = await requestResource(email, change);
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
          error instanceof Error ? error.message : updateErrorMessage,
        );
        // A request can fail after the server has applied part of an update.
        const latest = await requestResource(email).catch(
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

  async function update(change: Change, productId: string | null) {
    const email = account.current;
    const scope = queue.current;
    if (state.status === "loading") return false;
    if (!email || scope.needsSignIn || state.status === "sign-in") {
      goToSignIn();
      return false;
    }

    if (scope.pending.has(null) || scope.pending.has(productId)) return false;
    if (productId === null && scope.pending.size) return false;

    revision.current++;
    scope.pending.add(productId);
    setPending(new Set(scope.pending));
    // Keep server responses in order while other products remain interactive.
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

  return {
    state,
    updating: pending.size > 0,
    isProductUpdating: (productId: string) =>
      pending.has(productId) || pending.has(null),
    bindAccount,
    refresh,
    update,
  };
}
