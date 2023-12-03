/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Item, type Collection, type Prisma, type Tag } from '@prisma/client';
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { 
    type CollectionOut, 
    CreateCollectionSchema, 
    DeleteCollectonSchema, 
    GetCollectionByIdSchema, 
    type SingleCollectionOut, 
    UpdateCollectionSchema, 
    PaginatedCollectionListSchema, 
    InfinitCollectionListSchema, 
    GetCollectionBySlugSchema ,
    InfinitCollectionSearchSchema,
    RelatedCollectionSchema
} from '@/schema/collection-schema';
import { TRPCError } from '@trpc/server';
import { md5Hash, paginate } from '@/lib/utils';
import config from '@/server/config';

type CollectionListResponse = Collection & {
    likes: {id: string}[],
    saves: {id: string}[],
    tags: Tag[],
    items: Item[],
    _count: {
        likes: number,
        saves: number,
        items: number
    }
}
type CollectionSingleResponse = Collection & {
    likes: {id: string}[],
    saves: {id: string}[],
    tags: Tag[],
    items: Item[],
    _count: {
        likes: number,
        saves: number,
        items: number,
    }
}

export const getCollectionIncludes = (userId?: string, type: 'List'|'Single' = 'Single') => {
    const includes: Prisma.CollectionInclude = {
        likes: userId ? {where: {id: userId}} : undefined,
        saves: userId ? {where: {id: userId}} : undefined,
        tags: true,
        _count: {
            select: {
                likes: true,
                saves: true,
                items: true
            }
        },
        items: {
            where: {
                thumbnail: {not: null}
            },
            take: config.collectionFillItemImagesLimit,
        }
    };

    if(type === 'Single'){
        includes.tags = true;
        // includes.items = true
    }
    return includes;
}

export const collectionListResolver = (response: CollectionListResponse) => {
    const {likes, saves, items, ...rest} = response;
    const result: CollectionOut = {
        ...rest,
        itemsImages: items.map(item => ({itemId: item.id, thumbnail: item.thumbnail!})),
        liked: likes && likes.length > 0,
        saved: saves && saves.length > 0,
    }
    return result;
}
export const collectionSingleResolver = (response: CollectionSingleResponse) => {
    const {likes, saves, items, ...rest} = response;
    const result: SingleCollectionOut = {
        ...rest,
        itemsImages: items.map(item => ({itemId: item.id, thumbnail: item.thumbnail!})),
        liked: likes && likes.length > 0,
        saved: saves && saves.length > 0,
    }
    return result;
}

export const CollectionRouter = createTRPCRouter({

    create: protectedProcedure.input(CreateCollectionSchema).mutation(async ({ctx, input}) => {
        const {tags, ...rest } = input;
        const userId = ctx.session.user.id
        const res = await ctx.db.collection.create({
            data: {
                ...input,
                hash: md5Hash(input.title),
                tags: {
                    connectOrCreate: tags.map(name => ({
                        where: { name },
                        create: { name }
                    }))
                }
            },
            include: getCollectionIncludes(userId)
        });

        return collectionSingleResolver(res)
    }),

    update: protectedProcedure.input(UpdateCollectionSchema).mutation(async ({ctx, input}) => {
        const {tags,id, ...rest} = input;
        const userId = ctx.session.user.id;

        const alreadyExists = await ctx.db.collection.findFirst({
            where: {id},
            include: {tags: true}
        });

        if(!alreadyExists) throw new TRPCError({code: 'NOT_FOUND', message: 'Collection not found!'});

        const tagsForConnnect = tags.filter(tag => !alreadyExists.tags.find(tg => tg.name === tag));
        const tagsForDisconnect = alreadyExists.tags.filter(tag => !tags.find(tg => tg === tag.name));

        const res = await ctx.db.collection.update({
            where: {id},
            data: {
                ...input,
                hash: md5Hash(input.title),
                tags: {
                    connectOrCreate: tagsForConnnect.map(tag => ({where: {name: tag}, create: {name: tag}})),
                    disconnect: tagsForDisconnect.map(tag => ({name: tag.name}))
                }
            },

            include: getCollectionIncludes(userId)
        });

        return collectionSingleResolver(res)
    }),

    delete: protectedProcedure.input(DeleteCollectonSchema).mutation(async ({ctx, input}) => {
        return await ctx.db.collection.delete({where:  {id: input.id}})
    }),

    getById: publicProcedure.input(GetCollectionByIdSchema).query(async ({ctx, input}) => {
        const userId = ctx.session?.user.id;
        const res = await ctx.db.collection.findFirst({
            where: {id: input.id},
            include: getCollectionIncludes(userId)
        });
        if(!res) throw new TRPCError({code: 'NOT_FOUND', message: 'Collection not found!'});
        return collectionSingleResolver(res)
    }),
    getBySlug: publicProcedure.input(GetCollectionBySlugSchema).query(async ({ctx, input}) => {
        const userId = ctx.session?.user.id;
        const res = await ctx.db.collection.findFirst({
            where: {slug: input.slug},
            include: getCollectionIncludes(userId)
        });
        if(!res) throw new TRPCError({code: 'NOT_FOUND', message: 'Collection not found!'});
        return collectionSingleResolver(res)
    }),

    list: publicProcedure.input(PaginatedCollectionListSchema).query(async ({ctx, input}) => {
        const userId = ctx.session?.user.id;
        const res = await paginate<CollectionListResponse, Prisma.CollectionFindManyArgs>(ctx.db.collection,  {
            where: {
                title: (input.search) ? {contains: input.search, mode: 'insensitive'} : undefined,
                tags: (input.filter?.tags && input.filter.tags.length > 0) ? {some: {name: {in: input.filter.tags}}} : undefined
            },
            include: getCollectionIncludes(userId),
            orderBy: input.sort
        }, input.pagination)
        if(!res) throw new TRPCError({code: 'NOT_FOUND', message: 'Collection not found!'});
        return {
            ...res,
            data: res.data.map(r => collectionListResolver(r)),
        }
    }),

    inifintList: publicProcedure.input(InfinitCollectionListSchema).query(async ({ctx, input}) => {
        const {take, cursor, ...rest} = input
        const userId = ctx.session?.user.id;
        const currenctTake = input.take ? input.take + 1 : config.limit + 1;
        let nextCursor: {id: number} | undefined = undefined;
        
        const res = await ctx.db.collection.findMany({
            where: {
                title: (input.search) ? {contains: input.search, mode: 'insensitive'} : undefined,
                tags: (input.filter?.tags && input.filter.tags.length > 0) ? {some: {name: {in: input.filter.tags}}} : undefined,
            },
            include: getCollectionIncludes(userId),
            take: currenctTake,
            cursor: cursor,
            orderBy: input.sort
        });

        if (res.length >= currenctTake) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = {id: lastResult.id}
            }
        }
        return {
            items: res.map(r => collectionListResolver(r)),
            nextCursor
        }
    }), 

    feed: protectedProcedure.input(InfinitCollectionListSchema).query(async ({ctx, input}) => {
        const {take, cursor, ...rest} = input
        const userId = ctx.session.user.id;
        const currenctTake = input.take ? input.take + 1 : config.limit + 1;
        let nextCursor: {id: number} | undefined = undefined;
        let tags = input.filter?.tags ?? [];

        if(!input.filter?.tags || input.filter.tags.length === 0){
            const user = await ctx.db.user.findFirst({
                where: {id: userId},
                select: {
                    preferredTags: true
                }
            });
    
            if(user){
                tags = user.preferredTags.map(t => t.name);
            }
        }
        const res = await ctx.db.collection.findMany({
            where: {
                title: (input.search) ? {contains: input.search, mode: 'insensitive'} : undefined,
                tags:  {some: {name: {in: tags}}},
            },
            include: getCollectionIncludes(userId),
            take: currenctTake,
            cursor: cursor,
            orderBy: input.sort
        });

        if (res.length >= currenctTake) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = {id: lastResult.id}
            }
        }
        return {
            items: res.map(r => collectionListResolver(r)),
            nextCursor
        }
    }), 


    inifintSearch: publicProcedure.input(InfinitCollectionSearchSchema).query(async ({ctx, input}) => {
        const {take, cursor, ...rest} = input
        const userId = ctx.session?.user.id;
        const currenctTake = input.take ? input.take + 1 : config.searchResultLimit + 1;
        let nextCursor: {id: number} | undefined = undefined;
        
        const res = await ctx.db.collection.findMany({
            where: {
                title: (input.search) ? {contains: input.search, mode: 'insensitive'} : undefined,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                _count: {
                    select: {
                        items: true
                    }
                }
            },
            take: currenctTake,
            cursor: cursor,
            orderBy: input.sort
        });

        if (res.length >= currenctTake) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = {id: lastResult.id}
            }
        }
        return {
            items: res,
            nextCursor
        }
    }), 


    relatedCollections: publicProcedure.input(RelatedCollectionSchema).query(async ({ctx, input}) => {
        const {collectionId, ...rest} = input;
        const userId = ctx.session?.user.id;
        const targetCollection = await ctx.db.collection.findFirst({where: {id: input.collectionId}, include: {tags: true}});
        if(!targetCollection) throw new TRPCError({code: 'NOT_FOUND', message: 'Collection not found!'});
        const res = await ctx.db.collection.findMany({
            where: {
                id: {not: collectionId},
                tags: {some: {name: {in: targetCollection.tags.map(tg => tg.name)}}}
            },
            include: getCollectionIncludes(userId),
            orderBy: {
                items: {_count: 'desc'}
            },
            take: input.limit ?? config.relatedDataLimit
        });
        return {
            items: res.map(r => collectionListResolver(r)),
        }
    })

})