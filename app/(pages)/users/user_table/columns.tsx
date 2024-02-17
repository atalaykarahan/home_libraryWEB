"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BookTableModel = {
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const columns: ColumnDef<BookTableModel>[] = [
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
];
