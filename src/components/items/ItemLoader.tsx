/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { api } from '@/trpc/react'
import React from 'react'
import ItemGrid from '../grid/ItemGrid'
import ItemCard from './ItemCard'
import { nanoid } from 'nanoid'
import { type ItemOut } from '@/schema/item-schema'
import { useItemSort } from '@/hooks/useItemSort'

const ItemLoader = ({
    collectionId,
    include
}: {
    collectionId?: number,
    include?: string[]  // This param is for including extra items with these tags
}) => {
    const {activeSort} = useItemSort();
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = api.items.inifintList.useInfiniteQuery({ 
        filter: { collectionId, tags: include, collectionInclude: true } ,
        sort: activeSort?.sortValue as any
    }, {
        getNextPageParam: (page) => page.nextCursor
    })
    return (
        <div>
            <ItemGrid
                className='items-center justify-center'
                loading={isLoading}
                loader={<ItemCard.Skeleton />}
                dataLength={data?.pages.reduce((acc, page) => acc.concat(page.items), [] as ItemOut[])?.length ?? 0}
                fetchNextPage={fetchNextPage}
                hasMore={hasNextPage}
                refetch={refetch}
            >
                {
                    data?.pages.map(page => page.items.map(item => <ItemCard item={item} key={nanoid()} />))
                }
            </ItemGrid>
        </div>
    )
}

export default ItemLoader