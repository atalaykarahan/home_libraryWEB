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
import Image from "next/image";

// import EventEmitter from "events";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import DeleteMyBookDialog from "../delete-dialog/delete-dialog";
import EditMyBookDialog from "../edit-dialog/edit-dialog";

export type MyBookTableModel = {
  book_image: string;
  reading_id: number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

// export const eventEmitter = new EventEmitter();

export const columns: ColumnDef<MyBookTableModel>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="w-[50px]">
          <AspectRatio ratio={7 / 11} className="flex flex-row">
            <Image
              src={
                book.book_image ??
                "https://img.freepik.com/premium-vector/manual-book-with-instructions-vector-icon_116137-9345.jpg"
              }
              width={220}
              height={310}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      );
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
      const [removeBookDialog, setRemoveBookDialog] = useState(false);
      const [openReadingDialog, setOpenReadingDialog] = useState(false);

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
              <DropdownMenuItem onClick={() => setOpenReadingDialog(true)}>
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRemoveBookDialog(true)}>
                Kitaplığımdan Kaldır
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit reading dialog */}
          {openReadingDialog && (
            <EditMyBookDialog
              isOpen={openReadingDialog}
              setIsOpen={setOpenReadingDialog}
              book={myBook}
            />
          )}

          {/* delete book dialog */}
          {removeBookDialog && (
            <DeleteMyBookDialog
              isOpen={removeBookDialog}
              setIsOpen={setRemoveBookDialog}
              book={myBook}
            />
          )}
        </>
      );
    },
  },
];
