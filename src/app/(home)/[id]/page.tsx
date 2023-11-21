import ErrorView from '@/components/ErrorView'
import MainWrapper from '@/components/MainWrapper'
import ItemLoader from '@/components/items/ItemLoader'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import React from 'react'
import { z } from 'zod'
import { type Metadata, type ResolvingMetadata } from 'next';
import { type SingleCollectionOut } from '@/schema/collection-schema'

const ParamsSchema = z.object({
    id: z.string()
})

 
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
  const collection:SingleCollectionOut = await api.collection.getById.query({id: parseInt(id)})
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
 
  if(!collection){
    return {
      title: 'Not Found'
    }
  }
  return {
    title: collection.title,
    description: collection.description,
    openGraph: {
      images: [(collection.thumbnail??''), ...previousImages],
      title: collection.title,
      description: collection.description??''
    },
  }
}

const ViewSingleCollectionPage = async ({
    params
}: {
    params: { id: string | string[] }
}) => {
    const validateParams = ParamsSchema.safeParse(params);
    if(!validateParams.success){
        return <ErrorView title='Something went wrong!!' />
    }

    const collection = await api.collection.getById.query({id: parseInt(params.id as string)})

    if(!collection){
        return notFound();
    }

    return (
        <MainWrapper className='py-5'>
            <ItemLoader collectionId={parseInt(params.id as string)} />
        </MainWrapper>
    )
}

export default ViewSingleCollectionPage