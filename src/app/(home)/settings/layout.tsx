import SidebarNav from '@/components/SidebarNav'
import { Separator } from '@/components/ui/separator'
import React, { type PropsWithChildren } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


const SettingLayout = (props: PropsWithChildren) => {
  return (
    <div className=" space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your setting.
        </p>
      </div>
      <Separator className="my-6" />
      <Tabs defaultValue="preference" className=''>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preference">Preference</TabsTrigger>
        </TabsList>
        {props.children}
      </Tabs>
    </div>
  )
}

export default SettingLayout