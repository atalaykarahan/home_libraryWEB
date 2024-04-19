"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsTableCell from "./actions-table-cell";

export type PublisherTableModel = {
  publisher_id: string;
  publisher_name: string;
  bookCount: number;
};

export const columns: ColumnDef<PublisherTableModel>[] = [
  {
    accessorKey: "publisher_name",
    header: "Yayınevi",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const publisher = row.original;

      return <ActionsTableCell publisher={publisher} />;
    },
  },
];
