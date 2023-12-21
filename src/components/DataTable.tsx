
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { type PaginationMeta } from "@/types/PaginationMeta"
import React, { useEffect, useState } from "react"
import TablePagination from "@/components/TablePagination"
import { type PaginateOptions } from "prisma-pagination"
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading"
import { useCopyMoveContext } from "@/context/CopyMoveContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Copy, Move, Scissors, Trash2 } from "lucide-react"
import { Search } from "./ui/search-input"
import { useDebounce } from "@uidotdev/usehooks"

interface ContactQueryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  paginationData?: PaginationMeta,
  onPaginationChange?: (value?: PaginateOptions) => void,
  onDeleteMany?: (selectedData: TData[]) => Promise<void>,
  dataLoading?: boolean,
  onCopy?: () => void,
  onMove?: () => void,
  onSearch?: (search: string) => void
  searchable?: boolean
}

function DataTable<TData, TValue>({
  columns,
  data,
  paginationData,
  onPaginationChange,
  onDeleteMany,
  dataLoading,
  onSearch,
  searchable = true

}: ContactQueryTableProps<TData, TValue>) {
  const [selectedRows, setSlectedRows] = useState<RowSelectionState>({});
  const [loading, setLoading] = useState<boolean>(false)
  const { moveItems, setMoveItems, action, setAction } = useCopyMoveContext();
  const [search, setSearch] = useState<string>('');


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setSlectedRows,
    onGlobalFilterChange: setSearch,
    state: {
      rowSelection: selectedRows,
      globalFilter: search
    }
  })


  async function deleteMany() {
    const data = table.getFilteredSelectedRowModel().rows.map(t => t.original);
    if (!onDeleteMany || data.length <= 0) return;
    setLoading(true);
    await onDeleteMany?.(table.getFilteredSelectedRowModel().rows.map(t => t.original));
    setLoading(false)
    table.resetRowSelection(false);
  }

  const handleCopy = (data: TData[]) => {
    setMoveItems(data);
    setAction('copy');
  }

  const handleMove = (data: TData[]) => {
    setMoveItems(data);
    setAction('move');
  }

  const handleSearch = (search: string) => {
    onSearch?.(search);
  }


  useEffect(() => {
    if (moveItems.length <= 0) {
      setSlectedRows({});
      table.resetRowSelection(false);
    }
  }, [moveItems])

  return (
    <div>
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-3">
          <div className=" flex items-center  gap-5">
            <p className="text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} selected.
              {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
            </p>
            {
              table.getFilteredSelectedRowModel().rows.length > 0
              &&
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'}>Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Button disabled={loading} onClick={() => void deleteMany()} size={'sm'} variant={'destructive'} className="w-full space-x-2">
                        <span><Trash2 className="w-4 h-4" /></span>
                        <span>Delete</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button className="w-full space-x-2 justify-start" disabled={loading ?? moveItems.length <= 0} onClick={() => handleCopy(table.getFilteredSelectedRowModel().rows.map(t => t.original))} variant={'secondary'} size={'sm'} >
                        <span><Copy className="w-4 h-4" /></span>
                        <span>Copy</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button className="w-full space-x-2 justify-start" disabled={loading ?? moveItems.length <= 0} onClick={() => handleMove(table.getFilteredSelectedRowModel().rows.map(t => t.original))} variant={'secondary'} size={'sm'} >
                        <span><Scissors className="w-4 h-4" /></span>
                        <span>Cut</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>

                </DropdownMenu>



              </div>
            }
          </div>


          {/* SEARCH */}
          <div>
            {
              searchable && <Search
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
              placeholder="Search"
              onSearch={handleSearch}
            />
            }
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) :
              dataLoading
                ?
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 flex w-full  items-center justify-center">
                    <Loading />
                  </TableCell>
                </TableRow>

                :
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <TablePagination disable={table.getFilteredSelectedRowModel().rows.length > 0} paginationData={paginationData} onPaginationChange={onPaginationChange} />
      </div>
    </div>
  )
}


export default DataTable;
