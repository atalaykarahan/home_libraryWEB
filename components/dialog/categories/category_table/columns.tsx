"use client";

import { ColumnDef } from "@tanstack/react-table";



export type CategoryTableModel = {
  category_name: string
  bookCount: number
}



export const columns: ColumnDef<CategoryTableModel>[] = [
  {
    accessorKey: "category_name",
    header: "Kategori",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
];
