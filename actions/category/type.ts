import { z } from "zod";

import { createCategorySchema } from "./validation";

export type categoryType = z.infer<typeof createCategorySchema>;

