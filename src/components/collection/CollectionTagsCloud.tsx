/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/trpc/react';
import React from 'react'
import QueryTags from '../query-tag/QueryTags';
import { nanoid } from 'nanoid';
import { type TagOut } from '@/schema/tag-schema';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const CollectionTagsCloud = ({
  collectionId,
  className
}: {
  collectionId: number;
  className?: string
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = api.tags.infintList.useInfiniteQuery({ targetCollection: collectionId, sort: { name: 'asc' }, take: 100 }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
  const items = data?.pages.reduce((acc, page) => acc.concat(page.items), [] as TagOut[])
  return (
    <div className={cn([
      '',
      className
    ])}>

        <QueryTags
          key={nanoid()}
          className='justify-center max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary'
          queryKey='tag'
          boxMode="container"
          removable
          queryInputs={items?.map(it => ({
            value: it.name,
            lable: it.name,
            toggleMode: true,
            singleMode: false,
          })) ?? []}
          loading={isLoading}
          hasNext={hasNextPage}
          fetchNext={fetchNextPage}
        />
      
      

    </div>
  )
}

export default CollectionTagsCloud