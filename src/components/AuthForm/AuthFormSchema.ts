import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = signInSchema
  .extend({
    name: z.string().trim().min(1, "Enter your name."),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[0-9]/, "Include at least one number.")
      .regex(/[^a-zA-Z0-9\s]/, "Include at least one symbol."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    phone: z
      .string()
      .trim()
      .min(1, "Enter your phone number.")
      .regex(/^\+?[0-9\s().-]+$/, "Enter a valid phone number.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 7 && digits.length <= 15;
      }, "Use a phone number with 7 to 15 digits."),
    terms: z
      .boolean()
      .refine(
        (accepted) => accepted,
        "Accept the Terms of Service and Privacy Policy.",
      ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
