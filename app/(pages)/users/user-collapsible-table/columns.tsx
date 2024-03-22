"use client";

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
    accessorKey: "status",
    header: "Durumu",
  },
];
