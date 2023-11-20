import { z } from "zod";

export const WithSearch = z.object({
    search: z.string().optional()
})