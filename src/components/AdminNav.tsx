'use client'

import { useCopyMoveContext } from "@/context/CopyMoveContext"
import UserAvatarDropdown from "./UserAvatarDropdown"
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function AdminNav() {
    const { moveItems, action, setMoveItems } = useCopyMoveContext();
    return (
        <>
            <div className="flex justify-end py-2 px-3">
                <UserAvatarDropdown />
            </div>
            {
                moveItems.length > 0 && action
                    ? <div className="flex justify-between items-center py-2 px-3 border bg-card text-card-foreground border-dotted rounded-lg mx-5">
                        <p>{moveItems.length} {action}</p>
                        <Button className="ml-2" size={'icon'} onClick={() => {
                            setMoveItems([])
                        }}><X /></Button>
                    </div> : null
            }
        </>
    )
}