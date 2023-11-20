import { z } from "zod";

export const WithInfinitListSchema = z.object({
    take: z.number().optional(),
    cursor: z.object({id: z.number()}).optional()
});


export type WithInfinitListType = z.TypeOf<typeof WithInfinitListSchema>;