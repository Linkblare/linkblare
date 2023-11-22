/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import { api } from '@/trpc/react'
import React from 'react'
import ItemGrid from '../grid/ItemGrid'
import CollectionCard from './CollectionCard'
import { nanoid } from 'nanoid'

const ExploreCollectionLoader = () => {
    const {data, isLoading, hasNextPage, fetchNextPage} = api.collection.inifintList.useInfiniteQuery({}, {
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

export default ExploreCollectionLoader