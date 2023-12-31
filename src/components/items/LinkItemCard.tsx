import { ItemOut, LinkContent } from '@/schema/item-schema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import ActionButton from '../action/ActionButton'
import ShareDropdown from '../utils/ShareDropdown'
import { env } from '@/env.mjs'
import Tag from '../tags/Tag'
import { nanoid } from 'nanoid'

const LinkItemCard = ({
    item
}: {
    item: ItemOut<LinkContent>
}) => {
    return (
        <div className='bg-card border rounded-2xl overflow-hidden'>
            <div className='rounded-2xl overflow-hidden aspect-[16/9] relative'>
                <Image src={item.thumbnail ?? ''} alt={item.title} layout='fill' objectFit='cover' sizes='100vw' />
                <div className=' dark:block hidden absolute inset-0 bg-gradient-to-t from-background to-transparent'></div>
            </div>

            <div className='p-4 pb-0 flex gap-2 flex-col'>
                <div className='flex-1'>
                    <Link className='block' href={`/items/${item.slug}`}>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className='mt-2 text-sm line-clamp-2'>{item.shortDesc ?? ''}</CardDescription>
                    </Link>
                </div>

                <div className=''>
                    {
                        item.tags.map(tg => {
                            if (tg.isFlag) {
                                return (
                                    <span key={nanoid()} className='rounded-full border bg-card text-card-foreground text-xs px-2 py-1 mr-1'>
                                        {tg.name}
                                    </span>
                                )
                            }
                        })
                    }
                </div>
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