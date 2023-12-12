/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { api } from '@/trpc/react';
import React from 'react'
import { Switch } from '../ui/switch';
import { CollectionOut } from '@/schema/collection-schema';
import { convertNullToUndefined } from '@/lib/utils'
import { useToast } from '../ui/use-toast';

const ToggleFeatured = ({
    collection
}: {
    collection: CollectionOut
}) => {
    const [isFeaturedState, setIsFeatured] = React.useState(collection.isFeatured ?? false);
    const updateMutation = api.collection.update.useMutation();
    const { toast } = useToast()

    const toggleFeatured = async () => {
        try {
            const res = await updateMutation.mutateAsync({
                ...convertNullToUndefined({...collection, tags: collection.tags.map(tag => tag.name)}),
                isFeatured: !isFeaturedState
            })
            setIsFeatured(res.isFeatured??false);
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
            checked={isFeaturedState}
            onCheckedChange={
                (checked) => {
                    void toggleFeatured();
                }
            }
        />
    )
}

export default ToggleFeatured