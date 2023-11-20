import { z } from "zod";

const PaginationSchema = z.object({
    perPage: z.string().or(z.number()).optional(),
    page: z.string().or(z.number()).optional()
});

export const WithPagination = z.object({
    pagination: PaginationSchema.optional()
})

export type WithPaginationType = z.TypeOf<typeof WithPagination>;