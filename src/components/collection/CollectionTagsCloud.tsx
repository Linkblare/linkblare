/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/trpc/react';
import React from 'react'
import QueryTags from '../query-tag/QueryTags';
import InifiniteItemList from '../grid/InfiniteItemList';
import { nanoid } from 'nanoid';
import { Skeleton } from '../ui/skeleton';
import { TagOut } from '@/schema/tag-schema';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const CollectionTagsCloud = ({
  collectionId
}: {
  collectionId: number;
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = api.tags.infintList.useInfiniteQuery({ targetCollection: collectionId, sort: { name: 'asc' }, take: 10 }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
  const items = data?.pages.reduce((acc, page) => acc.concat(page.items), [] as TagOut[])
  return (
    <div className={cn([
      'rounded-2xl border max-w-3xl mx-auto mb-10 relative bg-card ',
      {'pb-14': hasNextPage}
    ])}>

      
        <QueryTags
          key={nanoid()}
          className='justify-center max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary'
          queryKey='tag'
          boxMode="container"
          queryInputs={items?.map(it => ({
            value: it.name,
            lable: it.name,
            toggleMode: true,
            singleMode: false,

          })) ?? []}
          loading={isLoading}
        />
      

      {
        hasNextPage && <div className='absolute bottom-0 left-0 w-full flex items-center justify-center'>
        <Button disabled={isLoading} onClick={() => void fetchNextPage()}>Load More</Button>
      </div>
      }

    </div>
  )
}

export default CollectionTagsCloud