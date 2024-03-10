"use client";

import { deleteCategoryClient } from "@/app/_api/services/categoryService";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import DeleteDialog from "../../alert-dialog/delete-dialog";
import { eventEmitter } from "../create-category";
import EditCategoryDialog from "../edit-category";

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
      const [editCategoryDialog, setEditCategoryDialog] =
        useState<boolean>(false);
      const [deleteCategoryDialog, setDeleteCategoryDialog] =
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
              <DropdownMenuItem onClick={() => setEditCategoryDialog(true)}>
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteCategoryDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* EDIT CATEGORY DIALOG */}
          <EditCategoryDialog
            isOpen={editCategoryDialog}
            setIsOpen={setEditCategoryDialog}
            category={category}
          />

          {/* DELETE CATEGORY DIALOG */}
          <DeleteDialog
            isOpen={deleteCategoryDialog}
            setIsOpen={setDeleteCategoryDialog}
            dialogTitle={`${category.category_name} kategorisini kalıcı olarak silmek istediğine emin misin?`}
            eventEmitter={eventEmitter}
            emitterFnc="updateGrid"
            dialogDescription="Bu kategoriyi silersen bu işlemi geri alamazsın!"
            onDelete={() => deleteCategoryClient(category.category_id)}
          />
        </>
      );
    },
  },
];
