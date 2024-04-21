"use client";

import TableBookImage from "@/components/table-book-image";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import EventEmitter from "events";
import { PiArrowsDownUp } from "react-icons/pi";
import ActionsTableCell from "./actions-table-cell";

export type BookTableModel = {
  book_image: string;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const eventEmitter = new EventEmitter();
export const columns: ColumnDef<BookTableModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return <TableBookImage bookImage={book.book_image} />;
    },
  },
  {
    accessorKey: "book_title",
    header: "Kitap",
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yazar
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yayınevi
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durumu
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const selectedBook = row.original;

      return <ActionsTableCell selectedBook={selectedBook} />;
    },
  },
];
