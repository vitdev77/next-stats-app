"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // state: {
    //   sorting,
    // },
    initialState: {
      sorting: [
        {
          id: "date",
          desc: true, // sort by date in descending order by default
        },
      ],
    },
  });

  return (
    <>
      <div className="flex items-center justify-end gap-1 py-4">
        {/* <Button
          variant="outline"
          size={"sm"}
          className={
            !table.getCanPreviousPage()
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft /> Prev
        </Button>
        <Button
          variant="outline"
          size={"sm"}
          className={
            !table.getCanNextPage() ? "cursor-not-allowed" : "cursor-pointer"
          }
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <IconChevronRight />
        </Button> */}
        <Button
          variant={"outline"}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronsLeft />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft /> Prev
        </Button>
        <Button
          variant={"outline"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <IconChevronRight />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <IconChevronsRight />
        </Button>
        {/* {table.getCanPreviousPage() && (
          <Button
            variant="outline"
            size={"sm"}
            className={"cursor-pointer"}
            onClick={() => table.previousPage()}
          >
            <IconChevronLeft /> Prev
          </Button>
        )}
        {table.getCanNextPage() && (
          <Button
            variant="outline"
            size={"sm"}
            className={"cursor-pointer"}
            onClick={() => table.nextPage()}
          >
            Next <IconChevronRight />
          </Button>
        )} */}
        {/* <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select> */}
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(val) => {
            table.setPageSize(Number(val));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent align="end">
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toPrecision()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md border">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
