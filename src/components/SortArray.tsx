'use client'

import { appendQueryInSearchParams, cn } from '@/lib/utils'
import { type SortInput } from '@/types/SortInput'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const SortArray = ({
    inputs,
    className
}: {
    inputs: SortInput[],
    className?: string
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    
    return (
        <div className={cn([
            'flex items-center gap-2 py-1',
            className
        ])}>
            {
                inputs.map(input => (
                    <Link
                        key={nanoid()}
                        href={`${pathname}?${appendQueryInSearchParams(searchParams.toString(), { key: 'sortBy', value: input.key }, true, true)}`}
                        replace={true}
                    > <Button className='capitalize' size={'sm'} variant={(searchParams.has('sortBy', input.key) || (searchParams.getAll('sortBy').length <= 0 && input.default)) ? 'default' : 'outline'} >{input.lable}</Button>
                    </Link>
                ))
            }
        </div>
    )
}

export default SortArray