"use client";
import {
  ColumnDef,
  Row,
  SortDirection,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TableCell, TableHead, TableRow } from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useSelector } from "react-redux";

const TableComponent = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
TableComponent.displayName = "TableComponent";

const TableRowComponent = <TData,>(
  rows: Row<TData>[],
  columns?: ColumnDef<TData>
) =>
  function getTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
    const [skeletonResponse, setSkeletonResponse] = useState<boolean>(true);
  
    // @ts-expect-error data-index is a valid attribute
    const index = props["data-index"];
    const row = rows[index];

    if (!row) return null;
    const skeletonStatus = useSelector((state:any )=> state.grid)
   useEffect(()=>{
    console.log(skeletonStatus["userCollapse"])
    setSkeletonResponse(skeletonStatus["userCollapse"])
   },[skeletonStatus]);

    return (
      <>
        {skeletonResponse == true ? (
          <>
            <TableRow>
              <TableCell>
                <Skeleton className=" w-[50px] h-[78px] rounded-md block" />
              </TableCell>
              <TableCell colSpan={row.getVisibleCells().length - 1}>
                <Skeleton className=" w-full h-[20px] rounded-full block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className=" w-[50px] h-[78px] rounded-md block" />
              </TableCell>
              <TableCell colSpan={row.getVisibleCells().length - 1}>
                <Skeleton className=" w-full h-[20px] rounded-full block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className=" w-[50px] h-[78px] rounded-md block" />
              </TableCell>
              <TableCell colSpan={row.getVisibleCells().length - 1}>
                <Skeleton className=" w-full h-[20px] rounded-full block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className=" w-[50px] h-[78px] rounded-md block" />
              </TableCell>
              <TableCell colSpan={row.getVisibleCells().length - 1}>
                <Skeleton className=" w-full h-[20px] rounded-full block" />
              </TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            {...props}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        )}
      </>
    );
  };

function SortingIndicator({ isSorted }: { isSorted: SortDirection | false }) {
  if (!isSorted) return null;
  return (
    <div>
      {
        {
          asc: "↑",
          desc: "↓",
        }[isSorted]
      }
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  height: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  height,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getCoreRowModel();

  return (
    <div>
      <div className="rounded-md border">
        <TableVirtuoso
          style={{ height }}
          totalCount={rows.length}
          components={{
            Table: TableComponent,
            TableRow: TableRowComponent(rows),
          }}
          fixedHeaderContent={() =>
            table.getHeaderGroups().map((headerGroup) => (
              // Change header background color to non-transparent
              <TableRow className="bg-card hover:bg-muted" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className="flex items-center"
                          {...{
                            style: header.column.getCanSort()
                              ? {
                                  cursor: "pointer",
                                  userSelect: "none",
                                }
                              : {},
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <SortingIndicator
                            isSorted={header.column.getIsSorted()}
                          />
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))
          }
        />
      </div>
    </div>
  );
}
