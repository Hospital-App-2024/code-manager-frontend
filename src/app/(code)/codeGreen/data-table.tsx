"use client";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { Meta } from "@/interfaces/codeGreen.interface";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: Meta;
  pagination: {
    page: number;
    take: number;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  pagination,
}: DataTableProps<TData, TValue>) {


  const setPagination = (): PaginationState => {
     return {
        pageIndex: pagination.page,
        pageSize: pagination.take,
     }
     
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.take,
      },
    },
    onPaginationChange: setPagination,
    rowCount: meta.total,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

       <div className="flex items-center justify-end space-x-2 py-4 px-2">
          <div className="flex-1 text-sm text-muted-foreground">
          </div>
          <div className="space-x-2">
            {" "}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
    </div>
  );
}
