import React from 'react'
import BmcButton from './BmcButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { Github } from 'lucide-react'

const PinnedWidget = () => {
    return (
        <div className='fixed top-1/2 left-0 border bg-card/20 backdrop-blur p-1 flex flex-col items-center gap-2'>
            <div><BmcButton /></div>
            <div><Link
                className={cn([buttonVariants({ variant: 'outline' })])}
                href={'https://github.com/Linkblare/linkblare'}
            ><Github /></Link></div>
        </div>
    )
}

export default PinnedWidget