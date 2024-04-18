"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EditUserDialog from "../edit-dialog/edit-dialog";

export type UserTableModel = {
  user_id: string;
  user_name: string;
  createdAt: Date;
  authority: string;
  user_visibility: boolean;
  user_library_visibility: boolean;
};

export const columns: ColumnDef<UserTableModel>[] = [
  {
    accessorKey: "user_name",
    header: "Kullanıcı Adı",
  },
  {
    accessorKey: "createdAt",
    header: "Üye Olma Tarihi",
  },
  {
    id: "authority",
    header: "Yetki",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          {user.authority == "guest" && (
            <Badge variant="outline">{user.authority}</Badge>
          )}
          {user.authority == "user" && <Badge>{user.authority}</Badge>}
          {user.authority == "admin" && (
            <Badge variant="secondary">{user.authority}</Badge>
          )}
        </>
      );
    },
  },
  {
    id: "user_visibility",
    header: "Gizlilik",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          {user.user_visibility == true && (
            <Badge variant="destructive">Açık</Badge>
          )}
          {user.user_visibility == false && (
            <Badge variant="success">Kapalı</Badge>
          )}
        </>
      );
    },
  },
  {
    id: "user_library_visibility",
    header: "Kütüphane Gizliliği",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          {user.user_library_visibility == true && (
            <Badge variant="destructive">Açık</Badge>
          )}
          {user.user_library_visibility == false && (
            <Badge variant="success">Kapalı</Badge>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [openUserDialog, setOpenUserDialog] = useState(false);

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
            <DropdownMenuItem onClick={() => setOpenUserDialog(true)} >Düzenle</DropdownMenuItem>
            <DropdownMenuItem>Sil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        {/* Edit user dialog */}
        {openUserDialog && (
          <EditUserDialog
            isOpen={openUserDialog}
            setIsOpen={setOpenUserDialog}
            user={user}
          />
        )}

        </>




      );
    },
  },
];
