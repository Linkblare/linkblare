'use client'

import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import { type CollectionOut } from '@/schema/collection-schema'
import ThumbnailGrid from './ThumbnialGrid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ShareDropdown from '../utils/ShareDropdown'
import { env } from '@/env.mjs'
import ActionButton from '../action/ActionButton'

const FeaturedCollectionCard = ({
    collection
}: {
    collection: CollectionOut
}) => {
    const router = useRouter();

    return (
        <div className='rounded-2xl border bg-card cursor-pointer' onClick={() => router.push(`/${collection.slug}`)}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5'>
                <div className='rounded-xl overflow-hidden aspect-[4/2.5]'>
                    {
                        collection.itemsImages.length > 0 ?
                            <ThumbnailGrid itemImages={collection.itemsImages} />
                            : <div className='w-full h-full relative'>
                                <Image className='w-full h-auto' fill objectFit='cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={collection.thumbnail ?? ''} alt='' />
                            </div>
                    }
                </div>

                <div className='px-4 pt-2 sm:p-5 space-y-3 relative pb-12'>
                    <CardTitle>{collection.title}</CardTitle>
                    <CardDescription className='hidden sm:block max-w-md'>{collection.description}</CardDescription>

                    <div className='absolute bottom-2 right-2 w-full flex justify-between items-center px-4'>
                        <ActionButton action={'collection_like_toggle'} entityId={collection.id} defaultState={collection.liked} defaultCount={collection._count.likes} showCount />
                        <ActionButton action={'collection_save_toggle'} entityId={collection.id} defaultState={collection.saved} defaultCount={collection._count.saves} showCount />
                        <ShareDropdown
                            title={collection.title}
                            url={`${env.NEXT_PUBLIC_SITE_URL}/${collection.slug}`}
                            image={collection.thumbnail ?? ''}
                            description={collection.description ?? ''}
                            tags={[...collection.tags.map(tag => tag.name), 'linkblare_collection']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCollectionCard