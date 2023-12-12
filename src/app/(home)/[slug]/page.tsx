/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ErrorView from '@/components/ErrorView'
import MainWrapper from '@/components/MainWrapper'
import ItemLoader from '@/components/items/ItemLoader'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import React from 'react'
import { z } from 'zod'
import { type Metadata, type ResolvingMetadata } from 'next';
import { type SingleCollectionOut } from '@/schema/collection-schema'
import { Separator } from '@/components/ui/separator'
import ReadMore from '@/components/ReadMore'
import RelatedCollection from '@/components/collection/RelatedCollection'


const ParamsSchema = z.object({
  slug: z.string()
})


type Props = {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {


  // fetch data
  const collection: SingleCollectionOut = await api.collection.getBySlug.query({ slug: params.slug })

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (!collection) {
    return {
      title: 'Not Found'
    }
  }
  return {
    title: collection.title,
    description: collection.description,
    openGraph: {
      images: [(collection.thumbnail ?? ''), ...previousImages],
      title: collection.title,
      description: collection.description ?? ''
    },
  }
}

const ViewSingleCollectionPage = async ({
  params
}: {
  params: { slug: string }
}) => {
  const validateParams = ParamsSchema.safeParse(params);
  if (!validateParams.success) {
    return <ErrorView title='Something went wrong!!' />
  }

  const collection = await api.collection.getBySlug.query({ slug: params.slug })

  if (!collection) {
    return notFound();
  }

  return (
    <MainWrapper className='py-5'>
      <div className='mt-5 mb-10'>
        <div className="space-y-0.5 ">
          <h2 className="text-2xl font-bold tracking-tight capitalize">{collection.title}</h2>
          <div className="text-muted-foreground max-w-3xl">
            <ReadMore characterCount={100}>{collection.description ?? 'No Description available'}</ReadMore>
          </div>
        </div>
        <Separator />
      </div>
      <RelatedCollection collectionId={collection.id} />
      <Separator className='my-10'/>
      <ItemLoader collectionId={collection.id} include={collection.include} />
    </MainWrapper>
  )
}

export default ViewSingleCollectionPage