"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableBookImage from "@/components/table-book-image";
import { useState } from "react";
import DeleteMyBookDialog from "../delete-dialog/delete-dialog";
import EditMyBookDialog from "../edit-dialog/edit-dialog";
import ActionsTableCell from "./actions-table-cell";

export type MyBookTableModel = {
  book_image: string;
  reading_id: number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const columns: ColumnDef<MyBookTableModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return <TableBookImage bookImage={book.book_image} />;
    },
  },
  {
    accessorKey: "book_title",
    header: "Kitap",
  },
  {
    accessorKey: "author",
    header: "Yazar",
  },
  {
    accessorKey: "publisher",
    header: "Yayınevi",
  },
  {
    accessorKey: "status",
    header: "Durumu",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const myBook = row.original;

      return <ActionsTableCell myBook={myBook} />;
    },
  },
];
