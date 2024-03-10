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
import DeleteDialog from "../../alert-dialog/delete-dialog";
import { deletePublisherClient } from "@/app/_api/services/publisherService";
import { eventEmitter } from "../create-publisher";
import EditPublisherDialog from "../edit-publisher";

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
      const [editPublisherDialog, setEditPublisherDialog] =
        useState<boolean>(false);
      const [deletePublisherDialog, setDeletePublisherDialog] =
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
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeletePublisherDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* EDIT PUBLISHER DIALOG */}
          <EditPublisherDialog
            isOpen={editPublisherDialog}
            setIsOpen={setEditPublisherDialog}
            publisher={publisher}
          />

          {/* henüz publisher id değeri gelmiyor olabilir o yüzden silemeyebilirsin onu kontrol et!!!!! */}
          {/* DELETE PUBLISHER DIALOG */}
          <DeleteDialog
            isOpen={deletePublisherDialog}
            setIsOpen={setDeletePublisherDialog}
            dialogTitle={`${publisher.publisher_name} yayınevini kalıcı olarak silmek istediğine emin misin?`}
            eventEmitter={eventEmitter}
            emitterFnc="updateGrid"
            dialogDescription="Bu yayınevini silersen bu işlemi geri alamazsın!"
            onDelete={() => deletePublisherClient(publisher.publisher_id)}
          />
        </>
      );
    },
  },
];
