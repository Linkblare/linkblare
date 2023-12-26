'use client'

import { CreateItemInput } from '@/schema/item-schema'
import { api } from '@/trpc/react'
import { CheckCircle2, Loader2, Loader2Icon, XCircle } from 'lucide-react'
import React, { useEffect } from 'react'

const MutateItem = ({
  input,
  onExecuted
}: {
  input: CreateItemInput,
  onExecuted?: (input: CreateItemInput, status: 'success' | 'error') => void
}) => {

  const { data, isLoading, isError: isFetchError, error, status } = api.items.getBySlug.useQuery({ slug: input.slug });
  const createMutation = api.items.create.useMutation();

  const Error = <div className='flex items-center gap-5 justify-center rounded-xl border bg-card p-3 border-red-500'>
    <XCircle className='w-5 h-5 text-red-500' />
    <p className='text-red-500'>Error</p>
  </div>


  const save = async () => {
    try {
      const res = await createMutation.mutateAsync(input)
      onExecuted?.(input, 'success')
    } catch (error) {
      onExecuted?.(input, 'error');
      console.log({
        inputTitle: input.title,
        error
      })
    }
  }

  useEffect(() => {
    if (status === 'success' && !data) {
      createMutation.mutate(input)
    }
  }, [data, status])


  if (isLoading) {
    return (
      <div className='flex items-center gap-5 justify-center rounded-xl border bg-card p-3'>
        <Loader2Icon className='w-5 h-5 animate-spin' />
        <p>Checking...</p>
      </div>
    )
  }

  if (isFetchError) {
    return Error
  }


  return (
    <div className='flex items-center gap-5 rounded-xl border bg-card p-3'>
      <div className='flex-1'>
        <p>{input.title}</p>
      </div>

      <div>
        {
          (createMutation.isLoading) && (
            <Loader2 className='w-5 h-5 animate-spin' />
          )
        }

        {
          ((data || createMutation.data) && !createMutation.isLoading) && (
            <CheckCircle2 className='w-5 h-5 text-green-500' />
          )
        }
      </div>
    </div>
  )
}

export default MutateItem