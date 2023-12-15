import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";



function searchResultResolver(response: {
    collections: {id: number, title: string, slug: string|null}[],
    tags: {id: number, name: string}[],
    items: {id: number, title: string, slug: string|null}[]
}){
    return response;
}


export const SearchRouter = createTRPCRouter({
    getSearch: publicProcedure.input(z.object({
        search: z.string().optional()
    })).query(async ({ ctx, input }) => {

        if(!input.search){
            return searchResultResolver({
                collections: [],
                tags: [],
                items: []
            })
        }

        const collection = await ctx.db.collection.findMany({
            where: {
                title: {
                    contains: input.search
                }
            },
            select: {
                id: true,
                title: true,
                slug: true
            }
        });
        const tag = await ctx.db.tag.findMany({
            where: {
                name: {
                    contains: input.search
                }
            },
            select: {
                id: true,
                name: true
            }
        });

        const item = await ctx.db.item.findMany({
            where: {
                title: {
                    contains: input.search
                }
            },
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        return searchResultResolver({
            collections: collection,
            tags: tag,
            items: item
        })
    })
});
