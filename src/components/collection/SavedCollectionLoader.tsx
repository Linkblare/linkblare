'use client'

import { api } from '@/trpc/react'
import React from 'react'
import ItemGrid from '../grid/ItemGrid'
import CollectionCard from './CollectionCard'
import { nanoid } from 'nanoid'

const SavedCollectionLoader = () => {
    const {data, isLoading, hasNextPage, fetchNextPage} = api.user.savedCollection.useInfiniteQuery({}, {
        getNextPageParam: (page) => page.nextCursor
    })
  return (
    <div>
        <ItemGrid className='items-center justify-center' bottomLoading loading={isLoading} loader={<CollectionCard.Skeleton/>}>
            {
                data?.pages.map(page => page.items.map(item => <CollectionCard collection={item} key={nanoid()} />))
            }
        </ItemGrid>
    </div>
  )
}

export default SavedCollectionLoader