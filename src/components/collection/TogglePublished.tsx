/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { api } from '@/trpc/react';
import React from 'react'
import { Switch } from '../ui/switch';
import { type CollectionOut } from '@/schema/collection-schema';
import { convertNullToUndefined } from '@/lib/utils'
import { useToast } from '../ui/use-toast';

const TogglePublished = ({
    collection
}: {
    collection: CollectionOut
}) => {
    const [isPublished, setIsPublished] = React.useState(collection.isPublished ?? false);
    const updateMutation = api.collection.update.useMutation();
    const { toast } = useToast()

    const togglePublished = async () => {
        try {
            const res = await updateMutation.mutateAsync({
                ...convertNullToUndefined({...collection, tags: collection.tags.map(tag => tag.name)}),
                isPublished: !isPublished
            });
            setIsPublished(res.isPublished??false);
            toast({
                title: 'Collection updated successfully',
            })
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed to update collection',
                description: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }
    return (
        <Switch
            disabled={updateMutation.isLoading}
            checked={isPublished}
            onCheckedChange={
                (checked) => {
                    void togglePublished();
                }
            }
        />
    )
}

export default TogglePublished