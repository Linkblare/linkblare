/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/display-name */
import { type CollectionOut } from '@/schema/collection-schema'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'
import { CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import ActionButton from '../action/ActionButton'
import InfoDialog from '../InfoDialog'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { nanoid } from 'nanoid'
import Flag from '../ui/flag'
import ThumbnailGrid from './ThumbnialGrid'
import ShareDropdown from '../utils/ShareDropdown'
import { env } from '@/env.mjs'

type CollectionCardProps = {
  collection: CollectionOut,
  mode?: 'sort' | 'full'
}



const CollectionCard = ({
  collection,
  mode = 'full'
}: CollectionCardProps) => {

  const flags = collection.tags.filter(tag => tag.isFlag);

  return (
    <div className='rounded-xl overflow-hidden bg-card max-w-full md:max-w-sm border '>
      <div className='rounded-xl overflow-hidden aspect-[4/2.5] relative'>
        {
          collection.itemsImages.length > 0 ?
            <ThumbnailGrid itemImages={collection.itemsImages} />
            : <div className='w-full h-full relative'>
              <Image className='w-full h-auto' fill objectFit='cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={collection.thumbnail ?? ''} alt='' />
            </div>
        }
        <div className=' dark:block hidden absolute inset-0 bg-gradient-to-t from-background to-transparent'></div>
      </div>

      <div className='p-3 h-16 '>
        <Link href={`/${collection.slug}`}><CardTitle className='line-clamp-2'>{collection.title}</CardTitle></Link>
        <div
          className={cn([
            'text-muted-foreground text-xs flex items-center gap-2 flex-wrap pt-1',
            { 'hidden': mode === 'sort' }
          ])}
        >
          {/* <span>{dateFromNow(collection.createdAt)}</span>
          <span>|</span> */}
          <span>{collection._count.items} items</span>

          {
            flags.length > 0 && flags.map(flag => {
              return <Flag key={nanoid()} >{flag.name}</Flag>
            })
          }
        </div>

      </div>

      <div
        className={cn([
          'flex items-center justify-between py-1 px-2',
          { 'hidden': mode === 'sort' }
        ])}
      >
        <ActionButton action={'collection_like_toggle'} entityId={collection.id} defaultState={collection.liked} defaultCount={collection._count.likes} showCount />
        <ActionButton action={'collection_save_toggle'} entityId={collection.id} defaultState={collection.saved} defaultCount={collection._count.saves} showCount />
        {/* <InfoDialog>
          <p>{collection.description}</p>
          <Separator />
          <div className='flex gap-3 flex-wrap'>
            {
              collection.tags.map(tag => <span key={nanoid()}>#{tag.name}</span>)
            }
          </div>
        </InfoDialog> */}
        <ShareDropdown
          title={collection.title}
          url={`${env.NEXT_PUBLIC_SITE_URL}/${collection.slug}`}
          image={collection.thumbnail ?? ''}
          description={collection.description ?? ''}
          tags={[...collection.tags.map(tag => tag.name), 'linkblare_collection']}
        />
      </div>
    </div>
  )
}

CollectionCard.Skeleton = () => {
  return (
    <div className='max-w-full md:max-w-xs'>
      <Skeleton className='aspect-[1.4/.8] '></Skeleton>
      <div className='py-2 space-y-1'>
        <Skeleton className='w-full h-[20px]' />
        <Skeleton className='w-1/2 h-[20px]' />
      </div>

      <div className='flex items-center justify-between'>
        <Skeleton className='w-[50px] h-[30px]' />
        <Skeleton className='w-[50px] h-[30px]' />
        <Skeleton className='w-[50px] h-[30px]' />
      </div>
    </div>
  )
}


export default CollectionCard
