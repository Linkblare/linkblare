import UserTagSelector from '@/components/tags/UserTagSelector'
import {  TabsContent } from '@/components/ui/tabs'
import React from 'react'

const SettingsPage = () => {
  return (
    <TabsContent value='preference'>
      <UserTagSelector />
    </TabsContent>

  )
}

export default SettingsPage