
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowSelectionState,
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
  import React, { useState } from "react"
  import TablePagination from "@/components/TablePagination"
  import { type PaginateOptions } from "prisma-pagination"
  import { Button } from "@/components/ui/button"
  import Loading from "@/components/Loading"
  
  interface ContactQueryTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    onDeleteMany?: (selectedData: TData[]) => Promise<void>,
    dataLoading?: boolean
  }
  
  function DataTable<TData, TValue>({
    columns,
    data,
    paginationData,
    onPaginationChange,
    onDeleteMany,
    dataLoading
  
  }: ContactQueryTableProps<TData, TValue>) {
    const [selectedRows, setSlectedRows] = useState<RowSelectionState>({});
    const [loading, setLoading] = useState<boolean>(false)
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onRowSelectionChange: setSlectedRows,
      state: {
        rowSelection: selectedRows
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
  
    return (
      <div>
        <div className="rounded-md border">
          <div className="p-3 flex items-center  gap-5">
            <p className="text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} selected.
              {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
            </p>
            {
              table.getFilteredSelectedRowModel().rows.length > 0
              &&
              <Button disabled={loading} onClick={() => void deleteMany()} size={'sm'} variant={'destructive'}>Delete</Button>
            }
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
  