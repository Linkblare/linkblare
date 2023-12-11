/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateTagSchema, DeleteTagSchema, InfinitTagListSchema, PaginatedTagListSchema, UpdateTagSchema } from '@/schema/tag-schema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from './../trpc';
import { paginate } from '@/lib/utils';
import { Prisma, Tag } from '@prisma/client';
import config from '@/server/config';


type TagResponse = Tag & {
    preferredByUsers: {id: string, name?: string, email?: string}[]
}

const tagResolver = (res: TagResponse, currentUserId?: string) => {
    return {
        id: res.id,
        name: res.name,
        isFlag: res.isFlag,
        color: res.color,
        isPreferred: currentUserId ? Boolean(res.preferredByUsers?.find(user => user.id === currentUserId)) : false,
    }
}


const TagRouter = createTRPCRouter({
    create: protectedProcedure.input(CreateTagSchema).mutation(async ({ ctx, input }) => {
        const res = await ctx.db.tag.create({
            data: input
        });
        return res;
    }),

    update: protectedProcedure.input(UpdateTagSchema).mutation(async ({ ctx, input }) => {
        const res = await ctx.db.tag.update({
            where: {
                id: input.id
            },
            data: input
        });
        return res;
    }),

    delete: protectedProcedure.input(DeleteTagSchema).mutation(async ({ ctx, input }) => {
        const res = await ctx.db.tag.delete({ where: { id: input.id } });
        return res;
    }),

    getById: publicProcedure.input(DeleteTagSchema).mutation(async ({ ctx, input }) => {
        const res = ctx.db.tag.delete({ where: { id: input.id } });
        return res;
    }),

    list: publicProcedure.input(PaginatedTagListSchema).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;

        const res = await paginate<Tag & { preferredByUsers: { id: string, name?: string, email: string }[] }, Prisma.TagFindManyArgs>(ctx.db.tag, {
            where: {
                name: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
            },
            include: {
                preferredByUsers: (userId && input.includePreferredBy) ? {
                    where: { id: userId },
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
                    : undefined
            },
            orderBy: input.sort
        }, input.pagination)

        return {
            meta: res.meta,
            data: res.data.map(r => tagResolver(r, userId))
        };
    }),
    infintList: publicProcedure.input(InfinitTagListSchema).query(async ({ ctx, input }) => {
        const { take, cursor, ...rest } = input
        const userId = ctx.session?.user.id;
        const currenctTake = input.take ? input.take + 1 : config.limit + 1;
        let nextCursor: { id: number } | undefined = undefined;

        const whereCond: Prisma.TagWhereInput = {
            name: (input.search) ? { contains: input.search, mode: 'insensitive' } : undefined,
        }

        if(input.targetCollection){
            whereCond.OR = [
                {
                    items: {
                        some: {
                            collectionId: input.targetCollection,
                        }
                    }
                },
                {
                    collections: {
                        some: {
                            id: input.targetCollection,
                        }
                    }
                }
            ]
        }


        const res = await ctx.db.tag.findMany({
            where: whereCond,
            include: {
                preferredByUsers: (userId && input.includePreferredBy) ? {
                    where: { id: userId },
                    select: {
                        id: true,
                    }
                }
                    : undefined
            },
            take: currenctTake,
            cursor: cursor,
            orderBy: input.sort
        });

        if (res.length >= currenctTake) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = { id: lastResult.id }
            }
        }
        return {
            items: res.map(r => tagResolver(r as any, userId)),
            nextCursor
        }
    }),

})


export default TagRouter;