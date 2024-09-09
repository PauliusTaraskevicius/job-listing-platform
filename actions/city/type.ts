import { z } from "zod";

import { createCitySchema } from "./validation";

export type cityType = z.infer<typeof createCitySchema>;

