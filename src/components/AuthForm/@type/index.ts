import type { z } from "zod";
import type { signUpSchema } from "../AuthFormSchema";

export type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export type AuthField = keyof z.infer<typeof signUpSchema>;
export type AuthFormErrors = Partial<Record<AuthField, string>>;
