"use client";

import TableBookImage from "@/components/table-book-image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import EventEmitter from "events";
import { useState } from "react";
import { PiArrowsDownUp } from "react-icons/pi";
import { TbDots } from "react-icons/tb";
import AddMyLibraryDialog from "../add-my-library-dialog/add-my-library-dialog";
import DeleteGeneralBookDialog from "../delete-dialog/delete-dialog";
import ActionsTableCell from "./actions-table-cell";

export type BookTableModel = {
  book_image: string;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const eventEmitter = new EventEmitter();
export const columns: ColumnDef<BookTableModel>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yazar
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "publisher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yayınevi
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durumu
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const selectedBook = row.original;
      // const [addMyLibrary, setAddMyLibrary] = useState(false);
      // const [deleteBookDialog, setDeleteBookDialog] = useState<boolean>(false);

      return (
        <ActionsTableCell selectedBook={selectedBook} />
        // <>
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button variant="ghost" className="h-8 w-8 p-0">
        //         <span className="sr-only">Open menu</span>
        //         <TbDots className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">
        //       <DropdownMenuItem
        //         onClick={() =>
        //           navigator.clipboard.writeText(selectedBook.book_title)
        //         }
        //       >
        //         Bilgi
        //       </DropdownMenuItem>

        //       <DropdownMenuItem onClick={() => setAddMyLibrary(true)}>
        //         Kitaplığıma Ekle
        //       </DropdownMenuItem>
        //       <DropdownMenuItem>Düzenle</DropdownMenuItem>
        //       <DropdownMenuItem onClick={() => setDeleteBookDialog(true)}>
        //         Sil
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>

        //   {/* add my library dialog */}
        //   {addMyLibrary && (
        //     <AddMyLibraryDialog
        //       isOpen={addMyLibrary}
        //       setIsOpen={setAddMyLibrary}
        //       book={selectedBook}
        //     />
        //   )}

        //   {/* delete book dialog */}
        //   {deleteBookDialog && (
        //     <DeleteGeneralBookDialog
        //       isOpen={deleteBookDialog}
        //       setIsOpen={setDeleteBookDialog}
        //       book={selectedBook}
        //     />
        //   )}
        // </>
      );
    },
  },
];
