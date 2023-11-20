import CollectionTable from '@/components/collection/CollectionTable'
import MutateCollectionDialog from '@/components/collection/MutateCollectionDialog'
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader'
import React from 'react'

const CollectionPage = () => {
  return (
    <>
    <DashboardPageHeader title='Collections'>
      <div className='w-full h-10 flex justify-end'>
        <MutateCollectionDialog/>
      </div>
    </DashboardPageHeader>
    <div>
        <CollectionTable/>
    </div>
    </>
  )
}

export default CollectionPage