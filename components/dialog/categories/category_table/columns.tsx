"use client";

import {
  deleteCategoryClient,
  patchCategoryClient,
} from "@/app/_api/services/categoryService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbDots } from "react-icons/tb";
import { toast } from "sonner";
import { z } from "zod";
import { eventEmitter } from "../create-category";
import DeleteDialog from "../../alert-dialog/delete-dialog";

export type CategoryTableModel = {
  category_id: string;
  category_name: string;
  bookCount: number;
};

export const columns: ColumnDef<CategoryTableModel>[] = [
  {
    accessorKey: "category_name",
    header: "Kategori",
  },
  {
    accessorKey: "bookCount",
    header: "Kitap Sayısı",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const [editCategoryDialog, setEditCategoryDialog] =
        useState<boolean>(false);
      const [deleteCategoryDialog, setDeleteCategoryDialog] =
        useState<boolean>(false);

      const form = useForm<z.infer<typeof EditCategorySchema>>({
        resolver: zodResolver(EditCategorySchema),
        defaultValues: {
          category_name: category.category_name,
        },
      });

      const handleEditOnSubmit = async (
        data: z.infer<typeof EditCategorySchema>
      ) => {
        try {
          const res = await patchCategoryClient(
            category.category_id.toString(),
            data.category_name
          );

          if (res.status == 200) {
            eventEmitter.emit("updateGrid");
            setEditCategoryDialog(false);
            toast.success(`GÜNCELLEME BAŞARILI`, {
              description: `${category.category_name}`,
              position: "top-right",
              style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                color: "hsl(140, 100%, 27%)",
                borderColor: "hsl(145, 92%, 91%)",
              },
            });
          } else {
            toast.error(`Bir hata meydana geldi`, {
              description: `Daha sonra tekrar deneyin!`,
              position: "top-right",
            });
            throw new Error(`updateMyReading error -> ${res}`);
          }
        } catch (error) {
          toast.error(`HATA`, {
            description: `${error}`,
            position: "top-right",
          });
          throw new Error(`addMyReading try&catch hata -> ${error}`);
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
              <DropdownMenuItem onClick={() => setEditCategoryDialog(true)}>
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteCategoryDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* EDIT CATEGORY DIALOG */}
          <Dialog
            open={editCategoryDialog}
            onOpenChange={() => setEditCategoryDialog(false)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kategori düzenle</DialogTitle>
                <DialogDescription>{category.category_name}</DialogDescription>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEditOnSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="category_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Kaydet
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* DELETE CATEGORY DIALOG */}
          <DeleteDialog
            isOpen={deleteCategoryDialog}
            setIsOpen={setDeleteCategoryDialog}
            dialogTitle={`${category.category_name} kategorisini kalıcı olarak silmek istediğine emin misin?`}
            eventEmitter={eventEmitter}
            emitterFnc="updateGrid"
            dialogDescription="Bu kategoriyi silersen bu işlemi geri alamazsın!"
            onDelete={() => deleteCategoryClient(category.category_id)}
          />
        </>
      );
    },
  },
];
