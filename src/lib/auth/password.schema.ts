import { z } from "zod";

export const newPasswordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(/[0-9]/, "Include at least one number.")
  .regex(/[^a-zA-Z0-9\s]/, "Include at least one symbol.");
