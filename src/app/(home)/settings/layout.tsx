import SidebarNav from '@/components/SidebarNav'
import { Separator } from '@/components/ui/separator'
import React, { PropsWithChildren } from 'react'




  const sidebarNavItems = [
    {
      title: "Preference",
      href: "/settings",
    },
  
  ]

const SettingLayout = (props: PropsWithChildren) => {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your setting.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 mx-auto container">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{props.children}</div>
        </div>
      </div>
  )
}

export default SettingLayout