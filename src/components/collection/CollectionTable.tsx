/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CollectionOut } from '@/schema/collection-schema'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import DataTable from '../DataTable'
import { api } from '@/trpc/react'
import { PaginationMeta } from '@/types/PaginationMeta'
import { PaginateOptions } from 'prisma-pagination'
import { Button } from '../ui/button'
import { Edit3Icon } from 'lucide-react'
import MutateCollectionDialog from './MutateCollectionDialog'
import DeleteCollection from './DeleteCollection'
import CollectionViewerSheet from './CollectionViewerSheet'


const columns: ColumnDef<CollectionOut>[] = [
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
        cell({ row }) {
            return <div className="">
                <CollectionViewerSheet
                trigger={<Link href={`#`} >{row.original.title}</Link>}
                collection={row.original}
                />
            </div>
        }
    },

    {
        accessorKey: '_count.items',
        header: 'Total Items',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <span>{row.original._count.items}</span>
                <Link href={{pathname: `./items`, query: {collectionId: row.original.id}}}><Button variant={'outline'} size={'sm'}>Items</Button></Link>
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
        accessorKey: '_count.saves',
        header: 'Total Saves',
        cell({ row }) {
            return row.original._count.saves
        }
    },
    {
        header: 'Action',
        cell({ row }) {
            return <div className='flex items-center gap-2'>
                <MutateCollectionDialog
                    data={row.original}
                    trigger={<Button variant={'ghost'}><Edit3Icon className='w-5 h-5' /></Button>}
                />

                <DeleteCollection
                    collectionId={row.original.id}
                />

            </div>
        }
    }
]

const CollectionTable = () => {
    const [pagination, setPagination] = useState<PaginateOptions>()
    const { data, isLoading } = api.collection.list.useQuery({ pagination })
    return (
        <DataTable
            columns={columns}
            dataLoading={isLoading}
            data={data?.data ?? []}
            paginationData={data?.meta}
            onPaginationChange={data => setPagination(data)}
        />
    )
}

export default CollectionTable