"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useDebounce } from "@uidotdev/usehooks"
import { api } from "@/trpc/react"
import { CollectionOut } from "@/schema/collection-schema"



export function CollectionComboBox({
    onValueChange,
}: {
    onValueChange?: (value: CollectionOut) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const debounceSearch = useDebounce(value, 500);
    const { data: collections, isLoading } = api.collection.inifintList.useQuery({ search: debounceSearch === '' ? undefined : debounceSearch });


    const handleValueChange = (val: string) => {
        setValue(val === value ? "" : val);
        collections?.items.forEach((collection) => {
            if (collection.title === val) {
                onValueChange?.(collection);
            }
        })

    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between overflow-clip"
                    title={value}

                >
                    {value
                        ? value
                        : "Select Collection"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search collection..." className="h-9" />
                    <CommandEmpty>No Collection found.</CommandEmpty>
                    <CommandGroup>
                        {collections?.items.map((collection) => (
                            <CommandItem
                                key={collection.id}
                                value={collection.title.toLowerCase()}
                                onSelect={handleValueChange}

                            >
                                {collection.title}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === collection.title ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
