'use client'

import UserAvatarDropdown from "./UserAvatarDropdown"

export default function AdminNav() {
    return (
        <div className="flex justify-end py-2 px-3">
            <UserAvatarDropdown />
        </div>
    )
}