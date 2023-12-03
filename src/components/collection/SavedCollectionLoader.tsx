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

const SavedCollectionLoader = () => {
    const {data, isLoading, hasNextPage, fetchNextPage, refetch} = api.user.savedCollection.useInfiniteQuery({}, {
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