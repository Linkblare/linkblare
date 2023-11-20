import MainWrapper from '@/components/MainWrapper'
import SavedCollectionLoader from '@/components/collection/SavedCollectionLoader'
import React from 'react'

const SavedCollectionPage = () => {
    
  return (
    <MainWrapper className="py-5 ">
      <SavedCollectionLoader/>
    </MainWrapper>
  )
}

export default SavedCollectionPage