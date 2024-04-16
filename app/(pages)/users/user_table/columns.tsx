"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserTableModel = {
  user_id: string;
  user_name: string;
  interacted_book_count: string;
  completed_book_count: string;
  abandoned_book_count:string;
  favorite_author:string;
  user_library_visibility:boolean;
};


export const columns: ColumnDef<UserTableModel>[] = [
  
  {
    accessorKey: "user_name",
    header: "Kullanıcı Adı",
  },
  {
    accessorKey: "interacted_book_count",
    header: "Kitap Sayısı",
  },
  {
    accessorKey: "completed_book_count",
    header: "Okunan",
  },
  {
    accessorKey: "abandoned_book_count",
    header: "Yarım Bırakılan",
  },
  {
    accessorKey: "favorite_author",
    header: "Favori Yazar",
  },
];
