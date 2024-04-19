"use client";
import { ColumnDef } from "@tanstack/react-table";
import ActionsTableCell from "./actions-table-cell";

export type AuthorTableModel = {
  author_id: string;
  author_name: string;
  author_surname: string;
  bookCount: number;
};

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
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original;

      return <ActionsTableCell author={author} />;
    },
  },
];
