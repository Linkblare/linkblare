import ErrorView from '@/components/ErrorView';
import SingleItemViewer from '@/components/items/SingleItemViewer';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import React from 'react'
import { z } from 'zod'

const SingleItemViewPage = async ({
    params
}: {
    params?: {id: string|string[]}
}) => {
    const validate = z.object({id: z.string()}).safeParse(params);
    if(!validate.success) return <ErrorView/>
    const item = await api.items.getById.query({id: parseInt(params?.id as string)});

    if(!item) return notFound()

  return (
    <div className='max-w-4xl mx-auto py-10' >
        <SingleItemViewer item={item} />
        <div></div>
    </div>
  )
}

export default SingleItemViewPage