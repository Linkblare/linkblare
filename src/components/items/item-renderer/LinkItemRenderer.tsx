import { LinkContent } from '@/schema/item-schema'
import React from 'react'
import Image from 'next/image'

const LinkItemRenderer = ({
    thumbnail,
    content
}: {
    thumbnail?: string|null
    content: LinkContent
}) => {
  return (
    <div className='w-full h-full bg-slate-400 relative'>
      {
        thumbnail && <Image src={thumbnail}  alt="" fill objectFit='cover' objectPosition='center' />
      }
    </div>
  )
}

export default LinkItemRenderer