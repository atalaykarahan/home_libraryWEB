"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import DeleteAuthorDialog from "../dialogs/delete-author";
import EditAuthorDialog from "../dialogs/edit-author";

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
      const [editAuthorDialog, setEditAuthorDialog] = useState<boolean>(false);
      const [deleteAuthorDialog, setDeleteAuthorDialog] =
        useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <TbDots className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditAuthorDialog(true)}>
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteAuthorDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* EDIT AUTHOR DIALOG */}
          <EditAuthorDialog
            isOpen={editAuthorDialog}
            setIsOpen={setEditAuthorDialog}
            author={author}
          />

          {/* DELETE AUTHOR DIALOG */}
          <DeleteAuthorDialog
            isOpen={deleteAuthorDialog}
            setIsOpen={setDeleteAuthorDialog}
            author={author}
          />
        </>
      );
    },
  },
];
