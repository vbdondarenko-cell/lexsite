/** Client-side validation hints. The server (public/api/consultation.php) is the authoritative check. */
export type FieldErrors = Partial<Record<"name" | "phone" | "message" | "consent", string>>;

export type ConsultationInput = {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
};

export function validateConsultation(v: ConsultationInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = v.name.trim();
  const phone = v.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2) errors.name = "Вкажіть ім’я (щонайменше 2 символи)";
  else if (name.length > 100) errors.name = "Занадто довге ім’я";
  if (phone.length > 30) errors.phone = "Занадто довгий номер";
  else if (!/^\+?[\d\s()\-]{9,20}$/.test(phone) || digits.length < 9 || digits.length > 15) errors.phone = "Вкажіть коректний номер телефону";
  if (v.message.trim().length > 2000) errors.message = "Повідомлення занадто довге (максимум 2000 символів)";
  if (!v.consent) errors.consent = "Потрібна згода на обробку персональних даних";
  return errors;
}
