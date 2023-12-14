/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useSearchParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component';
import GridSection from '../grid/GridSection'
import { InfinitItemListSchema } from '@/schema/item-schema'
import InifiniteItemList from '../grid/InfiniteItemList'
import useSort from '@/hooks/useSort'
import { collectionSortMap } from '@/app/(home)/collectionSort'


const ExploreCollectionLoader = ({
    initialData
}: {
    initialData?: {
        items: CollectionOut[],
        nextCursor: { id: number } | undefined
    }
}) => {

    const searchParams = useSearchParams();
    const {activeSort} = useSort(collectionSortMap)
    // console.log(searchParams.getAll('tag'))
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = api.collection.inifintList.useInfiniteQuery({
        filter: { tags: searchParams.has('tag') ? searchParams.getAll('tag') : undefined },
        sort: activeSort?.sortValue as any
    },
        {
            getNextPageParam: (page) => page.nextCursor,
            initialData: initialData ? { pages: [initialData], pageParams: [undefined, initialData?.nextCursor] } : undefined,
        })
    const items = data?.pages.reduce((acc, page) => acc.concat(page.items), [] as CollectionOut[])
    return (
        <div>
            <InifiniteItemList

                loading={isLoading}
                loader={<CollectionCard.Skeleton />}
                dataLength={items?.length ?? 0}
                fetchNextPage={fetchNextPage}
                hasMore={hasNextPage}
                refetch={refetch}
            >
                {
                    data?.pages.map(page =>
                        <GridSection key={nanoid()}>
                            {
                                page.items.map(item => (<CollectionCard key={nanoid()} collection={item} />))
                            }
                        </GridSection>
                    )
                }
            </InifiniteItemList>

        </div>
    )
}

export default ExploreCollectionLoader