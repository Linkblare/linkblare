
import { z } from "zod";
import { WithInfinitListSchema } from "./_helpers/WithInfinitList";
import { WithSearch } from "./_helpers/WithSearch";
import { WithSorting } from "./_helpers/WithSorting";

const UserActionEnum = z.enum([
    'collection_like_toggle',
    'collection_save_toggle',
    'item_like_toggle',
    'toggle_preferred_tag'
])

export type UserActions = z.TypeOf<typeof UserActionEnum>;

export const UserActionSchema = z.object({
    action: UserActionEnum,
    entityId: z.number()
})

export type UserActionResult = {
    state: boolean, 
    entityId: number, 
    count: number, 
    action: UserActions
}

export const SavedCollectionInfinitListSchema = z.object({
    filter: z.object({
        tags: z.array(z.string()).optional()
    }).optional()
})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)


export const TagInfinitListSchema = z.object({})
    .merge(WithInfinitListSchema)
    .merge(WithSearch)
    .merge(WithSorting)