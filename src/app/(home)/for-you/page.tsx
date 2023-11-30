import MainWrapper from '@/components/MainWrapper'
import FeedCollection from '@/components/collection/FeedCollection'
import { api } from '@/trpc/server'
import React from 'react'

const ExplorePage = async () => {
  const userPrefferedTags = await api.user.preferredTags.query({ take: 100 });
  const userFeeds = await api.collection.feed.query({});
  return (
    <MainWrapper className="py-5 ">
      <FeedCollection
        prefferedTags={userPrefferedTags.items} 
        initialData={userFeeds}
        />
    </MainWrapper>
  )
}

export default ExplorePage