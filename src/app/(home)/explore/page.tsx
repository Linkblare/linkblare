import MainWrapper from '@/components/MainWrapper'
import ExploreCollectionLoader from '@/components/collection/ExploreCollectionLoader'
import React from 'react'

const ExplorePage = () => {
  return (
    <MainWrapper className="py-5 ">
      <ExploreCollectionLoader/>
    </MainWrapper>
  )
}

export default ExplorePage