'use client'

import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Heart, ThumbsUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const LikeButton = ({
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

  useEffect(() => {
    console.log({state});
    
  }, [state])
  
  return (
    <Button variant={'ghost'} size={'icon'} className={className} onClick={() => onClick?.(state)}>
        <Heart className={cn([
            'w-5 h-5 ',
            {'text-red-700 fill-red-700': state}
        ])} />
    </Button>
  )
}

export default LikeButton