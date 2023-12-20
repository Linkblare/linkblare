'use client'

import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheckIcon } from 'lucide-react'
import { cn, formatNumberInternationally } from '@/lib/utils'

const SaveButton = ({
    onClick,
    state = false,
    count,
    className,
    disabled = false,
    showCount
}: {
    onClick?: (isLiked: boolean) => void,
    state?: boolean,
    count?: number,
    className?: string,
    disabled?: boolean,
    showCount?: boolean
}) => {
  return (
    <Button disabled={disabled} variant={'ghost'} size={'icon'} className={className} onClick={() => onClick?.(state)}>
       {
        state ?
        <BookmarkCheckIcon className={cn([
            'w-7 h-7 ',
            {'fill-primary text-primary-foreground': state}
        ])} /> :
        <Bookmark className={cn([
            'w-5 h-5 ',
            {'fill-primary text-primary-foreground': state}
        ])} />
       }
       {
        showCount && <span className={cn([
          'ml-2 font-thin text-xs',
          {'text-primary-foreground': state}
         ])}>{formatNumberInternationally(count??0)}</span>
       }
    </Button>
  )
}

export default SaveButton