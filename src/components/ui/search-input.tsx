/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import debounce from "lodash/debounce";

export type SearchProps = {
  delay?: number;
  onSearch?: (value: string) => void
} & InputProps;


const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSearch, delay = 500, ...props }, ref) => {

    const debouncedHandleSearch = useCallback(debounce((query: string) => {
      onSearch?.(query);
    }, delay), []);



    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border bg-card pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[16px]" />
        <input
          {...props}
          onChange={e => {
            props.onChange?.(e);
            debouncedHandleSearch(e.currentTarget.value);

          }}
          type="search"
          ref={ref}
          className="w-full bg-card p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };