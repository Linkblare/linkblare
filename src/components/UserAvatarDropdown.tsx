'use client'

import {LogOut, Settings2 } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { convertNullToUndefined } from "@/lib/utils"
import { signOut, useSession, } from "next-auth/react"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

const UserAvatarDropdown =  () => {
    const {data:session} = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="cursor-pointer shadow ring-2 w-8 h-8 hover:ring-4 transition-all   ring-green-700">
                        <AvatarImage src={convertNullToUndefined(session?.user.image) as string}></AvatarImage>
                        <AvatarFallback >{convertNullToUndefined(session?.user.name?.charAt(0))}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user.name}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/settings" className="flex items-center gap-1">
                        <span><Settings2 className="w-4 h-4"/></span>
                        <span>Setting</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ThemeToggle/>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatarDropdown;