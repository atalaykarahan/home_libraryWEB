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
import ActionsTableCell from "./actions-table-cell";

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

      return <ActionsTableCell publisher={publisher} />;
    },
  },
];
