import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import type { ColumnFiltersState, SortingState, ColumnDef } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/table-pagination"
import DataTableFilter from "./data-table-filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enablePagination?: boolean
  hideTableInPrint?: boolean
  filterOptions?: {
    enableFilter: boolean
    filterPlaceholder: string
    filterCol: string
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterOptions,
  enablePagination = false,
  hideTableInPrint = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  })

  return (
    <div
      className={`${
        hideTableInPrint ? "print:hidden" : ""
      } rounded-lg border border-zinc-700 overflow-hidden bg-zinc-900`}
    >
      {filterOptions?.enableFilter && (
        <div className="flex w-full px-4 py-3 bg-zinc-800 border-b border-zinc-700/60">
          <DataTableFilter
            table={table}
            placeholder={filterOptions.filterPlaceholder}
            filterCol={filterOptions.filterCol}
          />
        </div>
      )}

      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-zinc-800">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`text-zinc-200 text-xs font-medium uppercase tracking-wider py-4 px-6 text-left
                    ${index === 0 ? "rounded-tl-lg" : ""}
                    ${index === headerGroup.headers.length - 1 ? "rounded-tr-lg" : ""}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="bg-zinc-900 hover:bg-zinc-800 transition-colors border-b border-zinc-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-zinc-100 text-sm py-4 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-zinc-400"
              >
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enablePagination && (
        <div className="bg-zinc-900 border-t border-zinc-700 rounded-b-lg">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
}
