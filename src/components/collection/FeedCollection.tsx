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

const FeedCollection = () => {
    const {data, isLoading, hasNextPage, fetchNextPage} = api.collection.feed.useInfiniteQuery({}, {
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

export default FeedCollection