"use client";

import { ColumnDef } from "@tanstack/react-table";



export type PublisherTableModel = {
  publisher_name: string
  bookCount: number
}



export const columns: ColumnDef<PublisherTableModel>[] = [
  {
    accessorKey: "publisher_name",
    header: "Yayınevi",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
];
