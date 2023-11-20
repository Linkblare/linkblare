'use client'

import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const SaveButton = ({
    onClick,
    state = false,
    count,
    className
}: {
    onClick?: (isLiked: boolean) => void,
    state?: boolean,
    count?: number|string,
    className?: string
}) => {
  return (
    <Button variant={'ghost'} size={'icon'} className={className} onClick={() => onClick?.(state)}>
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
    </Button>
  )
}

export default SaveButton