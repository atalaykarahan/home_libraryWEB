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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { removeMyBook } from "@/app/_api/services/readingService";

export type MyBookTableModel = {
  reading_id:number;
  book_id: number;
  book_title: string;
  author: string;
  publisher: string;
  status: string;
};

const handleRemoveBook = (data: any) => {
  console.log(data);
};

const removeBook = async (reading_id: number) => {
  console.log("kaldırılacak olan reading =", reading_id);
  const resRemoveBook = await removeMyBook(reading_id);
  if(resRemoveBook.status !== 200){
    throw new Error("Reading silinirken bir hata oluştu");
  }else {
   console.log("silme işlemi başarılı tabloyu yenilemen lazım");
  }

};

export const columns: ColumnDef<MyBookTableModel>[] = [
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(myBook.book_title)}
              >
                Aç
              </DropdownMenuItem>
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRemoveBookDialog(true)}>
                Kitaplığımdan Kaldır
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                    Eğer bu kitap hakkında herhangi bir notun varsa bunlar
                    silinir ve bir daha geri getiremezsin!
                    Bu işlem kitabı yalnızca kitaplığından kaldıracaktır. Kitabı
                    daha sonra kütüphaneden yeniden ekleyebilirsin.
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
