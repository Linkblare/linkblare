/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorView from '@/components/ErrorView';
import SingleItemViewer from '@/components/items/SingleItemViewer';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { type Metadata, type ResolvingMetadata } from 'next';
import { SingleItemOut } from '@/schema/item-schema';


type Props = {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const id = params.id
 
  // fetch data
  const item:SingleItemOut<any> = await api.items.getById.query({id: parseInt(id)})
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
 
  if(!item){
    return {
      title: 'Not Found'
    }
  }
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      images: [(item.thumbnail??''), ...previousImages],
      title: item.title,
      description: item.description??''
    },
  }
}

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