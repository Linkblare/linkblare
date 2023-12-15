'use client'
import { api } from '@/trpc/react';
import React from 'react'
import QueryTags from '../query-tag/QueryTags';

const CollectionTagsCloud = ({
    collectionId
}: {
    collectionId: number;
}) => {
    const {data, isLoading} = api.tags.infintList.useQuery({targetCollection: collectionId});

  return (
    <div className='rounded-2xl border max-w-3xl mx-auto mb-10'>
        <QueryTags 
        className='justify-center'
        queryKey='tag'
        boxMode="container"
        queryInputs={data?.items.map(it => ({
            value: it.name,
            lable: it.name,
            toggleMode: true,
            singleMode: false,

        })) ?? []}
        loading = {isLoading}
         />
    </div>
  )
}

export default CollectionTagsCloud