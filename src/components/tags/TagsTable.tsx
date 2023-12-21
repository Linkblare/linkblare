/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { api } from '@/trpc/react';
import { type ColumnDef } from '@tanstack/react-table';
import { type PaginateOptions } from 'prisma-pagination';
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox';
import { type TagOut } from '@/schema/tag-schema';
import TagFlagUpdate from './TagFlagUpdate';
import DataTable from '../DataTable';
import TagCategoryUpdate from './TagCategoryUpdate';

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
        accessorKey: 'isFlag',
        header: 'Use As Flag',
        cell({ row }) {
            return <TagFlagUpdate data={row.original} />
        }
    },
    {
        accessorKey: 'isCategory',
        header: 'Use as Category',
        cell({ row }) {
            return <TagCategoryUpdate data={row.original} />
        }
    },
]

const TagsTable = () => {
    const [pagination, setPagination] = useState<PaginateOptions>();
    const [search, setSearch] = useState<string | undefined>()
    const {data, isLoading} = api.tags.list.useQuery({ pagination, search })


    return (
        <DataTable
            onSearch={s => {
                console.log({search: s});
                setSearch(s);
            }}
            columns={columns}
            dataLoading={isLoading}
            data={data?.data ?? []}
            paginationData={data?.meta}
            onPaginationChange={data => setPagination(data)}
        />
    )
}

export default TagsTable