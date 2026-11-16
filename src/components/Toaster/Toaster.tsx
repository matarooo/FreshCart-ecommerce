"use client";

import { useEffect } from "react";
import { Toaster as Sonner, toast } from "sonner";

export const authSuccessToastKey = "freshcart:auth-success";

export function Toaster() {
  useEffect(() => {
    try {
      const message = sessionStorage.getItem(authSuccessToastKey);
      if (message) {
        sessionStorage.removeItem(authSuccessToastKey);
        toast.success(message);
      }
    } catch {
      // Browser storage can be disabled.
      return;
    }
  }, []);

  return (
    <Sonner
      className="toaster group"
      theme="light"
      richColors
      closeButton
      position="bottom-right"
    />
  );
}
