"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  removeMyBook
} from "@/app/_api/services/readingService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import EventEmitter from "events";
import { useState } from "react";
import { toast } from "sonner";
import EditMyBookDialog from "../edit-dialog/edit-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export type MyBookTableModel = {
  book_image:string;
  reading_id: number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

export const eventEmitter = new EventEmitter();

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

      const removeBook = async (reading_id: number) => {
        try {
          const resRemoveBook = await removeMyBook(reading_id);
          if (resRemoveBook.status !== 200) {
            toast.error(`Bir hata meydana geldi`, {
              description: `Daha sonra tekrar deneyin!`,
              position: "top-right",
            });
            throw new Error("Reading silinirken bir hata oluştu");
          } else {
            toast.success(`KALDIRMA BAŞARILI`, {
              description: `${myBook.book_title}`,
              position: "top-right",
              style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                color: "hsl(140, 100%, 27%)",
                borderColor: "hsl(145, 92%, 91%)",
              },
            });
            eventEmitter.emit("updateGrid");
          }
        } catch (error) {
          toast.error(`HATA`, {
            description: `${error}`,
            position: "top-right",
          });
          throw new Error(`removeMyReading try&catch hata -> ${error}`);
        }
      };

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
          <AlertDialog
            open={removeBookDialog}
            onOpenChange={() => setRemoveBookDialog(false)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  "{myBook.book_title}" kitabını kitaplığından kaldırmak
                  istediğine emin misin?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Eğer bu kitap hakkında herhangi bir notun varsa bunlar silinir
                  ve bir daha geri getiremezsin! Bu işlem kitabı yalnızca
                  kitaplığından kaldıracaktır. Kitabı daha sonra kütüphaneden
                  yeniden ekleyebilirsin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() => removeBook(myBook.reading_id)}
                >
                  Kaldır
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
