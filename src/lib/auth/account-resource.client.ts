import type { AccountResourceState } from "./types/account-resource.interface";

export function loginHref(callbackUrl: string) {
  return `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export async function fetchAccountResource<Data>(
  path: string,
  accountHeader: string,
  account: string,
  change?: object,
): Promise<AccountResourceState<Data>> {
  const response = await fetch(path, {
    method: change ? "POST" : "GET",
    cache: "no-store",
    headers: {
      [accountHeader]: account,
      ...(change && { "Content-Type": "application/json" }),
    },
    body: change ? JSON.stringify(change) : undefined,
  });
  if (response.status === 401) return { status: "sign-in" };
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    throw new Error(
      body &&
        typeof body === "object" &&
        "error" in body &&
        typeof body.error === "string"
        ? body.error
        : "Please try again.",
    );
  }
  return { status: "ready", data: (await response.json()) as Data };
}
