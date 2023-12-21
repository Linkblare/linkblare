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
import ActionButton from '@/components/action/ActionButton'
import SortArray from '@/components/SortArray'
import { itemSortInputs } from '../itemSort'
import ItemFilter from '@/components/items/ItemFilter'



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
  params: { slug: string },

}) => {
  const validateParams = ParamsSchema.safeParse(params);
  if (!validateParams.success) {
    return <ErrorView title='Something went wrong!!' />
  }

  const collection = await api.collection.getBySlug.query({ slug: params.slug })
  const categoryTags = await api.tags.infintList.query({ isCategory: true, targetCollection: collection.id, take: 100, sort: {name: 'desc'} })

  if (!collection) {
    return notFound();
  }

  return (
    <MainWrapper className=''>

      <div className='my-10'>
        <div className='flex items-end gap-2'>
          <div className="space-y-0.5 flex-1">
            <h2 className="text-2xl font-bold tracking-tight capitalize">{collection.title}</h2>
            <div className="text-muted-foreground max-w-3xl">
              <ReadMore characterCount={100}>{collection.description ?? 'No Description available'}</ReadMore>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center gap-2'>
            <ActionButton action={'collection_like_toggle'} entityId={collection.id} defaultState={collection.liked} defaultCount={collection._count.likes} />
            <ActionButton action={'collection_save_toggle'} entityId={collection.id} defaultState={collection.saved} defaultCount={collection._count.saves} />

          </div>
        </div>
        <Separator />
      </div>

      {/* <CollectionTagsCloud collectionId={collection.id} /> */}
      <div className='w-full mx-auto sticky top-5 left-0 z-20'>
        <ItemFilter
          categoryTags={categoryTags.items.map(tg => ({ value: tg.name.toLowerCase(), lable: tg.name }))}
          collectionId={collection.id}
          className='bg-card/30 backdrop-blur-md'
        />
      </div>

      <div className='py-10'>
      <RelatedCollection collectionId={collection.id} />
      </div>
      
      <ItemLoader collectionId={collection.id} include={collection.include} />
    </MainWrapper>
  )
}

export default ViewSingleCollectionPage