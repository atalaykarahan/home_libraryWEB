"use client";

import TableBookImage from "@/components/table-book-image";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type UserCollapsibleModel = {
  book_id: string;
  book_title: string;
  book_image: string;
  status: string;
};

export const columns: ColumnDef<UserCollapsibleModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return <TableBookImage bookImage={book.book_image} />;
    },
  },
  {
    accessorKey: "book_title",
    header: "Kitap Adı",
  },
  {
    header: "Durumu",
    cell: ({ row }) => {
      const book = row.original;
      return book.status == "Okundu" ? (
        <Badge variant="success">{book.status}</Badge>
      ) : book.status == "Okunuyor" ? (
        <Badge variant="warning">{book.status}</Badge>
      ) : (
        <Badge variant="destructive">{book.status}</Badge>
      );
    },
  },
];
