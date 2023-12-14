import MainWrapper from '@/components/MainWrapper'
import SortArray from '@/components/SortArray'
import SavedCollectionLoader from '@/components/collection/SavedCollectionLoader'
import React from 'react'
import { collectionSortMap } from '../collectionSort'

const SavedCollectionPage = () => {

  return (
    <MainWrapper>
      <div className="flex items-start gap-2 mt-2">
        <SortArray inputs={collectionSortMap} />
      </div>
      <div className="mt-5"/>
      <SavedCollectionLoader />
    </MainWrapper>
  )
}

export default SavedCollectionPage