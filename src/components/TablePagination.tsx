
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PaginateOptions } from 'prisma-pagination'
import { PaginationMeta } from '@/types/PaginationMeta'

const TablePagination = ({
    paginationData,
    onPaginationChange,
    className,
    disable
}: {
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    className?: string,
    disable?: boolean
}) => {



    const handleNext = () => {
        const val = paginationData && {
            perPage: paginationData.perPage,
            page: paginationData?.next === null ? undefined : paginationData?.next
        }
        onPaginationChange?.(val);
    }
    const handlePrev = () => {
        const val = paginationData && {
            perPage: paginationData.perPage,
            page: paginationData?.prev === null ? undefined : paginationData?.prev
        }
        onPaginationChange?.(val);
    }
    return (
        <div className={cn([
            'flex justify-between ',
            className
        ])}>
            <div>
                <p className='text-gray-500 text-sm'>Total: {paginationData?.total || 0}</p>
            </div>
            <div className="flex gap-3">
                <Button  onClick={() => handlePrev()} variant={'outline'} disabled={!Boolean(paginationData?.prev) || disable}>Prev</Button>
                <Button onClick={() => handleNext()} variant={'outline'} disabled={!Boolean(paginationData?.next) || disable}>Next</Button>
            </div>
        </div>
    )
}

export default TablePagination