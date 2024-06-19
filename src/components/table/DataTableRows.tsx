import React from 'react';
import { flexRender, Table } from '@tanstack/react-table'; // Assuming you're using @tanstack/react-table
import { TableCell, TableRow } from '../ui/table';

interface DataTableProps {
    table: Table<any>;
    columnsLength: number;
}


export const DataTableRows = ({ columnsLength, table }: DataTableProps) => {
  return (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() ? "selected" : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className='min-w-52'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
