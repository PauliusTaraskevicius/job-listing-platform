import { z } from "zod";

import { createJobSchema } from "./validation";

export type jobType = z.infer<typeof createJobSchema>;
