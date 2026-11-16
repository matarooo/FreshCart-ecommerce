import { z } from "zod";

export const addressIdSchema = z.string().regex(/^[a-f0-9]{24}$/i);
export const shippingAddressSchema = z.object({
  details: z.string().trim().min(1).max(240),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{7,25}$/)
    .refine((phone) => {
      const digits = phone.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }),
  city: z.string().trim().min(1).max(80),
});

export const addressInputSchema = shippingAddressSchema.extend({
  name: z.string().trim().min(1).max(60),
});

export const savedAddressSchema = z.object({
  _id: addressIdSchema,
  name: z.string(),
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});
