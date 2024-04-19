"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsTableCell from "./actions-table-cell";

export type CategoryTableModel = {
  category_id: string;
  category_name: string;
  bookCount: number;
};

export const columns: ColumnDef<CategoryTableModel>[] = [
  {
    accessorKey: "category_name",
    header: "Kategori",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <ActionsTableCell category={category} />;
    },
  },
];
