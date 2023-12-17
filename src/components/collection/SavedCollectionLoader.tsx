/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { api } from '@/trpc/react'
import React from 'react'
import ItemGrid from '../grid/ItemGrid'
import CollectionCard from './CollectionCard'
import { nanoid } from 'nanoid'
import { CollectionOut } from '@/schema/collection-schema'
import { useCollectionSort } from '@/hooks/useCollectionSort'

const SavedCollectionLoader = () => {
    const {activeSort} = useCollectionSort();
    const {data, isLoading, hasNextPage, fetchNextPage, refetch} = api.user.savedCollection.useInfiniteQuery({
        sort: activeSort?.sortValue as any,
    }, {
        getNextPageParam: (page) => page.nextCursor
    })
  return (
    <div>
        <ItemGrid 
        dataLength={data?.pages.reduce((acc, page) => acc.concat(page.items), [] as CollectionOut[])?.length ?? 0}
        hasMore={hasNextPage}
        fetchNextPage={fetchNextPage}
        refetch={refetch} 
        className='items-center justify-center' 
        loading={isLoading} 
        loader={<CollectionCard.Skeleton/>}>
            {
                data?.pages.map(page => page.items.map(item => <CollectionCard collection={item} key={nanoid()} />))
            }
        </ItemGrid>
    </div>
  )
}

export default SavedCollectionLoader