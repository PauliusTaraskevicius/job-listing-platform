import { z } from "zod";

export const createCategorySchema = z.object({
  title: z
    .string({
      required_error: "Privalomas kategorijos pavadinimas",
      invalid_type_error: "Privalomas kategorijos pavadinimas",
    })
    .min(3, {
      message: "Kategorija privalo būti bent 3 simbolių",
    }),
  slug: z.string(),
});
