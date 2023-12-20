/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorView from '@/components/ErrorView';
import SingleItemViewer from '@/components/items/SingleItemViewer';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { type Metadata, type ResolvingMetadata } from 'next';
import { SingleItemOut } from '@/schema/item-schema';
import RelatedCollection from '@/components/collection/RelatedCollection';
import RelatedItems from '@/components/items/RelatedItems';


type Props = {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = params.slug

  // fetch data
  const item: SingleItemOut<any> = await api.items.getBySlug.query({ slug: slug })


  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (!item) {
    return {
      title: 'Not Found'
    }
  }
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      images: [(item.thumbnail ?? ''), ...previousImages],
      title: item.title,
      description: item.description ?? ''
    },
  }
}

const SingleItemViewPage = async ({
  params
}: {
  params?: { slug: string }
}) => {
  const validate = z.object({ slug: z.string() }).safeParse(params);
  if (!validate.success) return <ErrorView />
  const item = await api.items.getBySlug.query({ slug: params?.slug! });

  if (!item) return notFound();

  return (
    <>
      
      <div className='max-w-4xl mx-auto py-10'>
        <SingleItemViewer item={item} />
        <div></div>
      </div>

      <div className='mt-10 space-y-10'>
        <RelatedCollection collectionId={item.collectionId} />
        <RelatedItems itemId={item.id} />
      </div>
    </>
  )
}

export default SingleItemViewPage