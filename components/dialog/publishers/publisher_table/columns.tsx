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

export type PublisherTableModel = {
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
      // const [editCategoryDialog, setEditCategoryDialog] =
      //   useState<boolean>(false);
      const [deletePublisherDialog, setDeletePublisherDialog] =
        useState<boolean>(false);

      const handleDeletePublisher = async () => {
        console.log("üst kısım tetiklendi");
        // try {
        //   const res = await deleteCategoryClient(category.category_id);
        //   console.log(res);
        //   if (res.status == 204) {
        //     eventEmitter.emit("updateGrid");
        //     toast.success(`KATEGORİ BAŞARIYLA SİLİNDİ`, {
        //       position: "top-right",
        //       style: {
        //         backgroundColor: "hsl(143, 85%, 96%)",
        //         color: "hsl(140, 100%, 27%)",
        //         borderColor: "hsl(145, 92%, 91%)",
        //       },
        //     });
        //   } else {
        //     toast.error(`Bir hata meydana geldi`, {
        //       description: `Daha sonra tekrar deneyin!`,
        //       position: "top-right",
        //     });
        //     throw new Error("deleteCategory ile ilgili bir hata oluştu");
        //   }
        // } catch (error: any) {
        //   switch (error.response.status) {
        //     case 403:
        //       toast.error(`YETKİ HATASI`, {
        //         description: `Bu kategoriyi silebilmek için yetkininiz bulunmamaktadır.`,
        //         position: "top-right",
        //       });
        //       break;
        //     case 409:
        //       toast.error(`KİTAP KULLANIMDA`, {
        //         description: `Bu kategori şu anda başka bir kitapta kullanılmakta. Kategoriyi silebilmek için önce ilişkili kitapları sildiğinizden emin olun!`,
        //         position: "top-right",
        //       });
        //       break;
        //   }

        //   throw new Error(`deleteCategory try&catch hata -> ${error}`);
        // }
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
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeletePublisherDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* DELETE PUBLISHER DIALOG */}
          <DeleteDialog
            onConfirm={handleDeletePublisher}
            isOpen={deletePublisherDialog}
            setIsOpen={setDeletePublisherDialog}
            dialogTitle={[publisher.publisher_name, "yayınevini"]}
          />
        </>
      );
    },
  },
];
