import { z } from "zod";

export const createCitySchema = z.object({
  cityTitle: z
    .string({
      required_error: "Privalomas miesto pavadinimas",
      invalid_type_error: "Privalomas miesto pavadinimas",
    })
    .min(3, {
      message: "Miesto pavadinimas privalo būti bent 3 simbolių",
    }),
});


