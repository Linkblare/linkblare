/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { z } from "zod";
import { WithPagination } from "./_helpers/WithPagination";
import { WithSearch } from "./_helpers/WithSearch";
import { WithSorting } from "./_helpers/WithSorting";
import { WithInfinitListSchema } from "./_helpers/WithInfinitList";
import { type Tag } from "@prisma/client";


export const CreateTagSchema = z.object({
    name: z.string(),
    isFlag: z.boolean(),
    color: z.string().optional(),
    isCategory: z.boolean().default(false),
})

export const DeleteTagSchema = z.object({
    id: z.number()
})

export const UpdateTagSchema = z.object({
    id: z.number()
}).merge(CreateTagSchema);

export const GetTagByIdSchema = z.object({
    id: z.number()
})

export const PaginatedTagListSchema = z.object({
    includePreferredBy: z.boolean().default(false)
})
    .merge(WithPagination)
    .merge(WithSearch)
    .merge(WithSorting)


export const InfinitTagListSchema = z.object({
    includePreferredBy: z.boolean().default(false),
    targetCollection: z.number().optional(),
    isCategory: z.boolean().optional().default(false)
})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)


export type TagOut = Tag & {
    isPreferred: boolean
}

export type SingleTagOut = Tag & {
    isPreferred: boolean
    _count: {
        items: number,
        collections: number,
        preferredByUsers: number
    }
}