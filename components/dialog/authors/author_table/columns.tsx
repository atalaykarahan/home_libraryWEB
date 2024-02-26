"use client";

import { ColumnDef } from "@tanstack/react-table";



export type AuthorTableModel = {
  author_name: string
  author_surname:string
  bookCount: number
}



export const columns: ColumnDef<AuthorTableModel>[] = [
  {
    accessorKey: "author_name",
    header: "Adı",
  },
  {
    accessorKey: "author_surname",
    header: "Soyadı",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
];
