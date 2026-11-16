import "server-only";

export class CommerceApiError extends Error {
  constructor(public readonly status: number) {
    super(`Commerce API returned ${status}.`);
  }
}

export async function commerceRequest(
  path: string,
  token: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  payload?: object,
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("Missing commerce API base URL.");
  const response = await fetch(`${baseUrl}/api/${path}`, {
    method,
    cache: "no-store",
    headers: payload
      ? { token, "Content-Type": "application/json" }
      : { token },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (!response.ok) throw new CommerceApiError(response.status);
  return response;
}
