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
import { type CollectionOut } from '@/schema/collection-schema'
import {  useSearchParams } from 'next/navigation'


const ExploreCollectionLoader = ({
    initialData
}: {
    initialData?: {
        items: CollectionOut[],
        nextCursor: {id: number} | undefined
    }
}) => {

    const searchParams = useSearchParams();
    // console.log(searchParams.getAll('tag'))
    const {data, isLoading, hasNextPage, fetchNextPage} = api.collection.inifintList.useInfiniteQuery({filter: {tags: searchParams.has('tag') ? searchParams.getAll('tag') : undefined}}, {
        getNextPageParam: (page) => page.nextCursor,
        initialData: initialData ? {pages: [initialData], pageParams: [undefined, initialData?.nextCursor]} : undefined,
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