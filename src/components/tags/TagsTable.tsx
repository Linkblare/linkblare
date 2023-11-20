'use client'

import { api } from '@/trpc/react';
import { ColumnDef } from '@tanstack/react-table';
import { PaginateOptions } from 'prisma-pagination';
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox';
import { TagOut } from '@/schema/tag-schema';

const columns: ColumnDef<TagOut>[] = [
    {
        id: "select",
        accessorKey: 'id',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'name',
        header: 'Tag Name',
    },
   
    
    {
        header: 'Action',
        // cell({ row }) {
        //     return <div className='flex items-center gap-2'>
        //         <Link href={`/admin/items/mutate/${row.original.id}`}>
        //             <Button size={'icon'}><Edit/></Button>
        //         </Link>

        //         <DeleteItemButton
        //             itemId={row.original.id}
        //         />

        //     </div>
        // }
    }
]

const TagsTable = () => {
    const [pagination, setPagination] = useState<PaginateOptions>();
    const [search, setSearch] = useState<string|undefined>()
    const data = api.tags.list.useQuery({pagination, search})


  return (
    <div>TagsTable</div>
  )
}

export default TagsTable