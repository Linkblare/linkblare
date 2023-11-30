import { SavedCollectionInfinitListSchema, TagInfinitListSchema, UserActionSchema, UserActions } from "@/schema/user-schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import config from "@/server/config";
import { collectionListResolver, getCollectionIncludes } from "./collection";
import { TRPCError } from "@trpc/server";
import { type Prisma } from "@prisma/client";

const UserRouter = createTRPCRouter({

    savedCollection: protectedProcedure.input(SavedCollectionInfinitListSchema).query(async ({ ctx, input }) => {
        const { take, cursor, ...rest } = input
        const userId = ctx.session?.user.id;
        const currenctTake = input.take ? input.take + 1 : config.limit + 1;
        let nextCursor: { id: number } | undefined = undefined;
        const res = await ctx.db.user.findFirst({
            where: {
                id: userId
            },

            select: {
                savedCollection: {
                    where: {
                        title: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
                        tags: (input.filter?.tags && input.filter.tags.length > 0) ? { some: { name: { in: input.filter.tags } } } : undefined,
                    },
                    include: getCollectionIncludes(userId),
                    take: currenctTake,
                    cursor: cursor,
                    orderBy: input.sort
                }
            }
        })

        if (!res) throw new TRPCError({ code: 'NOT_FOUND', 'message': "User Not Found" });

        if (res.savedCollection.length >= currenctTake) {
            const lastResult = res.savedCollection.pop();
            if (lastResult) {
                nextCursor = { id: lastResult.id }
            }
        }
        return {
            items: res.savedCollection.map(r => collectionListResolver(r)),
            nextCursor
        }
    }),
    
    preferredTags: protectedProcedure.input(TagInfinitListSchema).query(async ({ ctx, input }) => {
        const { take, cursor, ...rest } = input
        const userId = ctx.session?.user.id;
        const currenctTake = take ? take + 1 : config.limit + 1;
        let nextCursor: { id: number } | undefined = undefined;
        const res = await ctx.db.user.findFirst({
            where: {
                id: userId
            },

            select: {
                preferredTags: {
                    where: {
                        name: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
                    },
                    take: currenctTake,
                    cursor: cursor,
                    orderBy: input.sort
                }
            }
        })

        if (!res) throw new TRPCError({ code: 'NOT_FOUND', 'message': "User Not Found" });

        if (res.preferredTags.length >= currenctTake) {
            const lastResult = res.preferredTags.pop();
            if (lastResult) {
                nextCursor = { id: lastResult.id }
            }
        }
        return {
            items: res.preferredTags,
            nextCursor
        }
    }),

    action: protectedProcedure.input(UserActionSchema).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const resultSet: {state: boolean, entityId: number, count: number, action: UserActions}= {state: false, entityId: input.entityId, count: 0, action: input.action};

        const includes: Prisma.UserInclude = {
            
        }

        if (input.action === 'collection_like_toggle') includes.likedCollections = { where: { id: input.entityId } };
        if (input.action === 'item_like_toggle') includes.likedItems = { where: { id: input.entityId } };
        if (input.action === 'collection_save_toggle') includes.savedCollection = { where: { id: input.entityId } };
        if (input.action === 'toggle_preferred_tag') includes.preferredTags = { where: { id: input.entityId } };

        const res = await ctx.db.user.findFirst({
            where: { id: userId },
            include: includes
        });

        if (!res) throw new TRPCError({ code: 'NOT_FOUND', message: "User not found" })
        let updateInput: Prisma.UserUpdateInput = {}

        if(input.action === 'collection_like_toggle') {
            const isCollectonLiked = res.likedCollections.length > 0;
            updateInput = {
                likedCollections: {
                    connect: !isCollectonLiked ? {id: input.entityId} : undefined,
                    disconnect: isCollectonLiked ? {id: input.entityId} : undefined
                }
            }
        }

        if(input.action === 'item_like_toggle'){
            const isItemLiked = res.likedItems.length > 0;
            updateInput = {
                likedItems: {
                    connect: !isItemLiked ? {id: input.entityId} : undefined,
                    disconnect: isItemLiked ? {id: input.entityId} : undefined
                }
            }
        }
        if(input.action === 'collection_save_toggle'){
            const isCollectionSaved = res.savedCollection.length > 0;
            updateInput = {
                savedCollection: {
                    connect: !isCollectionSaved ? {id: input.entityId} : undefined,
                    disconnect: isCollectionSaved ? {id: input.entityId} : undefined
                }
            }
        }
        if(input.action === 'toggle_preferred_tag'){
            const isTagPreferred = res.preferredTags.length > 0;
            updateInput = {
                preferredTags: {
                    connect: !isTagPreferred ? {id: input.entityId} : undefined,
                    disconnect: isTagPreferred ? {id: input.entityId} : undefined
                }
            }
        }

        const result = await ctx.db.user.update({
            where: {
                id: userId
            },
            data: updateInput,
            include: includes
        });

        if(input.action === 'collection_like_toggle') {
            resultSet.state = result.likedCollections.length > 0;
            resultSet.count = result.likedCollections.length
        }
        if(input.action === 'item_like_toggle') {
            resultSet.state = result.likedItems.length > 0;
            resultSet.count = result.likedItems.length;
        }
        if(input.action === 'collection_save_toggle') {
            resultSet.state = result.savedCollection.length > 0;
            resultSet.count = result.savedCollection.length;
        }
        if(input.action === 'toggle_preferred_tag'){
            resultSet.state = result.preferredTags.length > 0;
            resultSet.count = result.preferredTags.length;
        }

        return resultSet;
    })
})

export default UserRouter;