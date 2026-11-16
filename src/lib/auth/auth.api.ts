import "server-only";

import { z } from "zod";
import type {
  RegistrationResult,
  SignInCredentials,
  SignInResponse,
  SignUpCredentials,
} from "./types/auth.interface";

const signInResponse = z.object({
  user: z.object({ name: z.string(), email: z.email() }),
  token: z.string().trim().min(1),
});

const validationError = z.object({ msg: z.string() });
const registrationResponse = z.object({
  message: z.string().optional(),
  errors: z
    .union([validationError, z.array(validationError)])
    .optional()
    .catch(undefined),
});

const registrationUnavailable =
  "Account creation is unavailable right now. Please try again.";

function postAuth(
  endpoint: "signin" | "signup",
  credentials: SignInCredentials | SignUpCredentials,
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("Missing authentication API base URL.");

  return fetch(`${baseUrl}/api/v1/auth/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(credentials),
  });
}

export async function authenticate(
  credentials: SignInCredentials,
): Promise<SignInResponse | null> {
  const response = await postAuth("signin", credentials);
  if ([400, 401, 403].includes(response.status)) return null;
  if (!response.ok)
    throw new Error(`Authentication API returned ${response.status}.`);

  const result = signInResponse.safeParse(await response.json());
  if (!result.success)
    throw new Error("Authentication API returned an invalid session.");

  return result.data;
}

async function readRegistrationMessage(response: Response) {
  const result = registrationResponse.safeParse(
    await response.json().catch(() => null),
  );
  if (!result.success) return undefined;

  const { message, errors } = result.data;
  const validationMessage = Array.isArray(errors)
    ? errors[0]?.msg
    : errors?.msg;

  return [message, validationMessage]
    .map((value) => value?.trim())
    .find(
      (value) =>
        value &&
        value.length <= 180 &&
        !/^(success|fail(?:ed)?|error)[.!]?$/i.test(value),
    );
}

export async function register(
  credentials: SignUpCredentials,
): Promise<RegistrationResult> {
  try {
    const response = await postAuth("signup", credentials);
    if (!response.ok && ![400, 409, 422].includes(response.status))
      return { ok: false, message: registrationUnavailable };

    const message = await readRegistrationMessage(response);
    if (response.ok)
      return {
        ok: true,
        message: message || "Your account was created. You’re signed in.",
      };

    return {
      ok: false,
      message:
        message ||
        "Check your registration details or sign in if you already have an account.",
    };
  } catch {
    return { ok: false, message: registrationUnavailable };
  }
}
