/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'


import { type ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import DataTable from '../DataTable'
import { api } from '@/trpc/react'
import { type PaginateOptions } from 'prisma-pagination'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'
import { type SingleItemOut } from '@/schema/item-schema'
import CollectionViewerSheet from '../collection/CollectionViewerSheet'
import DeleteItemButton from './DeleteItemButton'



const columns: ColumnDef<SingleItemOut>[] = [
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
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'Collection',
        header: 'Collection',
        cell({row}){
            return <div>
                <CollectionViewerSheet 
                collectionId={row.original.Collection.id}
                trigger={<Button variant={'link'}>{row.original.Collection.title}</Button>}
                />
            </div>
        }
    },

    {
        accessorKey: 'type',
        header: 'Item Type',
        cell({ row }) {
            return <div className='flex items-center'>
                <span>{row.original.type}</span>
            </div>
        }
    },
    {
        accessorKey: '_count.likes',
        header: 'Total Likes',
        cell({ row }) {
            return row.original._count.likes
        }
    },
    
    {
        header: 'Action',
        cell({ row }) {
            return <div className='flex items-center gap-2'>
                <Link href={`/admin/items/mutate/${row.original.id}`}>
                    <Button size={'icon'}><Edit/></Button>
                </Link>

                <DeleteItemButton
                    itemId={row.original.id}
                />

            </div>
        }
    }
]

const ItemTable = ({
    collectionId
}: {
    collectionId?: number
}) => {
    const [pagination, setPagination] = useState<PaginateOptions>()
    const [search, setSearch] = useState<string>()
    const { data, isLoading } = api.items.list.useQuery({ pagination, filter: {collectionId}, search })
    return (
        <DataTable
            columns={columns}
            dataLoading={isLoading}
            data={data?.data ?? []}
            paginationData={data?.meta}
            onPaginationChange={data => setPagination(data)}
            onSearch={setSearch}
        />
    )
}

export default ItemTable