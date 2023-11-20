import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = ({
    className
}: {
    className?: string
}) => {
    return (
        <Loader2Icon
            className={cn([
                'w-6 h-6 animate-spin text-primary',
                className
            ])}
        />
    )
}

export default Loading