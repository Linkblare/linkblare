
import { z } from "zod";

export const sortDirection = z.enum(['asc', 'desc']);
const sortObject = z.record(sortDirection);
const sortByRelation = z.record(
    sortObject.or(z.object({
        _count: sortObject
    }))
)

export const WithSorting = z.object({
    sort: sortObject.or(sortByRelation).optional()
});

export type Sort = Record<string, ('asc'|'desc')|{_count: 'asc'|'desc'}>

export type WithSortingType = z.TypeOf<typeof WithSorting>;
