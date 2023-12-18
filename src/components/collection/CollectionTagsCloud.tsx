/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/trpc/react';
import React from 'react'
import QueryTags from '../query-tag/QueryTags';
import InifiniteItemList from '../grid/InfiniteItemList';
import { nanoid } from 'nanoid';
import { Skeleton } from '../ui/skeleton';

const CollectionTagsCloud = ({
  collectionId
}: {
  collectionId: number;
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = api.tags.infintList.useInfiniteQuery({ targetCollection: collectionId }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
  const items = data?.pages.reduce((acc, page) => acc.concat(page.items), [] as any[])
  return (
    <div className='rounded-2xl border max-w-3xl mx-auto mb-10'>
      <InifiniteItemList

                loading={isLoading}
                loader={<Skeleton className='h-10 w-full' />}
                dataLength={items?.length ?? 0}
                fetchNextPage={fetchNextPage}
                hasMore={hasNextPage}
                refetch={refetch}
            >
                {
                    data?.pages.map(page =>
                      <QueryTags
                      key={nanoid()}
                      className='justify-center'
                      queryKey='tag'
                      boxMode="container"
                      queryInputs={page.items.map(it => ({
                        value: it.name,
                        lable: it.name,
                        toggleMode: true,
                        singleMode: false,
              
                      })) ?? []}
                      loading={isLoading}
                    />
                    )
                }
            </InifiniteItemList>
    </div>
  )
}

export default CollectionTagsCloud