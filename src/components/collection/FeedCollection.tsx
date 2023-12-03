/* eslint-disable react/no-unescaped-entities */
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
import UserTagSelector from '../tags/UserTagSelector'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { type InfiniteResult } from '@/schema/_helpers/WithInfinitList'
import { Tag } from '@prisma/client'
import { CollectionOut } from '@/schema/collection-schema'

const FeedCollection = ({
    initialData,
    prefferedTags
}: {
    initialData?: InfiniteResult,
    prefferedTags?: Tag[]
}) => {
    const {data, isLoading, hasNextPage, fetchNextPage, refetch, } = api.collection.feed.useInfiniteQuery({}, {
        getNextPageParam: (page) => page.nextCursor,
        initialData: initialData ? {pages: [initialData], pageParams: [undefined, initialData?.nextCursor]} : undefined
    })
    
    const router = useRouter();

    if(!prefferedTags || prefferedTags.length <= 0){
        return <div className='max-w-2xl mx-auto py-10 space-y-5'>
            <h1 className='text-4xl font-bold text-muted-foreground'>You Don&apos;t have any "Preferred Tags" Slected</h1>
            <UserTagSelector/>
            <div className='flex items-center justify-end '>
                <Button onClick={() => router.refresh()}>Generate My Feed</Button>
            </div>
        </div>
    }
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

export default FeedCollection