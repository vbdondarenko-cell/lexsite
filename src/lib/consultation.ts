import { z } from "zod";

/** Shared by the browser form (UX hints) and the API route (the authoritative check). */
export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Вкажіть ім’я (щонайменше 2 символи)").max(100, "Занадто довге ім’я"),
  phone: z
    .string()
    .trim()
    .max(30, "Занадто довгий номер")
    .refine((v) => /^\+?[\d\s()\-]{9,20}$/.test(v) && v.replace(/\D/g, "").length >= 9 && v.replace(/\D/g, "").length <= 15, {
      message: "Вкажіть коректний номер телефону",
    }),
  message: z.string().trim().max(2000, "Повідомлення занадто довге (максимум 2000 символів)").optional().default(""),
  consent: z.literal(true, { error: "Потрібна згода на обробку персональних даних" }),
  /** Honeypot — real users never fill it */
  website: z.string().max(0).optional().default(""),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export type FieldErrors = Partial<Record<"name" | "phone" | "message" | "consent", string>>;

export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = issue.path[0];
    if ((key === "name" || key === "phone" || key === "message" || key === "consent") && !out[key]) {
      out[key] = issue.message;
    }
  }
  return out;
}
