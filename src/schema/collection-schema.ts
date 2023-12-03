/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { z } from "zod";
import { WithPagination } from "./_helpers/WithPagination";
import { WithSearch } from "./_helpers/WithSearch";
import { WithSorting } from "./_helpers/WithSorting";
import { WithInfinitListSchema } from "./_helpers/WithInfinitList";
import { type Tag, type Collection, Item } from "@prisma/client";


export const CreateCollectionSchema = z.object({
    title: z.string(),
    slug: z.string(),
    hash: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([])
})

export type CreateCollectionInput = z.TypeOf<typeof CreateCollectionSchema>;

export const DeleteCollectonSchema = z.object({
    id: z.number()
})
export type DeleteCollectionInput = z.TypeOf<typeof DeleteCollectonSchema>;

export const UpdateCollectionSchema = z.object({
    id: z.number()
}).merge(CreateCollectionSchema);

export type UpdateCollectionInput = z.TypeOf<typeof UpdateCollectionSchema>;

export const GetCollectionByIdSchema = z.object({
    id: z.number()
})
export const GetCollectionBySlugSchema = z.object({
    slug: z.string()
})

export const PaginatedCollectionListSchema = z.object({
    filter: z.object({
        tags: z.array(z.string()).optional()
    }).optional()
})
    .merge(WithPagination)
    .merge(WithSearch)
    .merge(WithSorting)



export const InfinitCollectionListSchema = z.object({
    filter: z.object({
        tags: z.array(z.string()).optional()
    }).optional()
})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)


export const InfinitCollectionSearchSchema = z.object({})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)


export type CollectionItemImage = {itemId: number, thumbnail: string};

export type CollectionOut = Omit<Collection, 'itemsImages'> & {
    itemsImages: CollectionItemImage[],
    liked: boolean
    saved: boolean,
    tags: Tag[],
    _count: {
        likes: number,
        items: number,
        saves: number
    }
}

export type SingleCollectionOut = Omit<Collection, 'itemsImages'> & {
    itemsImages: CollectionItemImage[],
    liked: boolean
    saved: boolean,
    tags: Tag[]
    _count: {
        likes: number,
        items: number,
        saves: number
    }
}

export type CollectionSearchOutput = {
    id: number,
    slug: string,
    title: string,
    _count: {
        items: number
    }
}