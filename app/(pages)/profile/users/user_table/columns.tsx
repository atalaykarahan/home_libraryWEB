"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    accessorKey: "authority",
    header: "Yetki",
  },
  {
    accessorKey: "user_visibility",
    header: "Gizlilik",
  },
  {
    accessorKey: "user_library_visibility",
    header: "Kütüphane Gizliliği",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <TbDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
