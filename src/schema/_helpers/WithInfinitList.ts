/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const WithInfinitListSchema = z.object({
    take: z.number().optional(),
    cursor: z.object({id: z.number()}).optional()
});


export type WithInfinitListType = z.TypeOf<typeof WithInfinitListSchema>;

export type InfiniteResult<I= any, C={id: number}> = {
    items: I[],
    nextCursor: C | undefined
}