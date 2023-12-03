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
import { ItemOut } from '@/schema/item-schema'

const ItemLoader = ({
    collectionId
}: {
    collectionId?: number
}) => {
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = api.items.inifintList.useInfiniteQuery({ filter: { collectionId } }, {
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