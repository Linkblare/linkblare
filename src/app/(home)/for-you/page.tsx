import MainWrapper from '@/components/MainWrapper'
import SortArray from '@/components/SortArray'
import FeedCollection from '@/components/collection/FeedCollection'
import { api } from '@/trpc/server'
import React from 'react'
import { collectionSortMap } from '../collectionSort'

const ExplorePage = async () => {
  const userPrefferedTags = await api.user.preferredTags.query({ take: 100 });
  const userFeeds = await api.collection.feed.query({});
  return (
    <MainWrapper>
      <div className="flex items-start gap-2 mt-2">
        <SortArray inputs={collectionSortMap} />
      </div>
      <div className="mt-5"/>
      <FeedCollection
        prefferedTags={userPrefferedTags.items} 
        initialData={userFeeds}
        />
    </MainWrapper>
  )
}

export default ExplorePage