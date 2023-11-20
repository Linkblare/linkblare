import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import TagsTable from '@/components/tags/TagsTable';
import { api } from '@/trpc/server'
import { PaginationMeta } from '@/types/PaginationMeta';
import { PaginateOptions } from 'prisma-pagination';
import React, { useState } from 'react'

const TagsPage = async () => {
    

  return (
    <>
    <DashboardPageHeader title="Tags" />
    <TagsTable/>
    </>
  )
}

export default TagsPage