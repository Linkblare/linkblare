
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import ItemTable from '@/components/items/ItemTable';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const ItemsPage = ({
    params,
    searchParams
}: {
    params: { id?: string },
    searchParams?: Record<string, string | string[] | undefined>
}) => {
    const collectionId = searchParams?.collectionId;

    return (
        <>
            <DashboardPageHeader title='Items'>
                <div className="w-full flex justify-end">
                    <Link href={{ pathname: `/admin/items/mutate`, query: { collectionId } }} className={cn([
                        buttonVariants(),
                        {'hidden': !collectionId}
                    ])}>
                        <Plus /> <span>New</span>
                    </Link>
                </div>
            </DashboardPageHeader>
            <div>
                <ItemTable collectionId={(collectionId && typeof collectionId === 'string') ? parseInt(collectionId) : undefined} />
            </div>
        </>
    )
}

export default ItemsPage