import { BoxesIcon, LayoutDashboard, LayoutListIcon, MonitorStop, SettingsIcon, TagsIcon } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { nanoid } from 'nanoid'
import { ListBulletIcon } from "@radix-ui/react-icons";

const links = [
    {
        lable: 'Dashboard',
        link: '/admin',
        icon: <LayoutDashboard />
    },
    {
        lable: 'Collections',
        link: '/admin/collection',
        icon: <BoxesIcon />
    },
    {
        lable: 'Items',
        link: '/admin/items',
        icon: <LayoutListIcon />
    },
    {
        lable: 'Tags',
        link: '/admin/tags',
        icon: <TagsIcon />
    },
    {
        lable: 'Item Bullet',
        link: '/admin/bullet/item',
        icon: <ListBulletIcon />
    },
    {
        lable: 'Settings',
        link: '/admin/settings',
        icon: <SettingsIcon />
    },
];


const AdminSidebar = () => {
    return (
        <>
            <aside id="sidebar" className="fixed hidden z-40  h-full top-0 left-0 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
                <div className="relative flex-1 flex flex-col min-h-0 border-r  pt-0">
                    <div className="p-4">
                        <Link href={'/'}><Logo /></Link>
                    </div>
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 b divide-y space-y-1">
                            <ul className="space-y-2 pb-2">
                                {
                                    links.map(link => {
                                        return (
                                            <li key={nanoid()}>
                                                <SidebarLink link={link.link} icon={link.icon}>{link.lable}</SidebarLink>
                                            </li>
                                        )
                                    })
                                }

                            </ul >
                        </div >
                    </div >
                </div >
            </aside >

            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
        </>
    )
}

export default AdminSidebar