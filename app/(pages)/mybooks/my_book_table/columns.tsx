"use client";

import TableBookImage from "@/components/table-book-image";
import { ColumnDef } from "@tanstack/react-table";
import ActionsTableCell from "./actions-table-cell";

export type MyBookTableModel = {
  book_image: string;
  reading_id: number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const columns: ColumnDef<MyBookTableModel>[] = [
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
    header: "Yazar",
  },
  {
    accessorKey: "publisher",
    header: "Yayınevi",
  },
  {
    accessorKey: "status",
    header: "Durumu",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const myBook = row.original;

      return <ActionsTableCell myBook={myBook} />;
    },
  },
];
