/* eslint-disable react/display-name */
import { CollectionOut } from '@/schema/collection-schema'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'
import { CardTitle } from '../ui/card'
import { dateFromNow } from '@/lib/utils'
import ActionButton from '../action/ActionButton'
import InfoDialog from '../InfoDialog'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { nanoid } from 'nanoid'

type CollectionCardProps = {
  collection: CollectionOut
}

const CollectionCard = ({
  collection
}: CollectionCardProps) => {

  return (
    <div className='rounded-xl overflow-hidden bg-card max-w-sm border '>
      <div className='rounded-xl overflow-hidden aspect-[4/2.5]'>
        <Image width={400} height={300} src={collection.thumbnail??''} alt='' />
      </div>

      <div className='p-3 h-16'>
        <Link href={`/${collection.id}`}><CardTitle className='line-clamp-2'>{collection.title}</CardTitle></Link>
        <span className='text-muted-foreground text-xs'>
          {dateFromNow(collection.createdAt)}
        </span>
      </div>

      <div className='flex items-center justify-between py-1'>
        <ActionButton action={'collection_like_toggle'} entityId={collection.id} defaultState={collection.liked}/>
        <ActionButton action={'collection_save_toggle'} entityId={collection.id} defaultState={collection.saved}/>
        <InfoDialog>
          <p>{collection.description}</p>
          <Separator  />
          <div className='flex gap-3 flex-wrap'>
            {
              collection.tags.map(tag => <span key={nanoid()}>#{tag.name}</span>)
            }
          </div>
        </InfoDialog>
      </div>
    </div>
  )
}

CollectionCard.Skeleton = () => {
  return (
    <div className='max-w-xs'>
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
