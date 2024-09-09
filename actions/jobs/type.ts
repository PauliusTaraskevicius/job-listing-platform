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
  location: z
    .string({
      required_error: "Privalomas miesto pavadinimas",
      invalid_type_error: "Privalomas miesto pavadinimas",
    })
    .min(3, {
      message: "Pavadinimas privalo būti bent 3 simbolių",
    }),
});
