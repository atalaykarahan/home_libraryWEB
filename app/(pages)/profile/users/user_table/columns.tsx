"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import ActionsTableCell from "./actions-table-cell";

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

      return <ActionsTableCell user={user} />;
    },
  },
];
