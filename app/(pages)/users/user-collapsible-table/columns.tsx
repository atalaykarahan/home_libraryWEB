"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type UserCollapsibleModel = {
  book_id: string;
  book_title: string;
  image_path: string;
  status: string;
};

export const columns: ColumnDef<UserCollapsibleModel>[] = [
  {
    accessorKey: "book_title",
    header: "Kitap Adı",
  },
  {
    header: "Durumu",
    cell: ({ row }) => {
      const book = row.original;
      return book.status == "Okundu" ? (
        <Badge>{book.status}</Badge>
      ) : (
        <Badge variant="destructive">{book.status}</Badge>
      );
    },
  },
];
