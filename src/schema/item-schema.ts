/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { z } from "zod";
import { WithPagination } from "./_helpers/WithPagination";
import { WithSearch } from "./_helpers/WithSearch";
import { WithSorting } from "./_helpers/WithSorting";
import { WithInfinitListSchema } from "./_helpers/WithInfinitList";
import { type Collection, type Prisma, type Item, Tag } from "@prisma/client";

export const ItemTypesArray = ['image_slide', 'link', 'pdf'] as const;
export const LinkTypesArray = ['page', 'youtube', 'article', 'file_link'] as const;

const ItemTypesEnumSchema = z.enum(ItemTypesArray)
const LinkTypesEnumSchema = z.enum(LinkTypesArray)

export type ItemTypes = z.TypeOf<typeof ItemTypesEnumSchema>;
export enum ItemTypeEnum {'image_slide', 'link', 'pdf'}
export type LinkTypes = z.TypeOf<typeof LinkTypesEnumSchema>;
export enum LinkTypeEnum {"page", "youtube", "article", "file_link"}

export type ItemSort = Prisma.ItemWhereUniqueInput

// const ItemSortSchema = z.object({
//     createdAt: z.enum(['asc','desc']),
//     updatedAt: z.enum(['asc', 'desc']),
//     title: z.enum(['asc', 'desc']),
//     id: z.enum(['asc', 'desc']),
//     likes: z.object()
// })

export const LinkContentSchema = z.object({
    url: z.string(),
    originUrl: z.string(),
    favicon: z.string().optional(),
});

export interface LinkContent extends z.TypeOf<typeof LinkContentSchema>{}

export const PdfContentSchema = z.object({
    pdfUrl: z.string()
})
export interface PdfContent extends z.TypeOf<typeof PdfContentSchema>{}

export const ImageSlideContentSchema = z.object({
    slides: z.array(z.string()).default([])
})
export interface ImageSlideContent extends z.TypeOf<typeof ImageSlideContentSchema>{}


export const CreateItemSchema = z.object({
    title: z.string(),
    slug: z.string(),
    hash: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    type: ItemTypesEnumSchema,
    content: z.any(),
    tags: z.array(z.string()).default([]),
    flags: z.array(z.string()).default([]).optional(),
    collectionId: z.number()
})

export type CreateItemInput = z.TypeOf<typeof CreateItemSchema>;

export const DeleteItemSchema = z.object({
    id: z.number()
})

export const UpdateItemSchema = z.object({
    id: z.number()
}).merge(CreateItemSchema);

export type UpdateItemInput = z.TypeOf<typeof UpdateItemSchema>;

export const BulkUpddateItemSchema = z.object({
    items: z.array(UpdateItemSchema)
})
export type BulkUpddateItemInput = z.TypeOf<typeof BulkUpddateItemSchema>

export const GetItemByIdSchema = z.object({
    id: z.number()
})
export const GetItemBySlugSchema = z.object({
    slug: z.string()
})

export const PaginatedItemListSchema = z.object({
    filter: z.object({
        tags: z.array(z.string()).optional(),
        collectionId: z.number().optional()
    }).optional()
})
    .merge(WithPagination)
    .merge(WithSearch)
    .merge(WithSorting)



export const InfinitItemListSchema = z.object({
    filter: z.object({
        tags: z.array(z.string()).default([]).optional(),
        collectionId: z.number().optional(),
        collectionInclude: z.boolean().default(false).optional(),
    }).optional()
})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)

export const RelatedItems = z.object({
    itemId: z.number(),
    limit: z.number().max(50).optional()
})



export const IsLinkItemExistsSchema = z.object({
    url: z.string(),
    collectionId: z.number().optional()
})

export const MoveItemFromCollectionSchema =z.object({
    fromCollectionId: z.number(),
    toCollectionId: z.number(),
    itemIds: z.array(z.number())
});
export type MoveItemFromCollectionInput = z.TypeOf<typeof MoveItemFromCollectionSchema>;

export const CopyItemFromCollectionSchema = z.object({
    fromCollection: z.number(),
    toCollection: z.number(),
    itemIds: z.array(z.number())
})

export type CopyItemFromCollectionInput = z.TypeOf<typeof CopyItemFromCollectionSchema>;


export type ItemOut<T = any> = Omit<Item, 'content'> & {
    type: ItemTypes,
    content: T,
    tags: Tag[],
    liked: boolean
    _count: {
        likes: number,
    }
}

export type SingleItemOut<T = any> = Omit<Item, 'content'|'type'> & {
    type: ItemTypes,
    content: T
    Collection: Collection,
    tags: Tag[],
    liked: boolean
    _count: {
        likes: number,
    }
}
