/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CreateItemSchema, type SingleItemOut, type ItemOut, UpdateItemSchema, DeleteItemSchema, GetItemByIdSchema, PaginatedItemListSchema, InfinitItemListSchema, type ItemTypes, GetItemBySlugSchema, MoveItemFromCollectionSchema, CopyItemFromCollectionSchema, LinkContent } from "@/schema/item-schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type Prisma, type Collection, type Item, type Tag } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getGoUrl, md5Hash, paginate } from "@/lib/utils";
import config from "@/server/config";
import { env } from "@/env.mjs";
import { z } from "zod";

type ListItemResponse = Omit<Item, 'type'> & {
    type: ItemTypes,
    tags: Tag[],
    likes: { id: string }[],
    _count: {
        likes: number
    }
}

type SingleItemResponse = ListItemResponse & {
    Collection: Collection,
    tags: Tag[]
}

export const itemOutResolver = <C = any>(item: ListItemResponse) => {
    const content = item.type === 'link' ? {...item.content as any, url: getGoUrl(item.slug??'')} : item.content as C
    const res: ItemOut<C> = {
        ...item,
        content ,
        liked: Boolean(item.likes && item.likes.length > 0)
    }
    return res;
}

export const singleItemResolver = <C = any>(item: SingleItemResponse) => {
    const content = item.type === 'link' ? {...item.content as any, url: getGoUrl(item.slug??'')} : item.content as C
    const res: SingleItemOut<C> = {
        ...item,
        content,
        liked: Boolean(item.likes && item.likes.length > 0)
    }
    return res;
}

export const getItemIncludes = (userId?: string, type: 'single' | 'list' = 'list') => {
    const includes: Prisma.ItemInclude = {
        likes: userId ? {
            where: { id: userId },
            select: { id: true }
        } : undefined,
        _count: {
            select: {
                likes: true,
            }
        }
    };

    if (type === 'single') {
        includes.Collection = true;
        includes.tags = true;
    }
    return includes;
}



const ItemRouter = createTRPCRouter({

    create: protectedProcedure.input(CreateItemSchema).mutation(async ({ ctx, input }) => {
        const { collectionId, tags, ...rest } = input;
        const userId = ctx.session.user.id
        const res = await ctx.db.item.create({
            data: {
                Collection: {
                    connect: { id: collectionId }
                },
                content: rest.content!,
                ...rest,
                hash: md5Hash(input.title),
                tags: {
                    connectOrCreate: tags.map(name => ({
                        where: { name },
                        create: { name }
                    }))
                },
            },
            include: getItemIncludes(userId, 'single')
        });

        // UPDATE 'itemsUpdated' to current date
        await ctx.db.collection.update({
            where: { id: input.collectionId },
            data: {
                itemsUpdated: new Date(Date.now())
            }
        })

        //  SEND EMAIL TO THE ALL SUBSCRIBERS


        return singleItemResolver(res as any)
    }),

    update: protectedProcedure.input(UpdateItemSchema).mutation(async ({ ctx, input }) => {
        const { tags, id, ...rest } = input;
        const userId = ctx.session.user.id;

        const alreadyExists = await ctx.db.item.findFirst({
            where: { id },
            include: { tags: true }
        });

        if (!alreadyExists) throw new TRPCError({ code: 'NOT_FOUND', message: 'Item not found!' });

        const tagsForConnnect = tags.filter(tag => !alreadyExists.tags.find(tg => tg.name === tag));
        const tagsForDisconnect = alreadyExists.tags.filter(tag => !tags.find(tg => tg === tag.name));

        const res = await ctx.db.item.update({
            where: { id },
            data: {
                tags: {
                    connectOrCreate: tagsForConnnect.map(tag => ({ where: { name: tag }, create: { name: tag } })),
                    disconnect: tagsForDisconnect.map(tag => ({ name: tag.name }))
                },
                content: rest.content!,
                ...rest,
                hash: md5Hash(input.title),
            },

            include: getItemIncludes(userId, 'single')
        });

        return singleItemResolver(res as any)
    }),

    delete: protectedProcedure.input(DeleteItemSchema).mutation(async ({ ctx, input }) => {
        return await ctx.db.item.delete({ where: { id: input.id } })
    }),

    getById: publicProcedure.input(GetItemByIdSchema).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;
        const res = await ctx.db.item.findFirst({
            where: { id: input.id },
            include: getItemIncludes(userId, 'single')
        });
        if (!res) throw new TRPCError({ code: 'NOT_FOUND', message: 'Collection not found!' });
        return singleItemResolver(res as any)
    }),

    getBySlug: publicProcedure.input(GetItemBySlugSchema).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;
        const res = await ctx.db.item.findFirst({
            where: { slug: input.slug },
            include: getItemIncludes(userId, 'single')
        });
        if (!res) throw new TRPCError({ code: 'NOT_FOUND', message: 'Collection not found!' });
        return singleItemResolver(res as any)
    }),

    list: publicProcedure.input(PaginatedItemListSchema).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;
        const res = await paginate<SingleItemResponse, Prisma.ItemFindManyArgs>(ctx.db.item, {
            where: {
                collectionId: input.filter?.collectionId,
                title: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
                tags: (input.filter?.tags && input.filter.tags.length > 0) ? { some: { name: { in: input.filter.tags } } } : undefined
            },
            include: getItemIncludes(userId, 'single'),
            orderBy: input.sort ?? { createdAt: 'desc' }
        }, input.pagination)
        return {
            ...res,
            data: res.data.map(r => singleItemResolver(r)),
        }
    }),

    inifintList: publicProcedure.input(InfinitItemListSchema).query(async ({ ctx, input }) => {
        const { take, cursor, ...rest } = input
        const userId = ctx.session?.user.id;
        const currenctTake = input.take ? input.take + 1 : config.limit + 1;
        let nextCursor: { id: number } | undefined = undefined;
        const whereCond: Prisma.ItemWhereInput = {
            title: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
            tags: (input.filter?.tags && input.filter.tags.length > 0) ? { some: { name: { in: input.filter.tags } } } : undefined
        }
        if (input.filter?.collectionId) {
            whereCond.collectionId = input.filter.collectionId;
            if (input.filter.collectionInclude) {
                whereCond.tags = undefined;
                whereCond.collectionId = undefined;
                whereCond.OR = [
                    {
                        collectionId: input.filter.collectionId,
                    },
                    {
                        tags: (input.filter?.tags && input.filter.tags.length > 0) ? { some: { name: { in: input.filter.tags } } } : undefined
                    }
                ]
            }
        }

        const res = await ctx.db.item.findMany({
            where: whereCond,
            include: getItemIncludes(userId, 'single'),
            take: currenctTake,
            cursor: cursor,
            orderBy: input.sort ?? { createdAt: 'desc' }
        });

        if (res.length >= currenctTake) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = { id: lastResult.id }
            }
        }
        return {
            items: res.map(r => singleItemResolver(r as any)),
            nextCursor
        }
    }),

    relatedItems: publicProcedure.input(GetItemByIdSchema).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;
        const targetItem = await ctx.db.item.findFirst({ where: { id: input.id }, include: { tags: true } });
        if (!targetItem) throw new TRPCError({ code: 'NOT_FOUND', message: 'Item not found!' });
        const res = await ctx.db.item.findMany({
            where: {
                id: { not: input.id },
                OR: [
                    {
                        collectionId: targetItem.collectionId,
                    },
                    {
                        tags: { some: { name: { in: targetItem.tags.map(tg => tg.name) } } }
                    }
                ]
            },
            include: getItemIncludes(userId, 'single'),
            orderBy: {
                likes: {
                    _count: 'desc'
                }
            },
            take: config.relatedDataLimit
        });
        return {
            items: res.map(r => itemOutResolver(r as any)),
        }
    }),

    moveFromCollection: protectedProcedure.input(MoveItemFromCollectionSchema).mutation(async ({ ctx, input }) =>{
        const res = await ctx.db.item.updateMany({
            where: { id: { in: input.itemIds } },
            data: {
                collectionId: input.toCollectionId,
                updatedAt: new Date()
            }
        });
        await ctx.db.collection.update({
            where: { id: input.toCollectionId },
            data: {
                itemsUpdated: new Date(Date.now())
            }
        })

        return res;
    }),

    copyFromCollection: protectedProcedure.input(CopyItemFromCollectionSchema).mutation(async ({ ctx, input }) =>{
        const itemForCopy = await ctx.db.item.findMany({
            where: { id: { in: input.itemIds } },
            include: { tags: true }
        });
        const res = await ctx.db.item.createMany({
            data: itemForCopy.map(({tags,id, ...item}) => ({
               ...item,
                content: item.content as any,
                createdAt: new Date(),
                updatedAt: new Date(),
                collectionId: input.toCollection,
            }))
        });

        const newItems = await ctx.db.item.findMany({
            where: {
                title: { in: itemForCopy.map(i => i.title) },
                collectionId: input.toCollection
             },
        });

        newItems.forEach(async (item) =>{
            const tags = itemForCopy.find(i => i.title === item.title)?.tags;
            await ctx.db.item.update({
                where: { id: item.id },
                data: {
                    tags:{
                        connect: tags?.map(t => ({ id: t.id }))
                    }
                }
            })
        })

    
        await ctx.db.collection.update({
            where: { id: input.toCollection },
            data: {
                itemsUpdated: new Date(Date.now())
            }
        })

        return res;
    }),


    getLinkItemUrlBySlug: publicProcedure.input(z.object({slug: z.string()})).query(async ({ ctx, input }) => {
        const item = await ctx.db.item.findFirst({
            where: {
                slug: input.slug,
                type: 'link'
            },
            select: {
                content: true
            }
        })

        if(!item){
            return {
                url: null
            }
        }
        const content = item.content as LinkContent;
        return {
            url: content.url
        }

    })
})




export default ItemRouter;

