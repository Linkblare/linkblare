import { ItemOut, LinkContent } from '@/schema/item-schema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import ActionButton from '../action/ActionButton'
import ShareDropdown from '../utils/ShareDropdown'
import { env } from '@/env.mjs'

const LinkItemCard = ({
    item
}: {
    item: ItemOut<LinkContent>
}) => {
    return (
        <div className='bg-card border rounded-2xl overflow-hidden'>
            <div className='rounded-2xl overflow-hidden aspect-[16/9] relative'>
                <Image src={item.thumbnail ?? ''} alt={item.title} layout='fill' objectFit='cover' sizes='100vw' />
            </div>

            <div className='p-4'>
                <Link className='block' href={`/items/${item.slug}`}>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className='mt-2 text-sm line-clamp-2'>{item.shortDesc??''}</CardDescription>
                </Link>
            </div>

            <div className='flex items-center justify-between px-4 py-2'>
                <ActionButton entityId={item.id} action={'item_like_toggle'} showCount={true} defaultCount={item._count.likes} />
                <ShareDropdown
                    title={item.title}
                    url={`${env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}`}
                    image={item.thumbnail ?? ''}
                    description={item.description ?? ''}
                    tags={[...item.tags.map(tag => tag.name), 'linkblare']}
                />
            </div>
        </div>
    )
}

export default LinkItemCard