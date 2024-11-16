import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string({
      required_error: "Privalomas darbo vietos pavadinimas",
      invalid_type_error: "Privalomas darbo vietos pavadinimas",
    })
    .min(3, {
      message: "Pavadinimas privalo būti bent 3 simbolių",
    }),
  company: z
    .string({
      required_error: "Privalomas įmonės pavadinimas",
      invalid_type_error: "Privalomas įmonės pavadinimas",
    })
    .min(3, {
      message: "Pavadinimas privalo būti bent 3 simbolių",
    }),
  description: z
    .string({
      required_error: "Privalomas darbo vietos aprašymas",
      invalid_type_error: "Privalomas darbo vietos aprašymas",
    })
    .min(3, {
      message: "Aprašymas privalo būti bent 20 simbolių",
    })
    .trim(),

  applyUrl: z
    .string({
      required_error: "Privaloma aplikacijos nuoroda arba elektroninis paštas",
      invalid_type_error:
        "Privaloma aplikacijos nuoroda arba elektroninis paštas",
    })
    .url({ message: "Neteisingai įvesta nuoroda" }),
  salary: z
    .string({
      required_error: "Privalomas įrašyti atlyginimą.",
      invalid_type_error: "Neteisingai įvestas atlyginimas.",
    })
    .min(1)
    .max(12),
  paymentMethod: z.enum(["BRUTO", "NETO"]).default("BRUTO"),
  premium: z.boolean().default(false).optional(),
  remote: z.boolean().default(false).optional(),

  categoryId: z.string().min(1),
  cityId: z.string().min(1),
});
