'use client'
import { api } from '@/trpc/react'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Tag from './Tag'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'


const UserTagSelector = () => {
    const [selectedTags, setSelectedTags] = useState<number[]>([])
    const {data, isLoading, hasNextPage, fetchNextPage} = api.tags.infintList.useInfiniteQuery({take: 50, includePreferredBy: true}, {
        getNextPageParam: (page) => page.nextCursor
    })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Preffered Tags</CardTitle>
      </CardHeader>
      <CardContent className='max-h-96 overflow-y-auto'>
        <div className='flex flex-wrap gap-3'>
          {
            data?.pages.map(page => page.items.map(item => <Tag key={nanoid()} data={item} />))
          }
        </div>
        <div className={cn([
          'flex items-center justify-center',
          {'hidden': !hasNextPage}
        ])}>
          <Button variant={'outline'} disabled={isLoading} onClick={() => fetchNextPage()}>Load More</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserTagSelector